import { IsBoolean } from 'class-validator';
export class PublishmentVideoDto {
  @IsBoolean({
    message: 'You must specifify is publish true or false',
  })
  isPublished: boolean;
}
