import { IsEmail, IsIn, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsIn(['manager', 'member'])
  readonly userInform: 'manager' | 'member';
}
