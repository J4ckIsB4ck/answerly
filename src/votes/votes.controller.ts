import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { VotesService } from './votes.service';
import { Vote } from './vote.entity';
import { VoteDto } from './dto/vote.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get a list of all votes',
    description: 'Returns an array of voting objects.',
  })
  @ApiResponse({ status: 200, description: 'The list of votes has been successfully received.' })
  findAll(): Promise<Vote[]> {
    return this.votesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get voting data',
    description: 'Returns a voting object by its ID.',
  })
  @ApiParam({ name: 'id', description: 'Vote ID', type: Number })
  @ApiResponse({ status: 200, description: 'Voting data received successfully.' })
  @ApiResponse({ status: 404, description: 'No vote with this ID found.' })
  findOne(@Param('id') id: number): Promise<Vote> {
    return this.votesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new vote',
    description: 'Creates a vote based on the submitted data.',
  })
  @ApiResponse({ status: 201, description: 'Voting successfully created.' })
  @ApiResponse({ status: 400, description: 'Incorrect voting data.' })
  create(@Body() voteDto: VoteDto): Promise<Vote> {
    return this.votesService.create(voteDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update voting',
    description: 'Updates voting data by ID.',
  })
  @ApiParam({ name: 'id', description: 'Vote ID', type: Number })
  @ApiResponse({ status: 200, description: 'Voting has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Incorrect data for update.' })
  @ApiResponse({ status: 404, description: 'No vote with this ID found.' })
  update(@Param('id') id: number, @Body() voteDto: VoteDto): Promise<Vote> {
    return this.votesService.update(id, voteDto);
  }
}
