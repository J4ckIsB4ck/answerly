import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private questionsRepository: Repository<Question>,
  ) {}

  findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  findOne(id: number): Promise<Question> {
    return this.questionsRepository.findOne({ where: { id } });
  }

  create(question: Partial<Question>): Promise<Question> {
    return this.questionsRepository.save(question);
  }

  updateStatus(id: number, status: string): Promise<any> {
    return this.questionsRepository.update(id, { status });
  }
}
