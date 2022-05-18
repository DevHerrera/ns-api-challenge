import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosRepository } from 'src/modules/video/repositories/video.repository';
import { JwtModule } from '@nestjs/jwt';
import { VideoService } from './services/video.service';
import { VideoController } from './controllers/video.controller';
import { VideosLikedByUserRepository } from 'src/modules/video/repositories/videoLikedByUser.repository';
@Module({
  controllers: [VideoController],
  imports: [
    TypeOrmModule.forFeature([VideosRepository, VideosLikedByUserRepository]),
    JwtModule.register({}),
  ],
  providers: [VideoService],
})
export class VideoModule {}
