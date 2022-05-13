import { JoinColumn, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('Videos_Liked_By_Users')
export class VideoLikedByUser {
  @ManyToOne(() => User, (user) => user.likedVideos, { primary: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Video, (video) => video.likedByUsers, { primary: true })
  @JoinColumn({ name: 'video_id' })
  video: Video;
}
