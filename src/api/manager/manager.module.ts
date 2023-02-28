import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [EmailModule, AuthModule, TypeOrmModule.forFeature([Manager])],
  controllers: [ManagerController],
  providers: [ManagerService],
  exports: [ManagerService],
})
export class ManagerModule {}
