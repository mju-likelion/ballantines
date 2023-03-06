import { Transform } from 'class-transformer';
import { IsEmail, IsString, Matches } from 'class-validator';

export class ManagerLoginDto {
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @Matches(/^[A-Za-z0-9!@#$%^&*()]{8,30}$/)
  password: string;
}
