import { JwtService } from '@nestjs/jwt';
import { InMemoryDb } from '../db/in-memory.db';
import { AuthOAuthDto } from './dto';
export declare class AuthService {
    private readonly db;
    private readonly jwtService;
    private readonly googleClient;
    private readonly appleJwks;
    constructor(db: InMemoryDb, jwtService: JwtService);
    oauthLogin(payload: AuthOAuthDto): Promise<{
        userId: string;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        bootstrapPetRequired: boolean;
    }>;
    private verifyTokenAndExtractSub;
}
