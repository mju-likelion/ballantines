import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';
import authConfig from 'src/config/authConfig';
import { ConfigType } from '@nestjs/config';
import { ManagerService } from '../manager/manager.service';
import { compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from '../manager/entities/manager.entity';
import { Repository } from 'typeorm';

interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) readonly config: ConfigType<typeof authConfig>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { ...user };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.config.jwtSecret,
        expiresIn: this.config.expiresIn,
      }),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.managerRepository.findOne({
      where: { email },
    });
    if (!user || (user && !compare(password, user.password))) return null;
    return user;
  }
}
