import { IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: '', description: 'The unique username of the user' })
  @IsString()
  @Length(1, 50)
  username: string;

  @ApiProperty({ example: '', description: 'The user email address' })
  @IsEmail()
  @Length(1, 100)
  email: string;
}
