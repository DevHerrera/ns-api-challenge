import { Repository, EntityRepository } from 'typeorm';
import { User } from 'src/models/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}
