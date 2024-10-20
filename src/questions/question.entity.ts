import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  body: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ length: 50 })
  status: string;
}
