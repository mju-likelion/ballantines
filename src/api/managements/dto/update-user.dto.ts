import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, Length } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  email?: string;
  @IsString()
  password: string;
  @IsString()
  randomCode: string;
}
