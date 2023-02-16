import { Module } from '@nestjs/common';
import { UserService } from './managements.service';
import { UserController } from './managements.controller';
import { EmailModule } from '../email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/user.entity';

@Module({
  imports: [EmailModule, TypeOrmModule.forFeature([Manager])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
