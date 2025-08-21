// src/wishlist/dto/get-wishlist-dto.ts

import { WishlistItem } from '@prisma/client';

export class GetWishlistDto {
  userId: string;
  items: WishlistItem[];
}
