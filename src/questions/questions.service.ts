import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { QuestionDto } from './dto/question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
  ) {}

  findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  findOne(id: number): Promise<Question> {
    return this.questionsRepository.findOneBy({ id });
  }

  async create(questionDto: QuestionDto): Promise<Question> {
    const question = this.questionsRepository.create(questionDto);
    return this.questionsRepository.save(question);
  }

  async updateStatus(id: number, status: string): Promise<Question> {
    const question = await this.findOne(id);
    if (!question) {
      throw new Error('Question not found');
    }
    question.status = status;
    return this.questionsRepository.save(question);
  }
}
