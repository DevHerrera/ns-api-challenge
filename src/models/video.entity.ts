import {
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { VideoLikedByUser } from './videoLikedByUser.entity';
@Entity('Videos')
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'source_url', nullable: false })
  sourceUrl: string;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @Column({ name: 'is_published', nullable: false, default: 0 })
  isPublished: boolean;

  @ManyToOne(() => User, (user) => user.videos, { nullable: false })
  @JoinColumn({ name: 'user_owner_id' })
  userOwnerId: User;

  @OneToMany(() => VideoLikedByUser, (videoLiked) => videoLiked.video)
  likedByUsers: VideoLikedByUser[];
}
