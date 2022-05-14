import { Repository, EntityRepository } from 'typeorm';
import { Video } from 'src/models/video.entity';
@EntityRepository(Video)
export class VideosRepository extends Repository<Video> {}
