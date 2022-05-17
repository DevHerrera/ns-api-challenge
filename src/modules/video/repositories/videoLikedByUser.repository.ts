import { Repository, EntityRepository } from 'typeorm';
import { VideoLikedByUser } from '../entities/videoLikedByUser.entity';
@EntityRepository(VideoLikedByUser)
export class VideosLikedByUserRepository extends Repository<VideoLikedByUser> {}
