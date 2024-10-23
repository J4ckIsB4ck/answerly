import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VoteDto {
  @ApiProperty({ example: '', description: 'Type of vote, can be either "upvote" or "downvote"' })
  @IsString()
  @IsIn(['upvote', 'downvote'])
  vote_type: string;
}
