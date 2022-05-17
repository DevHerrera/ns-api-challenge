import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('Videos_Liked_By_Users')
export class VideoLikedByUser {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ primary: true, nullable: false, name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.likedVideos, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ primary: true, nullable: false, name: 'video_id' })
  videoId: number;

  @ManyToOne(() => Video, (video) => video.likedByUsers, { primary: true })
  @JoinColumn({ name: 'video_id' })
  video: Video;
}
