import { User } from '../../../modules/auth/entities/user.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(User, (faker: typeof Faker) => {
  const user = new User();
  const name = faker.name.firstName();
  const email = faker.internet.email(name);
  const photoUrl = faker.internet.avatar();
  const password =
    '$argon2i$v=19$m=4096,t=3,p=1$3eOW5FHV6KnRcoe9cO7dbw$TQBqjUAEFpf9LM00MofySqdEPI5pYcywNpJ5XnXDgUE';

  user.name = name;
  user.email = email;
  user.photoUrl = photoUrl;
  user.password = password;
  return user;
});
