import { IsString, Length, IsNotEmpty } from 'class-validator';

export class QuestionDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsString()
  @Length(1, 50)
  status: string;
}

export class UpdateQuestionStatusDto {
  @IsString()
  @Length(1, 50)
  status: string;
}
