import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty({
    message: 'Video source URL cannot be empty',
  })
  @IsUrl({
    message: 'Invalid source url',
  })
  sourceUrl: string;

  @IsNotEmpty({ message: 'Video title cannot be empty' })
  title: string;

  @IsNotEmpty({ message: 'Video description cannot be empty' })
  description: string;
}
