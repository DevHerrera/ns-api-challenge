import { Repository, EntityRepository } from 'typeorm';
import { UserFollower } from '../entities/userFollower.entity';
@EntityRepository(UserFollower)
export class UserFollowerRepository extends Repository<UserFollower> {}
