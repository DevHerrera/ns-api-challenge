import { User } from 'src/modules/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
@Entity('User_Followers')
export class UserFollower {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'user_follower_id', primary: true, nullable: false })
  userFollowerId: number;

  @ManyToOne(() => User, (user) => user.userFollowers, { primary: true })
  @JoinColumn({ name: 'user_follower_id' })
  follower: User;

  @Column({ name: 'user_creator_id', primary: true, nullable: false })
  userCreatorId: number;

  @ManyToOne(() => User, (user) => user.userSuscriptions, { primary: true })
  @JoinColumn({ name: 'user_creator_id' })
  creator: User;
}
