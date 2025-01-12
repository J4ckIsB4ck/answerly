import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    UsersModule,
  ],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}
