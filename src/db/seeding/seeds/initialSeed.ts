// @/src/db/seeding/seeds/initialSeed.ts
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../../modules/auth/entities/user.entity';
import { getRepository } from 'typeorm';
import { Video } from '../../../modules/video/entities/video.entity';

// ...

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const teacherRole = await getRepository('Roles').save({
      id: 1,
      name: 'Teacher',
    });
    const studentRole = await getRepository('Roles').save({
      name: 'Student',
      id: 2,
    });

    const teacherUsers = await factory(User)()
      .map(async (user) => {
        user.roleId = teacherRole.id;
        return user;
      })
      .createMany(20);

    const studentUsers = await factory(User)()
      .map(async (user) => {
        user.roleId = studentRole.id;
        return user;
      })
      .createMany(20);

    await factory(Video)()
      .map(async (video) => {
        video.userOwnerId =
          teacherUsers[Math.floor(Math.random() * teacherUsers.length)].id;
        return video;
      })
      .createMany(40);

    await factory(Video)()
      .map(async (video) => {
        video.userOwnerId =
          studentUsers[Math.floor(Math.random() * studentUsers.length)].id;
        return video;
      })
      .createMany(40);
  }
}
