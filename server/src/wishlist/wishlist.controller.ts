// src/wishlist/wishlist.controller.ts

import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist-dto';

@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async createWishlist(@Body() dto: CreateWishlistDto) {
    return this.wishlistService.createWishlist(dto);
  }

  @Get(':userId')
  async getWishlist(@Param('userId') userId: string) {
    return this.wishlistService.getWishlistByUserId(userId);
  }

  @Patch(':userId')
  async updateWishlist(@Param('userId') userId: string, @Body('items') items: string[]) {
    return this.wishlistService.updateWishlist(userId, items);
  }

  @Delete(':userId')
  async deleteWishlist(@Param('userId') userId: string) {
    return this.wishlistService.deleteWishlist(userId);
  }
}
