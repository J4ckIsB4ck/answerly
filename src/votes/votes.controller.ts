import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { VotesService } from './votes.service';
import { Vote } from './vote.entity';
import { VoteDto } from './dto/vote.dto';

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
  create(@Body() voteDto: VoteDto): Promise<Vote> {
    return this.votesService.create(voteDto);
  }
}
