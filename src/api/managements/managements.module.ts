import { Module } from '@nestjs/common';
import { ManagerService } from './managements.service';
import { ManagerController } from './managements.controller';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [EmailModule, AuthModule, TypeOrmModule.forFeature([Manager])],
  controllers: [ManagerController],
  providers: [ManagerService, JwtService, AuthService],
})
export class ManagerModule {}
