import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';

import { UserFollowerRepository } from 'src/modules/user/repositories/userFollower.repository';
import { UsersRepository } from 'src/modules/auth/repositories/users.repository';
import { VideosRepository } from 'src/modules/video/repositories/video.repository';
import { VideosLikedByUserRepository } from 'src/modules/video/repositories/videoLikedByUser.repository';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([
      VideosRepository,
      VideosLikedByUserRepository,
      UsersRepository,
      UserFollowerRepository,
    ]),
    JwtModule.register({}),
  ],
  providers: [UserService, NotificationService],
})
export class UserModule {}
