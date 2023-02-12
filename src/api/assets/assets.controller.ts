import { Controller, Get, Param, Post } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('questions/:part')
  findQuestions(
    @Param('part')
    part: string,
  ) {
    return this.assetsService.findQuestions(part);
  }

  @Get('agreements')
  findAgreement() {
    return this.assetsService.findAgreement();
  }

  @Post('agreements')
  createAgreement() {
    return this.assetsService.createAgreement();
  }

  @Post('questions')
  createQuestion() {
    return this.assetsService.createQuestions();
  }
}
