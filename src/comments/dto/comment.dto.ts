import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ example: '', description: 'The content of the comment' })
  @IsNotEmpty()
  @IsString()
  body: string;
}
