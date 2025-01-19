import { IsString, IsIn, IsOptional, IsInt, ValidateIf } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class VoteDto {
  @ApiProperty({ example: 1, description: 'ID of the user casting the vote' })
  @IsInt()
  userId: number;

  @ApiPropertyOptional({ example: 1, description: 'ID of the question being voted on (optional)' })
  @ValidateIf(o => !o.answerId && !o.commentId)
  @IsInt()
  @IsOptional()
  questionId?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID of the answer being voted on (optional)' })
  @ValidateIf(o => !o.questionId && !o.commentId)
  @IsInt()
  @IsOptional()
  answerId?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID of the comment being voted on (optional)' })
  @ValidateIf(o => !o.questionId && !o.answerId)
  @IsInt()
  @IsOptional()
  commentId?: number;

  @ApiProperty({ example: 'upvote', description: 'Type of vote, can be either "upvote" or "downvote"' })
  @IsString()
  @IsIn(['upvote', 'downvote'])
  vote_type: string;
}
