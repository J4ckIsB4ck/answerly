import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Answer } from '../answers/answer.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Answer, answer => answer.id, { onDelete: 'CASCADE' })
  answer: Answer;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  user: User;

  @Column('text')
  body: string;

  @CreateDateColumn()
  created_at: Date;
}
