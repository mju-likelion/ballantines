import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { SendEmailDto } from './dto/send-email.dto';
import { PwRegistrationDto } from './dto/pw-registration.dto';
import { ManagerLoginDto } from './dto/manager-login.dto';

@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('send-email')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    const { email, name } = sendEmailDto;

    return await this.managerService.sendEmail(email, name);
  }

  @Post('register')
  async registerManager(@Body() pwRegistrationDto: PwRegistrationDto) {
    const { password, verifyToken } = pwRegistrationDto;
    return await this.managerService.registerManager(password, verifyToken);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() managerLoginDto: ManagerLoginDto) {
    const { email, password } = managerLoginDto;
    return await this.managerService.managerLogin(email, password);
  }
}
