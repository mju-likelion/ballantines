import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';

export class PwRegistrationDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @Matches(/^[A-Za-z0-9!@#$%^&*()]{8,30}$/)
  password: string;

  @IsString()
  verifyToken: string;
}
