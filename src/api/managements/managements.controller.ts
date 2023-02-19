import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './managements.service';
import { SendEmailDto } from './dto/send-email.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('management')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('send-email')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    const { email, name, managerInform } = sendEmailDto;

    return await this.userService.sendEmail(email, name, managerInform);
  }

  @Post('register')
  async registManager(@Body() updateUserDto: UpdateUserDto) {
    const { email, password, verifyToken } = updateUserDto;
    return await this.userService.registManager(email, password, verifyToken);
  }
}
