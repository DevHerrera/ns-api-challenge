import { IsOptional, IsUrl } from 'class-validator';
export class EditVideoDto {
  @IsOptional()
  @IsUrl({
    message: 'Invalid source url',
  })
  sourceUrl: string;

  @IsOptional()
  title: string;

  @IsOptional()
  description: string;
}
