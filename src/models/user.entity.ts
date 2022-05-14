import {
  ManyToOne,
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { UserFollower } from './userFollower.entity';
import { Role } from './role.entity';
import { Video } from './video.entity';
import { VideoLikedByUser } from './videoLikedByUser.entity';
@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  name: string;

  @Column({
    name: 'photo_url',
  })
  photoUrl: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ nullable: false, name: 'role_id' })
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users, { nullable: false, eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Video, (video) => video.userOwnerId)
  videos: Video[];

  @OneToMany(() => VideoLikedByUser, (videoLiked) => videoLiked.user)
  likedVideos: VideoLikedByUser[];

  @OneToMany(() => UserFollower, (userFollower) => userFollower.userFollowerId)
  userFollowers: UserFollower[];

  @OneToMany(() => UserFollower, (userFollower) => userFollower.userCreatorId)
  userSuscriptions: UserFollower[];
}
