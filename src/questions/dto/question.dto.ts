import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty({ example: '', description: 'Title of the question' })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiProperty({ example: '', description: 'The body of the question' })
  @IsString()
  body: string;

  @ApiProperty({ example: '', description: 'The status of the question' })
  @IsString()
  @Length(1, 50)
  status: string;
}

export class UpdateQuestionStatusDto {
  @ApiProperty({ example: '', description: 'New status of the question' })
  @IsString()
  @Length(1, 50)
  status: string;
}
