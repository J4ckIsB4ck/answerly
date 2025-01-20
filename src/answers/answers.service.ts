import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { AnswerDto } from './dto/answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer) private readonly answersRepository: Repository<Answer>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Question) private readonly questionsRepository: Repository<Question>,
  ) {}

  findAll(): Promise<Answer[]> {
    return this.answersRepository.find({ relations: ['user', 'question'] });
  }

  findOne(id: number): Promise<Answer> {
    return this.answersRepository.findOne({
      where: { id },
      relations: ['user', 'question'],
    });
  }

  async create(answerDto: AnswerDto): Promise<Answer> {
    const { userId, questionId, body, is_accepted } = answerDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const question = await this.questionsRepository.findOne({ where: { id: questionId } });
    if (!question) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }

    const answer = this.answersRepository.create({
      body,
      is_accepted,
      user,
      question,
    });

    return this.answersRepository.save(answer);
  }
  async update(id: number, updateData: Partial<AnswerDto>): Promise<Answer> {
    const answer = await this.answersRepository.findOne({
      where: { id },
      relations: ['user', 'question'],
    });

    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }

    if (updateData.body !== undefined) {
      answer.body = updateData.body;
    }
    if (updateData.is_accepted !== undefined) {
      answer.is_accepted = updateData.is_accepted;
    }

    return this.answersRepository.save(answer);
  }
  async remove(id: number): Promise<void> {
    const comment = await this.answersRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    await this.answersRepository.remove(comment);
  }

}
