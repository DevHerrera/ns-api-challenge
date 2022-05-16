import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideosRepository } from 'src/repositories/video.repository';
import { Video } from 'src/models/video.entity';
@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideosRepository)
    private videoRepository: VideosRepository,
  ) {}

  /**
   * Helper fuction to filter videos
   * Videos can be filted by user owner or by all published
   * @param filterData - Filter configuration
   * @return {[json]} [Response with filter objet to be used with TypeORM]
   */

  private generateVideoFilterBasedOnQueryParam(filterData: {
    own: boolean;
    userId: number;
  }): {
    sqlWhere: string;
    sqlParams: { isPublished: boolean; userId: number };
  } {
    if (!filterData.own) {
      return {
        sqlWhere: 'v.isPublished = :isPublished',
        sqlParams: { isPublished: true, userId: null },
      };
    } else {
      return {
        sqlWhere: 'owner.id = :userId',
        sqlParams: { userId: filterData.userId, isPublished: null },
      };
    }
  }

  /**
   * Queries all published videos from database
   * Videos can be filted by user owner or by all published
   * @param queryParams - Query params from request
   * @param ownerUserId - Current logged in user's id
   * @return {[json]} [Response json objet]
   */

  public async getVideos(
    queryParams: any,
    ownerUserId: number = null,
  ): Promise<{ videos: Video[]; totalItems: number }> {
    // Check for pagination variables
    const skip = queryParams.skip || 0;
    const take = queryParams.take || 10;
    // See if query params is requesting only owner's videos
    let filters = this.generateVideoFilterBasedOnQueryParam({
      own: queryParams.own,
      userId: ownerUserId,
    });
    const query = await this.videoRepository
      .createQueryBuilder('v')
      .innerJoinAndSelect('v.owner', 'owner')
      .select([
        'v.id',
        'v.description',
        'v.isPublished',
        'v.sourceUrl',
        'v.title',
        'owner.name',
        'owner.email',
      ])
      .skip(skip)
      .take(take)
      .where(filters.sqlWhere, filters.sqlParams)
      .getManyAndCount();

    const videos = query[0];
    const totalItems = query[1];
    if (!(totalItems > 0)) {
      throw new NotFoundException('No videos found');
    }
    const payload = {
      videos: videos,
      totalItems,
    };
    return payload;
  }

  /**
   * Queries one published video by id from database
   * If current user is owner, returns the video even
   * if it is unpublished
   * @param videoId - Video id to find
   * @param userId - Current logged in user's id
   * @return {[json]} [Response json objet]
   */

  public async getVideoById(
    videoId: number,
    userId: number = null,
  ): Promise<Video> {
    let video = await this.videoRepository
      .createQueryBuilder('v')
      .innerJoin('v.owner', 'owner')
      .select([
        'v.title',
        'v.sourceUrl',
        'v.isPublished',
        'v.description',
        'v.createdAt',
        'owner.name',
        'owner.photoUrl',
        'owner.id',
      ])
      .where('v.id = :videoId', { videoId })
      .getOne();

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    if (video.owner.id === userId) {
      return video;
    }
    if (!video.isPublished) {
      throw new NotFoundException('Video not found');
    }
    return video;
  }
}
