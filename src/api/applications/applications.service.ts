import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  create(createApplicationDto: CreateApplicationDto) {
    return 'This action adds a new application';
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }
}
