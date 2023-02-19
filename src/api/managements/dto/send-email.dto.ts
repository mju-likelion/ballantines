import { IsEmail, IsIn, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsIn(['manager', 'rep'])
  readonly managerInform: 'manager' | 'rep';
}
