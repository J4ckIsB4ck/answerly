import { IsString, IsIn, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VoteDto {
  @ApiProperty({ example: 1, description: 'ID of the user casting the vote' })
  @IsInt()
  userId: number;

  @ApiPropertyOptional({ example: 1, description: 'ID of the question being voted on (optional)' })
  @IsOptional()
  @IsInt()
  questionId?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID of the answer being voted on (optional)' })
  @IsOptional()
  @IsInt()
  answerId?: number;

  @ApiProperty({ example: 'upvote', description: 'Type of vote, can be either "upvote" or "downvote"' })
  @IsString()
  @IsIn(['upvote', 'downvote'])
  vote_type: string;
}
