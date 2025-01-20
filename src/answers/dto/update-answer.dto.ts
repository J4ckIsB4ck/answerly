import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAnswerDto {
  @ApiPropertyOptional({ example: 'Updated answer body', description: 'Updated body of the answer' })
  @IsOptional()
  @IsString()
  body?: string;

}
