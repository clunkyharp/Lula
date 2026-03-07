import { AuthService } from './auth.service';
import { AuthOAuthDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    oauthLogin(payload: AuthOAuthDto): Promise<{
        userId: string;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        bootstrapPetRequired: boolean;
    }>;
}
