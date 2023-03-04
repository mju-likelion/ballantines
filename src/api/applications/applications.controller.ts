import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CvFileValidator } from './validators/cv-file.validator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { PaginationQueryDTO } from './dto/pagination-query.dto';
import { SubmitCheckQueryDto } from './dto/submit-check-query.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.submit(createApplicationDto);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        cv: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['cv'],
    },
  })
  @Post('upload-cv')
  @UseInterceptors(FileInterceptor('cv'))
  uploadCv(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /html|zip/ })
        // 10MB
        .addMaxSizeValidator({ maxSize: 10 * 1024 * 1024 })
        .addValidator(new CvFileValidator({ maxFilenameLength: 200 }))
        .build({ fileIsRequired: true }),
    )
    cv: Express.Multer.File,
    @Query('sid') sid: string,
  ) {
    return this.applicationsService.uploadCv(cv, sid);
  }

  @Get('submit-check')
  @ApiResponse({ status: 200, description: '지원서 제출이 정상적으로 완료됨.' })
  @ApiResponse({
    status: 400,
    description: '주어진 sid, name 형태가 적합하지 않음.',
  })
  @ApiResponse({
    status: 404,
    description: '주어진 sid, name 조합의 지원서가 존재하지 않음.',
  })
  submitCheck(@Query() { sid, name }: SubmitCheckQueryDto) {
    return this.applicationsService.submitCheck(sid, name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  //page를 number로 사용하기 위해서 추가
  findAll(@Query() paginationQueryDTO: PaginationQueryDTO) {
    return this.applicationsService.findAll(paginationQueryDTO);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }
}
