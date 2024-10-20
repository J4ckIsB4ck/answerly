import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer) private answersRepository: Repository<Answer>,
  ) {}

  findAll(): Promise<Answer[]> {
    return this.answersRepository.find();
  }

  findOne(id: number): Promise<Answer> {
    return this.answersRepository.findOne({ where: { id } });
  }

  create(answer: Partial<Answer>): Promise<Answer> {
    return this.answersRepository.save(answer);
  }
}
