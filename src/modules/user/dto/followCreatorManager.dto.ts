import { IsBoolean } from 'class-validator';

export class FollowCreatorManagerDto {
  @IsBoolean({
    message: 'Follow flag must be either true or false',
  })
  follow: boolean;
}
