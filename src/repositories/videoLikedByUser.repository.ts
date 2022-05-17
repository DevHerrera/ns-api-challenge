import { Repository, EntityRepository } from 'typeorm';
import { VideoLikedByUser } from 'src/models/videoLikedByUser.entity';
@EntityRepository(VideoLikedByUser)
export class VideosLikedByUserRepository extends Repository<VideoLikedByUser> {}
