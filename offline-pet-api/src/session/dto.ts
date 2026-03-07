import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class SessionStartDto {
  @IsInt()
  @Min(1)
  plannedMinutes!: number;
}

export class SessionTickDto {
  @IsString()
  sessionId!: string;

  @IsInt()
  @Min(1)
  minuteIndex!: number;

  @IsBoolean()
  violated!: boolean;

  @IsOptional()
  @IsString()
  reason?: string;
}

export class SessionEndDto {
  @IsString()
  sessionId!: string;
}
