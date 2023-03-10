import { Controller, Get, Param, Post } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { Part } from './dto/find-question.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('questions/:part')
  findQuestions(
    @Param()
    param: Part,
  ) {
    return this.assetsService.findQuestions(param.part);
  }

  @Get('agreements')
  findAgreement() {
    return this.assetsService.findAgreement();
  }
}
