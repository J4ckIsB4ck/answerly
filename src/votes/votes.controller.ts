import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { VotesService } from './votes.service';
import { Vote } from './vote.entity';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Get()
  findAll(): Promise<Vote[]> {
    return this.votesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Vote> {
    return this.votesService.findOne(id);
  }

  @Post()
  create(@Body() vote: Partial<Vote>): Promise<Vote> {
    return this.votesService.create(vote);
  }
}
