import { IsOptional, IsString, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQuestionDto {
  @ApiPropertyOptional({ example: '', description: 'Updated title of the question' })
  @IsOptional()
  @IsString()
  @Length(1, 255)
  title?: string;

  @ApiPropertyOptional({ example: '', description: 'Updated body of the question' })
  @IsOptional()
  @IsString()
  body?: string;
}
