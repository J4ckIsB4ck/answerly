import { IsString, IsEmail, Length } from 'class-validator';

export class UserDto {
  @IsString()
  @Length(1, 50)
  username: string;

  @IsEmail()
  @Length(1, 100)
  email: string;
}
