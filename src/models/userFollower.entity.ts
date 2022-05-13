import { JoinColumn, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('User_Followers')
export class UserFollower {
  @ManyToOne(() => User, (user) => user.userFollowers, { primary: true })
  @JoinColumn({ name: 'user_follower_id' })
  userFollowerId: User;

  @ManyToOne(() => User, (user) => user.userSuscriptions, { primary: true })
  @JoinColumn({ name: 'user_creator_id' })
  userCreatorId: User;
}
