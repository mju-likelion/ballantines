import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agreement } from './entity/agreement.entity';
import { Question } from './entity/question.entity';
import { Questions, AgreementData } from './data';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Agreement)
    private readonly agreementRepository: Repository<Agreement>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async getQuestions(part: string) {
    if (!['web', 'server', 'design'].includes(part)) {
      throw new BadRequestException({
        errors: {
          title: 'INVALID_PART_NAME',
          detail: '유효하지 않은 파트입니다.',
        },
      });
    }

    const commonQuestions = await this.questionRepository.find({
      where: { part: 'common' },
    });
    const questionArray = await this.questionRepository.find({
      where: { part },
    });

    const resultQuestions = commonQuestions.concat(questionArray);
    return {
      part,
      resultQuestions,
    };
  }

  async getAgreement() {
    return await this.agreementRepository.find();
  }

  async setAgreement() {
    await this.agreementRepository.save(AgreementData);
  }

  setQuestions() {
    const keys = Questions && Object.keys(Questions || {});
    keys?.map(part => {
      Questions[part]?.map(async question => {
        await this.questionRepository.save(question);
      });
    });
  }
}
