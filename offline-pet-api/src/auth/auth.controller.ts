import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthOAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('oauth')
  oauthLogin(@Body() payload: AuthOAuthDto) {
    return this.authService.oauthLogin(payload);
  }
}
