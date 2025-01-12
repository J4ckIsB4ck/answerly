import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty({ example: 'How to use TypeScript?', description: 'Title of the question' })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({ example: 'I want to understand the basics of TypeScript.', description: 'The body of the question' })
  @IsString()
  body: string;

  @ApiProperty({ example: 'open', description: 'The status of the question' })
  @IsString()
  @Length(1, 50)
  status: string;

  @ApiProperty({ example: 1, description: 'ID of the user who created the question' })
  userId: number;
}

export class UpdateQuestionStatusDto {
  @ApiProperty({ example: 'resolved', description: 'New status of the question' })
  @IsString()
  @Length(1, 50)
  status: string;
}

