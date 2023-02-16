import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { Manager } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly emailService: EmailService,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}
  randomStrings =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

  async sendEmail(
    email: string,
    name: string,
    userInform: 'manager' | 'member',
  ) {
    // DB에서 이메일 중복성 확인
    const managerExist = await this.managerRepository.findOne({
      where: { email },
    });
    if (managerExist) {
      throw new BadRequestException('User is arleady exist');
    }
    const randomCode = await this.generateRandomCode();
    await this.emailService.sendVerifyCodeEmail(email, name, randomCode);
    console.log(
      `${email}. db에 추가. 회원이름 : ${name}, 랜덤코드: ${randomCode}`,
    );
    return await this.saveManager(email, name, userInform, randomCode);
  }
  private async saveManager(
    email: string,
    name: string,
    userInform: 'manager' | 'member',
    randomCode: string,
  ) {
    const manager = Manager.from({
      email,
      name,
      userInform,
      randomCode,
    });
    const { id } = await this.managerRepository.save(manager);
    return id;
  }
  private async generateRandomCode() {
    let randomCode = '';
    for (let i = 0; i < 6; i++) {
      const rnum = Math.floor(Math.random() * this.randomStrings.length);
      randomCode += this.randomStrings.substring(rnum, rnum + 1);
    }
    return randomCode;
  }

  async registManager(email: string, password: string, randomCode: string) {
    const managerExist = await this.managerRepository.findOne({
      where: { email, verifytoken: randomCode },
    });
    if (!managerExist) {
      throw new NotFoundException('User is not exist');
    } else if (managerExist.password) {
      throw new BadRequestException('User password is arleady reigistered');
    }
    return await this.managerRepository.update({ email }, { password });
  }
}
