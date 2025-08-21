import { IsOptional, IsString, IsInt, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetCategoryDto {
  @IsOptional()
  @IsMongoId()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  level?: number;

  @IsOptional()
  @IsString()
  image?: string

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsMongoId()
  parentId?: string;
}
