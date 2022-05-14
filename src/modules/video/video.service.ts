import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideosRepository } from 'src/repositories/video.repository';
import { Video } from 'src/models/video.entity';
import { User } from 'src/models/user.entity';
import { createQueryBuilder } from 'typeorm';
@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideosRepository)
    private videoRepository: VideosRepository,
  ) {}
  public async getVideos(): Promise<{ videos: Video[]; totalItems: number }> {
    const query = await this.videoRepository
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.owner', 'owner')
      .select([
        'v.id',
        'v.description',
        'v.isPublished',
        'v.sourceUrl',
        'v.title',
        'owner.name',
        'owner.email',
      ])
      .where('v.isPublished = :isPublished', {
        isPublished: true,
      })
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
  public async getVideoById(videoId: number): Promise<Video> {
    const video = await this.videoRepository
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.owner', 'owner')
      .select([
        'v.id',
        'v.description',
        'v.isPublished',
        'v.sourceUrl',
        'v.title',
        'owner.name',
        'owner.email',
      ])
      .where('v.id = :videoId AND v.isPublished = :isPublished', {
        videoId,
        isPublished: true,
      })
      .getOne();
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    return video;
  }
}
