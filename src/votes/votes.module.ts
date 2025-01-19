import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { Answer } from '../answers/answer.entity';
import { Comment } from '../comments/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, User, Question, Answer, Comment])],
  providers: [VotesService],
  controllers: [VotesController],
})
export class VotesModule {}
