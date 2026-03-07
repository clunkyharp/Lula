import { IsIn, IsString } from 'class-validator';

export class AuthOAuthDto {
  @IsIn(['apple', 'google'])
  provider!: 'apple' | 'google';

  @IsString()
  idToken!: string;
}
