import { Role } from '../../../modules/auth/entities/role.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(Role, (faker: typeof Faker) => {
  const role = new Role();
  const name = faker.name.firstName();
  const email = faker.internet.email(name);
  const photoUrl = faker.internet.avatar();
  const password =
    '$argon2i$v=19$m=4096,t=3,p=1$3eOW5FHV6KnRcoe9cO7dbw$TQBqjUAEFpf9LM00MofySqdEPI5pYcywNpJ5XnXDgUE';

  return role;
});
