import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import authConfig from 'src/config/authConfig';
import { Manager } from '../manager/entities/manager.entity';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Manager]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [authConfig.KEY],
      useFactory: async (config: ConfigType<typeof authConfig>) => ({
        secret: config.jwtSecret,
        signOptions: {
          expiresIn: config.expiresIn,
        },
      }),
    }),
  ],
  providers: [AuthService, JwtService, JwtStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
