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
} from '@nestjs/common';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorators';
import { VideoService } from './video.service';
import { User } from 'src/models/user.entity';

@UseGuards(JwtGuard)
@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
  @Post()
  @HttpCode(201)
  storeVideo() {}

  @Put(':videoId/publish')
  publishVideoById() {}

  @Put('videoId/unpublish')
  unpublishVideoById() {}

  @Put(':videoId')
  editVideoById() {}

  @Get()
  getVideos(@GetUser() user: User, @Query() query: any) {
    return this.videoService.getVideos(query, user['id']);
  }

  @Get(':videoId')
  getVideoById(@Param('videoId') videoId: string, @GetUser() user: User) {
    return this.videoService.getVideoById(parseInt(videoId), user.id);
  }
}
