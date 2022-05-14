import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosRepository } from 'src/repositories/video.repository';
import { JwtModule } from '@nestjs/jwt';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';

@Module({
  controllers: [VideoController],
  imports: [
    TypeOrmModule.forFeature([VideosRepository]),
    JwtModule.register({}),
  ],
  providers: [VideoService],
})
export class VideoModule {}
