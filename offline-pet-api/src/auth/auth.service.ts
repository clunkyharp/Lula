import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { v4 as uuid } from 'uuid';
import { InMemoryDb } from '../db/in-memory.db';
import { AuthOAuthDto } from './dto';

@Injectable()
export class AuthService {
  private readonly googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  private readonly appleJwks = createRemoteJWKSet(new URL('https://appleid.apple.com/auth/keys'));

  constructor(
    private readonly db: InMemoryDb,
    private readonly jwtService: JwtService
  ) {}

  async oauthLogin(payload: AuthOAuthDto) {
    const providerSub = await this.verifyTokenAndExtractSub(payload.provider, payload.idToken);
    const identity = Array.from(this.db.oauthIdentities.values()).find(
      (entry) => entry.provider === payload.provider && entry.providerSub === providerSub
    );

    let userId: string;
    let bootstrapPetRequired = false;

    if (!identity) {
      userId = uuid();
      this.db.users.set(userId, {
        id: userId,
        email: `${payload.provider}-${providerSub}@offline.pet`,
        createdAt: new Date().toISOString()
      });

      const identityId = uuid();
      this.db.oauthIdentities.set(identityId, {
        id: identityId,
        userId,
        provider: payload.provider,
        providerSub
      });
      bootstrapPetRequired = true;
    } else {
      userId = identity.userId;
      bootstrapPetRequired = !Array.from(this.db.pets.values()).some((pet) => pet.userId === userId);
    }

    const accessToken = this.jwtService.sign({ sub: userId, typ: 'access' }, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign({ sub: userId, typ: 'refresh' }, { expiresIn: '30d' });

    return {
      userId,
      tokens: { accessToken, refreshToken },
      bootstrapPetRequired
    };
  }

  private async verifyTokenAndExtractSub(provider: 'apple' | 'google', idToken: string): Promise<string> {
    if (!idToken || idToken.length < 8) {
      throw new UnauthorizedException('Invalid OAuth token payload');
    }

    if (provider === 'google') {
      const audience = process.env.GOOGLE_CLIENT_ID;
      if (!audience) {
        throw new UnauthorizedException('Missing GOOGLE_CLIENT_ID configuration');
      }

      const ticket = await this.googleClient.verifyIdToken({ idToken, audience });
      const payload = ticket.getPayload();
      if (!payload?.sub) {
        throw new UnauthorizedException('Google token has no subject');
      }
      return payload.sub;
    }

    const appleAudiences = (process.env.APPLE_AUDIENCE ?? process.env.APPLE_BUNDLE_ID ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    if (appleAudiences.length === 0) {
      throw new UnauthorizedException('Missing APPLE_AUDIENCE or APPLE_BUNDLE_ID configuration');
    }

    const verified = await jwtVerify(idToken, this.appleJwks, {
      issuer: 'https://appleid.apple.com',
      audience: appleAudiences
    });
    const sub = verified.payload.sub;
    if (!sub || typeof sub !== 'string') {
      throw new UnauthorizedException('Apple token has no subject');
    }
    return sub;
  }
}
