import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class AnswerDto {
  @IsNotEmpty()
  @IsString()
  body: string;

  @IsBoolean()
  is_accepted: boolean;
}
