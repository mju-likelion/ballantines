import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agreement } from './entity/agreement.entity';
import { Question } from './entity/question.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Agreement)
    private readonly agreementRepository: Repository<Agreement>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async findQuestions(part) {
    const commonQuestions = await this.questionRepository.find({
      where: { part: 'common' },
      order: {
        order: 'ASC',
      },
    });
    const partQuestions = await this.questionRepository.find({
      where: { part },
      order: {
        order: 'ASC',
      },
    });

    const resultQuestions = [...commonQuestions, ...partQuestions];

    return {
      part,
      resultQuestions,
    };
  }

  async findAgreement() {
    return await this.agreementRepository.find();
  }
}
