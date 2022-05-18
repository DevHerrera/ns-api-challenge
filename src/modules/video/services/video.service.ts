import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideosRepository } from 'src/modules/video/repositories/video.repository';
import { Video } from '../entities/video.entity';
import { CreateVideoDto } from '../dto/createVideo.dto';
import { EditVideoDto } from '../dto/editVideo.dto';
import { VideoLikedByUser } from '../entities/videoLikedByUser.entity';
import { VideosLikedByUserRepository } from 'src/modules/video/repositories/videoLikedByUser.repository';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideosRepository)
    private videoRepository: VideosRepository,
    @InjectRepository(VideosLikedByUserRepository)
    private videosLikedByUserRepository: VideosLikedByUserRepository,
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
   * Helper fuction to manage video publishment
   * Videos can be publised or unpublished by user owner
   * @param videoId - Video id to be updated
   * @param userOwnerId - User owner id
   * @param isPublished - Publishment flag
   * @return {[Video]} [Response with Video object]
   */

  public async videoPublisherHelper(
    videoId: number,
    userOwnerId: number,
    isPublished: boolean,
  ): Promise<Video> {
    let video = await this.videoRepository.findOne({
      where: {
        userOwnerId: userOwnerId,
        id: videoId,
      },
    });
    if (!video) {
      throw new NotFoundException(
        `Video not found or you don't have permission to update it`,
      );
    }
    await this.videoRepository
      .createQueryBuilder('v')
      .update({
        isPublished: isPublished,
      })
      .where({ id: videoId })
      .execute();
    video = await this.videoRepository.findOne(videoId, {
      loadEagerRelations: false,
    });
    return video;
  }

  /**
   * Updates video by id
   * @param videoData - Video data from request
   * @param userOwnerId - Current logged in user's id
   * @return {[Video]} [Video object]
   */

  public async updateVideoById(
    videoData: EditVideoDto,
    userOwnerId: number,
    videoId: number,
  ): Promise<Video> {
    let video = await this.videoRepository.findOne({
      where: {
        userOwnerId: userOwnerId,
        id: videoId,
      },
    });
    if (!video) {
      throw new NotFoundException(
        `Video not found or you don't have permission to update it`,
      );
    }
    video = await this.videoRepository.save(
      {
        id: videoId,
        ...videoData,
      },
      { reload: true },
    );
    // call select instruction again to get all fields
    video = await this.videoRepository.findOne(videoId, {
      loadEagerRelations: false,
    });
    return video;
  }

  /**
   * Unpublishes video
   * @param videoId - Video id to be published
   * @param userOwnerId - Current logged in user's id
   * @return {[Video]} [Video object]
   */

  public async unpublishVideoById(
    videoId: number,
    userOwnerId: number,
  ): Promise<Video> {
    return await this.videoPublisherHelper(videoId, userOwnerId, false);
  }

  /**
   * Publishes video
   * @param videoId - Video id to be published
   * @param userOwnerId - Current logged in user's id
   * @return {[Video]} [Video object]
   */

  public async publishVideoById(
    videoId: number,
    userOwnerId: number,
  ): Promise<Video> {
    return await this.videoPublisherHelper(videoId, userOwnerId, true);
  }

  /**
   * Stores video into database
   * @param videoData - Video data from request
   * @param userOwnerId - Current logged in user's id
   * @return {[Video]} [Video object]
   */

  public async createVideo(
    videoData: CreateVideoDto,
    userOwnerId: number,
  ): Promise<Video> {
    const video = await this.videoRepository.save({
      ...videoData,
      userOwnerId: userOwnerId,
    });
    return video;
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

  /**
   * Likes a video from database
   * @param videoId - Video id to find
   * @param userId - Current logged in user's id
   * @return {[json]} [Response json objet]
   */
  public async likeVideoById(
    videoId: number,
    userId: number,
  ): Promise<VideoLikedByUser> {
    const video = await this.videoRepository.findOne(videoId, {
      where: { isPublished: true },
    });
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    const likeVideo = await this.videosLikedByUserRepository.save({
      userId: userId,
      videoId: videoId,
    });
    return likeVideo;
  }
}
