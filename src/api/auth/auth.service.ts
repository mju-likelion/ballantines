import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

interface User {
  password: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: User) {
    const payload = { ...user };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
    };
  }
}
