import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Invalid URL format for image' })
  image?: string;
}
