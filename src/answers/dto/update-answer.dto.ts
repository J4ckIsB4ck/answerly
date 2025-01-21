import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAnswerDto {
  @ApiPropertyOptional({ example: '', description: 'Updated body of the answer' })
  @IsOptional()
  @IsString()
  body?: string;

}
