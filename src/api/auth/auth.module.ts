import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/config/authConfig';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({
      load: [authConfig],
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthService, JwtService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
