import { PutObjectCommand } from '@aws-sdk/client-s3';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './application.entity';
import { s3Client } from '../../lib/aws';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const { personalInfo, applicationInfo } = createApplicationDto;

    // 디지몬 파트가 아닌데 자기소개서가 없으면 400 에러
    if (personalInfo.part !== 'design') {
      const errors: string[] = [];

      if (!applicationInfo.cvUrl) {
        errors.push(
          "applicationInfo.cvUrl must be exist when personalInfo.part isn't design",
        );
      }

      if (!applicationInfo.fifthAnswer) {
        errors.push(
          "applicationInfo.fifthAnswer must be exist when personalInfo.part isn't design",
        );
      }

      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }
    }

    const application = Application.from({
      ...personalInfo,
      ...applicationInfo,
    });

    const { id } = await this.applicationRepository.save(application);
    return { id };
  }

  async uploadCv(cv: Express.Multer.File, sid: string) {
    const filename = `${sid}-${cv.originalname.replaceAll(' ', '-')}`;
    const path = `cv/${filename}`;

    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: 'ballantines-static',
          Key: path,
          ACL: 'public-read',
          Body: cv.buffer,
        }),
      );
      return {
        filename,
        url: `${process.env.AWS_S3_BUCKET_URL}/${path}`,
      };
    } catch (e) {
      return {
        error: e.Code,
      };
    }
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }
}
