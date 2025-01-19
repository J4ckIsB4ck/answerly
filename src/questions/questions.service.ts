import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { QuestionDto } from './dto/question.dto';
import { User } from '../users/user.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionsRepository: Repository<Question>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  findOne(id: number): Promise<Question> {
    return this.questionsRepository.findOneBy({ id });
  }

  async create(questionDto: QuestionDto): Promise<Question> {
    const { userId, ...questionData } = questionDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const question = this.questionsRepository.create({
      ...questionData,
      user,
    });
    return this.questionsRepository.save(question);
  }
  async updateStatus(id: number, status: string): Promise<Question> {
    const question = await this.findOne(id);
    if (!question) {
      throw new Error(`Question with ID ${id} not found`);
    }

    question.status = status;
    return this.questionsRepository.save(question);
  }
  async update(id: number, updateData: Partial<QuestionDto>): Promise<Question> {
    const question = await this.questionsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!question) {
      throw new Error(`Question with ID ${id} not found`);
    }

    if (updateData.title !== undefined) {
      question.title = updateData.title;
    }
    if (updateData.body !== undefined) {
      question.body = updateData.body;
    }
    if (updateData.status !== undefined) {
      question.status = updateData.status;
    }

    return this.questionsRepository.save(question);
  }

}
