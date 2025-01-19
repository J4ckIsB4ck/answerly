import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { User } from '../users/user.entity';
import { Answer } from '../answers/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Answer])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
