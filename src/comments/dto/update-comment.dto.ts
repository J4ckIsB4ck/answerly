import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiPropertyOptional({ example: '', description: 'Updated body of the comment' })
  @IsOptional()
  @IsString()
  body?: string;
}
