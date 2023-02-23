import { PickType } from '@nestjs/mapped-types';
import { PwRegistrationDto } from './pw-registration.dto';

export class ManagerLoginDto extends PickType(PwRegistrationDto, [
  'email',
  'password',
] as const) {}
