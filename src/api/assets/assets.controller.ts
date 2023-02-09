import { Controller, Get, Param } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { Part } from './dto/get-questions.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('questions/:part')
  getQuestions(@Param() part: Part) {
    return this.assetsService.getQuestions(part);
  }

  @Get('agreement')
  getAgreement() {
    return this.assetsService.getAgreement();
  }
}
