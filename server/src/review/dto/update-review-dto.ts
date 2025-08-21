// src/review/dto/update-review-dto.ts
import { IsNotEmpty, IsOptional, IsInt, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsInt()
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
