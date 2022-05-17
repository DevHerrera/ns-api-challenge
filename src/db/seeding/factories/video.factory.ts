import { Video } from '../../../modules/video/entities/video.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(Video, (faker: typeof Faker) => {
  const video = new Video();
  const title = faker.name.title();
  const description = faker.lorem.paragraph();
  const sourceUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const isPublished = faker.random.boolean();

  video.title = title;
  video.description = description;
  video.sourceUrl = sourceUrl;
  video.isPublished = isPublished;
  return video;
});
