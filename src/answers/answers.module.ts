import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, User, Question])],
  providers: [AnswersService],
  controllers: [AnswersController],
})
export class AnswersModule {}
