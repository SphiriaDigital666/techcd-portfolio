// src/wishlist/dto/create-wishlist-dto.ts

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWishlistDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString({ each: true })
  items: string[]; // array of game IDs
}
