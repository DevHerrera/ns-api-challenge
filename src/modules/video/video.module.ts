import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosRepository } from 'src/repositories/video.repository';
import { JwtModule } from '@nestjs/jwt';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { VideosLikedByUserRepository } from 'src/repositories/videoLikedByUser.repository';
@Module({
  controllers: [VideoController],
  imports: [
    TypeOrmModule.forFeature([VideosRepository, VideosLikedByUserRepository]),
    JwtModule.register({}),
  ],
  providers: [VideoService],
})
export class VideoModule {}
