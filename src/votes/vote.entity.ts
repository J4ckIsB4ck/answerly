import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';
import { Answer } from '../answers/answer.entity';

@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @ManyToOne(() => Question, question => question.id, { nullable: true })
  question: Question;

  @ManyToOne(() => Answer, answer => answer.id, { nullable: true })
  answer: Answer;

  @Column({ length: 10 })
  vote_type: string;
}
