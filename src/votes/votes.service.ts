import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { Answer } from '../answers/answer.entity';
import { Comment } from '../comments/comment.entity';
import { VoteDto } from './dto/vote.dto';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote) private readonly votesRepository: Repository<Vote>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Question) private readonly questionsRepository: Repository<Question>,
    @InjectRepository(Answer) private readonly answersRepository: Repository<Answer>,
    @InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>,
  ) {}

  findAll(): Promise<Vote[]> {
    return this.votesRepository.find({
      relations: ['user', 'question', 'answer', 'comment'],
    });
  }

  findOne(id: number): Promise<Vote> {
    return this.votesRepository.findOne({
      where: { id },
      relations: ['user', 'question', 'answer', 'comment'],
    });
  }

  async create(voteDto: VoteDto): Promise<Vote> {
    const { userId, questionId, answerId, commentId, vote_type } = voteDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if ([questionId, answerId, commentId].filter(Boolean).length !== 1) {
      throw new BadRequestException('You must vote for exactly one of question, answer, or comment');
    }

    let question = null;
    let answer = null;
    let comment = null;

    if (questionId) {
      question = await this.questionsRepository.findOne({ where: { id: questionId } });
      if (!question) {
        throw new NotFoundException(`Question with ID ${questionId} not found`);
      }
    }

    if (answerId) {
      answer = await this.answersRepository.findOne({ where: { id: answerId } });
      if (!answer) {
        throw new NotFoundException(`Answer with ID ${answerId} not found`);
      }
    }

    if (commentId) {
      comment = await this.commentsRepository.findOne({ where: { id: commentId } });
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${commentId} not found`);
      }
    }

    const vote = this.votesRepository.create({
      user,
      question,
      answer,
      comment,
      vote_type,
    });

    return this.votesRepository.save(vote);
  }
  async update(voteId: number, voteDto: VoteDto): Promise<Vote> {
    const { userId, questionId, answerId, commentId, vote_type } = voteDto;

    const vote = await this.votesRepository.findOne({
      where: { id: voteId },
      relations: ['user', 'question', 'answer', 'comment'],
    });

    if (!vote) {
      throw new NotFoundException(`Vote with ID ${voteId} not found`);
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if ([questionId, answerId, commentId].filter(Boolean).length !== 1) {
      throw new BadRequestException('You must update vote for exactly one of question, answer, or comment');
    }

    let question = null;
    let answer = null;
    let comment = null;

    if (questionId) {
      question = await this.questionsRepository.findOne({ where: { id: questionId } });
      if (!question) {
        throw new NotFoundException(`Question with ID ${questionId} not found`);
      }
    }

    if (answerId) {
      answer = await this.answersRepository.findOne({ where: { id: answerId } });
      if (!answer) {
        throw new NotFoundException(`Answer with ID ${answerId} not found`);
      }
    }

    if (commentId) {
      comment = await this.commentsRepository.findOne({ where: { id: commentId } });
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${commentId} not found`);
      }
    }

    vote.user = user;
    vote.question = question;
    vote.answer = answer;
    vote.comment = comment;
    vote.vote_type = vote_type;

    return this.votesRepository.save(vote);
  }
}
