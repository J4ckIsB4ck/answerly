import { IsString, IsIn } from 'class-validator';

export class VoteDto {
  @IsString()
  @IsIn(['upvote', 'downvote'])
  vote_type: string;
}
