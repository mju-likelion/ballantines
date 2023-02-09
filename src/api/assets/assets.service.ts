import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Part } from './dto/get-questions.dto';
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

  async getQuestions(part: Part) {
    return part;
  }

  async getAgreement() {
    return 'agreement';
  }
}
