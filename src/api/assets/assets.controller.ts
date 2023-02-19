import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AssetsService } from './assets.service';
import { Part } from './dto/find-question.dto';

@ApiTags('assets')
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
