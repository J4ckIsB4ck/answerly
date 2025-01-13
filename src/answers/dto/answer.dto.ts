import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty({ example: '', description: 'The body of the answer' })
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({ example: true, description: 'Indicates whether the answer is accepted' })
  @IsBoolean()
  is_accepted: boolean;

  @ApiProperty({ example: 1, description: 'The ID of the user who created the answer' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1, description: 'The ID of the question this answer belongs to' })
  @IsNumber()
  @IsNotEmpty()
  questionId: number;
}
