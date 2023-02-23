import { PutObjectCommand } from '@aws-sdk/client-s3';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './application.entity';
import { s3Client } from '../../lib/aws';
import { PaginationQueryDTO } from './dto/pagination-query.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const { personalInfo, applicationInfo } = createApplicationDto;

    const conflictErrors: string[] = [];
    const samePhoneUser = await this.applicationRepository.findOne({
      where: {
        phone: personalInfo.phone,
      },
    });
    const sameEmailUser = await this.applicationRepository.findOne({
      where: {
        email: personalInfo.email,
      },
    });
    const sameSidUser = await this.applicationRepository.findOne({
      where: {
        sid: personalInfo.sid,
      },
    });

    if (samePhoneUser) {
      conflictErrors.push(`phone ${personalInfo.phone} is already exist`);
    }
    if (sameEmailUser) {
      conflictErrors.push(`email ${personalInfo.email} is already exist`);
    }
    if (sameSidUser) {
      conflictErrors.push(`sid ${personalInfo.sid} is already exist`);
    }

    if (conflictErrors.length > 0) {
      throw new ConflictException(conflictErrors);
    }

    // 디지몬 파트가 아닌데 자기소개서 페이지 파일이 없으면 400 에러
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

  getOrderObject(sortOptions) {
    if (!sortOptions) return null;
    const [option, orderValue] = sortOptions.split('_');
    return {
      [option]: orderValue,
    };
  }

  async submitCheck(sid: string, name: string) {
    const application = await this.applicationRepository.findOne({
      where: {
        sid,
      },
    });

    if (!application || application.name !== name) {
      throw new NotFoundException(
        `Application with given sid and name combination is not found`,
      );
    }

    return {
      submitted: true,
    };
  }

  async findAll(paginationQueryDTO: PaginationQueryDTO) {
    const { page, part, sort } = paginationQueryDTO;
    const PAGE_SIZE = 10;
    const totalApplicationsCount = await this.applicationRepository.count({
      ...(part && {
        where: { part },
      }),
    });

    const totalPage = Math.ceil(totalApplicationsCount / PAGE_SIZE);
    if (!page || totalPage < page) {
      throw new BadRequestException('Invalid page number');
    }

    const sortOptions = this.getOrderObject(sort);

    const targetApplications = await this.applicationRepository.find({
      skip: (+page - 1) * 10,
      take: PAGE_SIZE,
      ...(part && {
        where: {
          part,
        },
      }),

      ...(sort && {
        order: sortOptions,
      }),
    });

    return {
      meta: {
        pageSize: PAGE_SIZE,
        totalApplicationsCount,
        totalPage,
        currentPage: +page,
      },
      data: targetApplications,
    };
  }

  async findOne(id: string) {
    const targetApplication = await this.applicationRepository.findOne({
      where: { id },
    });
    if (!targetApplication) {
      throw new BadRequestException('Invalid ID');
    }
    return targetApplication;
  }
}
