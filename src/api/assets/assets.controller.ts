import { Controller, Get, Param, Post } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('questions/:part')
  getQuestions(
    @Param('part')
    part: string,
  ) {
    return this.assetsService.getQuestions(part);
  }

  @Get('agreements')
  getAgreement() {
    return this.assetsService.getAgreement();
  }

  @Post('agreements')
  setAgreement() {
    return this.assetsService.setAgreement();
  }

  @Post('questions')
  setQuestion() {
    return this.assetsService.setQuestions();
  }
}
