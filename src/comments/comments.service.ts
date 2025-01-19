import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../users/user.entity';
import { Answer } from '../answers/answer.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Answer) private readonly answersRepository: Repository<Answer>,
  ) {}

  findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({ relations: ['user', 'answer'] });
  }

  findOne(id: number): Promise<Comment> {
    return this.commentsRepository.findOne({
      where: { id },
      relations: ['user', 'answer'],
    });
  }

  async create(commentDto: CommentDto): Promise<Comment> {
    const { userId, answerId, body } = commentDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const answer = await this.answersRepository.findOne({ where: { id: answerId } });
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${answerId} not found`);
    }

    const comment = this.commentsRepository.create({
      body,
      user,
      answer,
    });

    return this.commentsRepository.save(comment);
  }
}
