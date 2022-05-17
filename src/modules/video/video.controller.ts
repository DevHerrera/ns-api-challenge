import {
  Controller,
  Post,
  Get,
  HttpCode,
  Body,
  Put,
  Param,
  UseGuards,
  Query,
  Req,
  Patch,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorators';
import { VideoService } from './video.service';

import { CreateVideoDto } from './dto/createVideo.dto';
import { EditVideoDto } from './dto/editVideo.dto';
import { PublishmentVideoDto } from './dto/publishmentVideo.dto';

@UseGuards(JwtGuard)
@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  /**
   * [Store video into database]
   * @route POST[/videos]
   */

  @Post()
  @HttpCode(201)
  storeVideo(@Body() videoData: CreateVideoDto, @GetUser('id') userId: number) {
    return this.videoService.createVideo(videoData, userId);
  }

  /**
   * [Video publishment manager]
   * @route PATCH[/videos/:videoId/publishment]
   */

  @Patch(':videoId/publishment')
  @HttpCode(200)
  publishmentVideoManagerByVideoId(
    @Param('videoId') videoId: number,
    @GetUser('id') userId: number,
    @Body() data: PublishmentVideoDto,
  ) {
    return this.videoService.videoPublisherHelper(
      videoId,
      userId,
      data.isPublished,
    );
  }

  /**
   * [Set video as published by id into database]
   * @route PATCH[/videos/:videoId/publish]
   */

  @Patch(':videoId/publish')
  @HttpCode(200)
  publishVideoById(
    @Param('videoId') videoId: number,
    @GetUser('id') userId: number,
  ) {
    return this.videoService.publishVideoById(videoId, userId);
  }

  /**
   * [Set video as unpublish by id into database]
   * @route PATCH[/videos/:videoId/unpublish]
   */

  @Patch(':videoId/unpublish')
  @HttpCode(200)
  unpublishVideoById(
    @Param('videoId') videoId: number,
    @GetUser('id') userId: number,
  ) {
    return this.videoService.unpublishVideoById(videoId, userId);
  }

  /**
   * [Like video by id and save into database]
   * @route POST[/videos/:videoId/like]
   */

  @Post(':videoId/like')
  likeVideoById(
    @GetUser('id') userId: number,
    @Param('videoId') videoId: string,
  ) {
    return this.videoService.likeVideoById(parseInt(videoId), userId);
  }

  /**
   * [Edit video by id into database]
   * @route PUT[/videos/:videoId]
   */

  @Put(':videoId')
  editVideoById(
    @Body() videoData: EditVideoDto,
    @GetUser('id') userId: number,
    @Param('videoId') videoId: string,
  ) {
    return this.videoService.updateVideoById(
      videoData,
      userId,
      parseInt(videoId),
    );
  }

  /**
   * [Get videos from database]
   * @route GET[/videos]
   * @queryParams {own} [Filter by owned videos]
   * @queryParams {skip} [Skip pagination]
   * @queryParams {take} [Limit pagination]
   */

  @Get()
  getVideos(@GetUser('id') userId: number, @Query() query: any) {
    return this.videoService.getVideos(query, userId);
  }

  /**
   * [Get video by id from database]
   * @route GET[/videos/:videoId]
   */

  @Get(':videoId')
  getVideoById(
    @Param('videoId') videoId: string,
    @GetUser('id') userId: number,
  ) {
    return this.videoService.getVideoById(parseInt(videoId), userId);
  }
}
