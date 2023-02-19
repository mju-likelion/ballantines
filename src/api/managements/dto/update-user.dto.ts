import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { SendEmailDto } from './send-email.dto';

export class UpdateUserDto extends PartialType(SendEmailDto) {
  @IsEmail()
  email?: string;
  @IsString()
  password: string;
  @IsString()
  verifyToken: string;
}
