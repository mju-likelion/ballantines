import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

import { CreateApplicationDto } from './dto/create-application.dto';
import { s3Client } from '../../lib/aws';

@Injectable()
export class ApplicationsService {
  create(createApplicationDto: CreateApplicationDto) {
    return 'This action adds a new application';
  }

  async uploadCv(cv: Express.Multer.File, sid: string) {
    const filename = `${sid}-${cv.originalname}`;
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
