import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AssetsService } from './assets.service';
import { Part } from './dto/find-question.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @ApiResponse({
    status: 200,
    description: '해당 파트 질문 수신이 정상적으로 완료됨.',
  })
  @ApiResponse({
    status: 400,
    description: '파트 형태가 적절하지 않음.',
  })
  @Get('questions/:part')
  findQuestions(
    @Param()
    param: Part,
  ) {
    return this.assetsService.findQuestions(param.part);
  }

  @ApiResponse({
    status: 200,
    description: '개인정보처리방침 수신이 정상적으로 완료됨.',
  })
  @Get('agreements')
  findAgreement() {
    return this.assetsService.findAgreement();
  }
}
