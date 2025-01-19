import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ example: '', description: 'The content of the comment' })
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({ example: 1, description: 'The ID of the user who created the comment' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1, description: 'The ID of the answer this comment is related to' })
  @IsNumber()
  @IsNotEmpty()
  answerId: number;
}
