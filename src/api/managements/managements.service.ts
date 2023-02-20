import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { Manager } from './entities/user.entity';
import * as nanoid from 'nanoid';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class ManagerService {
  constructor(
    private emailService: EmailService,
    private authService: AuthService,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}
  async sendEmail(email: string, name: string) {
    // DB에서 이메일 중복성 확인
    const managerExist = await this.managerRepository.findOne({
      where: { email },
    });
    if (managerExist) {
      throw new BadRequestException('User is arleady exist');
    }
    const verifyToken = await this.generateRandomCode();
    await this.emailService.sendVerifyCodeEmail(email, name, verifyToken);
    const userId = await this.saveManager(email, name, verifyToken);
    return { userId };
  }

  private async saveManager(email: string, name: string, verifyToken: string) {
    const manager = Manager.from({
      email,
      name,
      verifyToken,
    });
    const { id } = await this.managerRepository.save(manager);
    return id;
  }

  private async generateRandomCode() {
    return nanoid.nanoid(6);
  }

  async registerManager(email: string, password: string, verifyToken: string) {
    const managerExist = await this.managerRepository.findOne({
      where: { email, verifyToken },
    });
    if (!managerExist) {
      throw new NotFoundException('User is not exist');
    } else if (managerExist.password) {
      throw new BadRequestException('User password is arleady reigistered');
    }
    await this.managerRepository.update({ email }, { password });
    return {
      id: managerExist.id,
    };
  }

  async managerLogin(email: string, password: string) {
    const managerExist = await this.managerRepository.findOne({
      where: { email, password },
    });
    if (!managerExist) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }
    return this.authService.login(managerExist);
  }
}
