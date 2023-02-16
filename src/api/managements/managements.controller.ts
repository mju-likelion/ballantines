import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './managements.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('management')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('send-email')
  async sendEmail(@Body() createUserDto: CreateUserDto) {
    const { email, name, userInform } = createUserDto;

    return await this.userService.sendEmail(email, name, userInform);
  }

  @Post('regist')
  async registManager(@Body() updateUserDto: UpdateUserDto) {
    const { email, password, randomCode } = updateUserDto;
    return await this.userService.registManager(email, password, randomCode);
  }
}
