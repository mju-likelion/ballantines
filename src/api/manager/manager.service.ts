import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { Manager } from './entities/manager.entity';
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
      throw new BadRequestException('User is already exist');
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

  async registerManager(password: string, verifyToken: string) {
    const managerExist = await this.managerRepository.findOne({
      where: { verifyToken },
    });
    if (!managerExist) {
      throw new NotFoundException('User is not exist');
    } else if (managerExist.password) {
      throw new BadRequestException('User password is already registered');
    }

    const hashedPassword = await this.authService.encryptPassword(password);

    await this.managerRepository.update(
      { verifyToken },
      { password: hashedPassword, verifyToken: null },
    );
    return {
      id: managerExist.id,
    };
  }

  async managerLogin(email: string, password: string) {
    const manager = await this.managerRepository.findOne({
      where: { email, password },
    });
    if (!manager) {
      throw new NotFoundException('User is not exist');
    }
    return this.authService.login(manager);
  }
}
