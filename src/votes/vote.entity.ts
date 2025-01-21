import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { Answer } from '../answers/answer.entity';
import { Comment } from '../comments/comment.entity';

@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Question, question => question.id, { nullable: true })
  question: Question;

  @ManyToOne(() => Answer, answer => answer.id, { nullable: true })
  answer: Answer;

  @ManyToOne(() => Comment, comment => comment.id, { nullable: true })
  comment: Comment;

  @Column({ length: 10 })
  vote_type: string;
}
