import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote) private votesRepository: Repository<Vote>,
  ) {}

  findAll(): Promise<Vote[]> {
    return this.votesRepository.find();
  }

  findOne(id: number): Promise<Vote> {
    return this.votesRepository.findOne({ where: { id } });
  }

  create(vote: Partial<Vote>): Promise<Vote> {
    return this.votesRepository.save(vote);
  }
}
