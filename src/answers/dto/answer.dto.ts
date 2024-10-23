import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty({ example: '', description: 'The body of the answer' })
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({ example: true, description: 'Indicates whether the answer is accepted' })
  @IsBoolean()
  is_accepted: boolean;
}
