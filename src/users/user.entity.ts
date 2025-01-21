import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Question } from '../questions/question.entity';
import { Answer } from '../answers/answer.entity';
import { Comment } from '../comments/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: 0 })
  reputation: number;

  @OneToMany(() => Question, question => question.user, { cascade: true, onDelete: 'CASCADE' })
  questions: Question[];

  @OneToMany(() => Answer, answer => answer.user, { cascade: true, onDelete: 'CASCADE' })
  answers: Answer[];

  @OneToMany(() => Comment, comment => comment.user, { cascade: true, onDelete: 'CASCADE' })
  comments: Comment[];
}
