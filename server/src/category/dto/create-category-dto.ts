import { IsString, IsOptional, IsInt, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  level: number; // 1 = Parent, 2 = Subcategory, 3 = Super Subcategory

  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsMongoId()
  parentId?: string;
}
