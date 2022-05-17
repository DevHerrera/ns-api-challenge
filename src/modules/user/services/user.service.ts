import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NotificationService } from './notification.service';

import { UserFollowerRepository } from 'src/modules/user/repositories/userFollower.repository';
import { UsersRepository } from 'src/modules/auth/repositories/users.repository';
import { VideosRepository } from 'src/modules/video/repositories/video.repository';
import { VideosLikedByUserRepository } from 'src/modules/video/repositories/videoLikedByUser.repository';

import { User } from 'src/modules/auth/entities/user.entity';
import { Video } from 'src/modules/video/entities/video.entity';
import { VideoLikedByUser } from 'src/modules/video/entities/videoLikedByUser.entity';
import { UserFollower } from '../entities/userFollower.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(VideosRepository)
    private videoRepository: VideosRepository,
    @InjectRepository(VideosLikedByUserRepository)
    private videosLikedByUserRepository: VideosLikedByUserRepository,
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    @InjectRepository(UserFollowerRepository)
    private userFollowerRepository: UserFollowerRepository,
    private notificationService: NotificationService,
  ) {}

  /**
   * Follow user creator
   * @param creatorId - User creator id
   * @param userId - User follower id (current user)
   * @param follow - Follow flag, true or false
   * @return {[UserFollower]} [Returns UserFollower object]
   */

  public async followCreatorManager(
    creatorId: number,
    userId: number,
    follow: boolean,
  ): Promise<{ success: boolean }> {
    const creator = await this.userRepository.findOne(creatorId);
    if (!creator) {
      throw new NotFoundException('Creator not found');
    }

    if (userId == creatorId) {
      throw new ConflictException('You cannot follow yourself :(');
    }
    const userFollower = await this.userFollowerRepository.find({
      where: {
        userCreatorId: creatorId,
        userFollowerId: userId,
      },
    });
    if (userFollower.length > 0 && follow) {
      throw new ConflictException('You already follow this creator');
    }
    await this.notificationService.followCreatorManagerNotification(
      userId,
      creatorId,
      follow,
    );
    if (follow) {
      await this.userFollowerRepository.save({
        userCreatorId: creatorId,
        userFollowerId: userId,
      });
      return { success: true };
    }
    await this.userFollowerRepository.delete({
      userCreatorId: creatorId,
      userFollowerId: userId,
    });
    return { success: true };
  }
}
