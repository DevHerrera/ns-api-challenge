import {
  Controller,
  Post,
  Get,
  HttpCode,
  Body,
  Put,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard';

import { VideoService } from './video.service';

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
  getVideos(@Req() req: Request) {
    console.log(req.user);
    return this.videoService.getVideos();
  }

  @Get(':videoId')
  getVideoById(@Param('videoId') videoId: string) {
    return this.videoService.getVideoById(parseInt(videoId));
  }
}
