import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/modules/auth/repositories/users.repository';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
  ) {}
  public async followCreatorManagerNotification(
    followerUserId: number,
    creatorUserId: number,
    follow: boolean,
  ) {
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
