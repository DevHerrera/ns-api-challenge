import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

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
  Patch,
} from '@nestjs/common';

import { JwtGuard } from '../../auth/guard';
import { GetUser } from '../../auth/decorators';
import { VideoService } from '../services/video.service';

import { CreateVideoDto } from '../dto/createVideo.dto';
import { EditVideoDto } from '../dto/editVideo.dto';
import { PublishmentVideoDto } from '../dto/publishmentVideo.dto';

@ApiTags('Videos')
@UseGuards(JwtGuard)
@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  /**
   * [Store video into database]
   * @route POST[/videos]
   */
  @ApiOperation({ summary: 'Store video into database' })
  @ApiResponse({ status: 201, description: 'Ok, stored' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({
    required: true,
    name: 'sourceUrl',
    type: 'string',
    description: 'Http Url for the video',
  })
  @ApiParam({
    required: true,
    name: 'title',
    type: 'string',
    description: 'Title for the video',
  })
  @ApiParam({
    required: true,
    name: 'description',
    type: 'string',
    description: 'Description for the video',
  })
  @Post()
  @HttpCode(201)
  storeVideo(@Body() videoData: CreateVideoDto, @GetUser('id') userId: number) {
    return this.videoService.createVideo(videoData, userId);
  }

  /**
   * [Video publishment manager]
   * @route PATCH[/videos/:videoId/publishment]
   */
  @ApiOperation({ summary: 'Manage publishment of a video' })
  @ApiResponse({ status: 200, description: 'Ok, updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  @ApiParam({
    required: true,
    name: 'isPublished',
    type: 'boolean',
    description: 'Flag true or false',
  })
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
  @ApiOperation({ summary: 'Publish video directly' })
  @ApiResponse({ status: 200, description: 'Ok, updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Video not found' })
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

  @ApiOperation({ summary: 'Unpublish video directly' })
  @ApiResponse({ status: 200, description: 'Ok, updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Video not found' })
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

  @ApiOperation({ summary: 'Like a video' })
  @ApiResponse({ status: 201, description: 'Ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Video not found' })
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

  @ApiOperation({ summary: 'Update video into database' })
  @ApiResponse({ status: 200, description: 'Ok, updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  @ApiParam({
    required: false,
    name: 'sourceUrl',
    type: 'string',
    description: 'Http Url for the video',
  })
  @ApiParam({
    required: false,
    name: 'title',
    type: 'string',
    description: 'Title for the video',
  })
  @ApiParam({
    required: false,
    name: 'description',
    type: 'string',
    description: 'Description for the video',
  })
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

  @ApiOperation({ summary: 'Get all published videos from database' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Videos not found' })
  @ApiQuery({
    name: 'take',
    type: 'number',
    description: 'Limit query',
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    type: 'number',
    description: 'Offset query',
    required: false,
  })
  @ApiQuery({
    name: 'own',
    type: 'boolean',
    description: 'Call only owned videos',
    required: false,
  })
  @Get()
  getVideos(@GetUser('id') userId: number, @Query() query: any) {
    return this.videoService.getVideos(query, userId);
  }

  /**
   * [Get video by id from database]
   * @route GET[/videos/:videoId]
   */

  @ApiOperation({ summary: 'Get video by id from database' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Video not found' })
  @Get(':videoId')
  getVideoById(
    @Param('videoId') videoId: string,
    @GetUser('id') userId: number,
  ) {
    return this.videoService.getVideoById(parseInt(videoId), userId);
  }
}
