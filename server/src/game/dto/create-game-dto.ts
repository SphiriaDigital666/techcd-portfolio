// create-game.dto.ts
import { IsString, IsBoolean, IsDate, IsEnum, IsArray, IsOptional, IsNumber, IsMongoId } from 'class-validator';
import { System, StockStatus } from '@prisma/client';

export class CreateGameDto {
  @IsString()
  productName: string;

  @IsString()
  displayName: string;

  @IsOptional()
  @IsString()
  aboutThisGame?: string;

  @IsOptional()
  @IsString()
  cardDescription?: string;

  @IsEnum(System)
  system: System;

  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @IsOptional()
  @IsDate()
  releaseDate?: Date;

  @IsOptional()
  @IsNumber()
  regularPrice?: number;

  @IsOptional()
  @IsNumber()
  sellingPrice?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsString()
  SKU?: string;

  @IsEnum(StockStatus)
  stockStatus: StockStatus;

  @IsOptional()
  @IsString()
  minimumOS?: string;

  @IsOptional()
  @IsString()
  minimumCPU?: string;

  @IsOptional()
  @IsString()
  minimumRAM?: string;

  @IsOptional()
  @IsString()
  minimumGPU?: string;

  @IsOptional()
  @IsString()
  minimumStorage?: string;

  @IsOptional()
  @IsString()
  recommendedOS?: string;

  @IsOptional()
  @IsString()
  recommendedCPU?: string;

  @IsOptional()
  @IsString()
  recommendedRAM?: string;

  @IsOptional()
  @IsString()
  recommendedGPU?: string;

  @IsOptional()
  @IsString()
  recommendedStorage?: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  screenshots?: string[];

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsString()
  cardImage?: string;

  @IsOptional()
  @IsString()
  latestImage?: string;

  @IsOptional()
  @IsBoolean()
  addToLatestGames?: boolean;

  @IsOptional()
  @IsBoolean()
  addToCarousel?: boolean;

  @IsOptional()
  @IsBoolean()
  displayInLatesGames?: boolean;

  @IsBoolean()
  published: boolean;

  @IsArray()
  @IsMongoId({ each: true })
  categoryIds: string[];

  @IsArray()
  @IsMongoId({ each: true })
  tagIds: string[];

  @IsMongoId()
  brandId: string;

  @IsMongoId()
  platformId: string;
}