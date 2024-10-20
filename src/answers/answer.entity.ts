import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Question } from '../questions/question.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, question => question.id)
  question: Question;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @Column('text')
  body: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: false })
  is_accepted: boolean;
}
