import { PartialType } from '@nestjs/mapped-types';
import { PwRegistrationDto } from './pw-registration.dto';

export class ManagerLoginDto extends PartialType(PwRegistrationDto) {}
