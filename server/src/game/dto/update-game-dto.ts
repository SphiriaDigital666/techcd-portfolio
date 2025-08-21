import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create-game-dto';
import { IsMongoId, IsArray, IsOptional } from 'class-validator';

export class UpdateGameDto extends PartialType(CreateGameDto) {
  // @IsMongoId()
  // id: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  categoryIds?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  tagIds?: string[];
}