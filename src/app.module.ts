import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5437,
      username: 'answerly',
      password: 'answerly',
      database: 'answerlyq',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    QuestionsModule,
    AnswersModule,
    CommentsModule,
    VotesModule,
  ],
})
export class AppModule {}
