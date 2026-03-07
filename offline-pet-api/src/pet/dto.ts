import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  name!: string;
}
