import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/modules/auth/repositories/users.repository';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
  ) {}

  /**
   * Notification to be dispatch after a user follows or unfollows
   * a user creator
   * @param followerUserId - Follower user id (current user)
   * @param creatorUserId - Creator follower id
   * @param follow - Follow flag, true or false
   * @return {[void]} []
   */

  public async followCreatorManagerNotification(
    followerUserId: number,
    creatorUserId: number,
    follow: boolean,
  ): Promise<void> {
    const followerUser = await this.userRepository.findOne(followerUserId, {
      select: ['name'],
      loadEagerRelations: false,
    });
    const createrUser = await this.userRepository.findOne(creatorUserId, {
      select: ['name'],
      loadEagerRelations: false,
    });
    let message: string;
    if (follow) {
      message = `Notification: The user ${followerUser.name} started following the creator ${createrUser.name}`;
    } else {
      message = `Notification: The user ${followerUser.name} stopped following the creator ${createrUser.name}`;
    }
    console.log(message);
  }
}
