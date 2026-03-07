"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const google_auth_library_1 = require("google-auth-library");
const jose_1 = require("jose");
const uuid_1 = require("uuid");
const in_memory_db_1 = require("../db/in-memory.db");
let AuthService = class AuthService {
    constructor(db, jwtService) {
        this.db = db;
        this.jwtService = jwtService;
        this.googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        this.appleJwks = (0, jose_1.createRemoteJWKSet)(new URL('https://appleid.apple.com/auth/keys'));
    }
    async oauthLogin(payload) {
        const providerSub = await this.verifyTokenAndExtractSub(payload.provider, payload.idToken);
        const identity = Array.from(this.db.oauthIdentities.values()).find((entry) => entry.provider === payload.provider && entry.providerSub === providerSub);
        let userId;
        let bootstrapPetRequired = false;
        if (!identity) {
            userId = (0, uuid_1.v4)();
            this.db.users.set(userId, {
                id: userId,
                email: `${payload.provider}-${providerSub}@offline.pet`,
                createdAt: new Date().toISOString()
            });
            const identityId = (0, uuid_1.v4)();
            this.db.oauthIdentities.set(identityId, {
                id: identityId,
                userId,
                provider: payload.provider,
                providerSub
            });
            bootstrapPetRequired = true;
        }
        else {
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
    async verifyTokenAndExtractSub(provider, idToken) {
        if (!idToken || idToken.length < 8) {
            throw new common_1.UnauthorizedException('Invalid OAuth token payload');
        }
        if (provider === 'google') {
            const audience = process.env.GOOGLE_CLIENT_ID;
            if (!audience) {
                throw new common_1.UnauthorizedException('Missing GOOGLE_CLIENT_ID configuration');
            }
            const ticket = await this.googleClient.verifyIdToken({ idToken, audience });
            const payload = ticket.getPayload();
            if (!payload?.sub) {
                throw new common_1.UnauthorizedException('Google token has no subject');
            }
            return payload.sub;
        }
        const appleAudiences = (process.env.APPLE_AUDIENCE ?? process.env.APPLE_BUNDLE_ID ?? '')
            .split(',')
            .map((value) => value.trim())
            .filter(Boolean);
        if (appleAudiences.length === 0) {
            throw new common_1.UnauthorizedException('Missing APPLE_AUDIENCE or APPLE_BUNDLE_ID configuration');
        }
        const verified = await (0, jose_1.jwtVerify)(idToken, this.appleJwks, {
            issuer: 'https://appleid.apple.com',
            audience: appleAudiences
        });
        const sub = verified.payload.sub;
        if (!sub || typeof sub !== 'string') {
            throw new common_1.UnauthorizedException('Apple token has no subject');
        }
        return sub;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [in_memory_db_1.InMemoryDb,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map