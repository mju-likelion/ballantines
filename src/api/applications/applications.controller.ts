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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CvFileValidator } from './validators/cv-file.validator';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { PaginationQueryDTO } from './dto/pagination-query.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationsService.create(createApplicationDto);
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

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  //page를 number로 사용하기 위해서 추가
  findAll(@Query() paginationQueryDTO: PaginationQueryDTO) {
    return this.applicationsService.findAll(paginationQueryDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }
}
