import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '../applications/application.entity';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { Agreement } from './entity/agreement.entity';
import { Question } from './entity/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agreement, Question])],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
