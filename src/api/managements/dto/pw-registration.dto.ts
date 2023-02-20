import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsString, Matches } from 'class-validator';
import { SendEmailDto } from './send-email.dto';

export class PwRegistrationDto extends PartialType(SendEmailDto) {
  @Transform(({ value }) => value.trim())
  @IsString()
  @Matches(/^[A-Za-z0-9!@#$%^&*()]{8,30}$/)
  password: string;
  @IsString()
  verifyToken: string;
}
