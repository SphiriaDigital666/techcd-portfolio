// src/wishlist/wishlist.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWishlistDto } from './dto/create-wishlist-dto';
import { GetWishlistDto } from './dto/get-wishlist-dto';

@Injectable()
export class WishlistService {
  constructor(private readonly prisma: PrismaService) {}

  // Create Wishlist
  async createWishlist(dto: CreateWishlistDto): Promise<GetWishlistDto> {
    const wishlist = await this.prisma.wishlist.create({
      data: {
        userId: dto.userId,
        items: {
          create: dto.items.map((gameId) => ({
            gameId,
          })),
        },
      },
      include: { items: true },
    });

    return {
      userId: wishlist.userId,
      items: wishlist.items,
    };
  }

  // Get Wishlist by userId
//   async getWishlistByUserId(userId: string): Promise<GetWishlistDto> {
//     const wishlist = await this.prisma.wishlist.findUnique({
//       where: { userId },
//       include: { items: true
//        },
//     });

//     if (!wishlist) {
//       throw new NotFoundException(`Wishlist for user ID ${userId} not found.`);
//     }

//     return {
//       userId: wishlist.userId,
//       items: wishlist.items,
//     };
//   }

// src/wishlist/wishlist.service.ts

async getWishlistByUserId(userId: string): Promise<GetWishlistDto> {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
      include: { 
        items: {
          include: {
            game: {
              select: { 
                id: true, 
                productName: true,
                sellingPrice: true,
                regularPrice: true,
                averageRating: true,
                stockStatus: true,
                cardDescription: true,
                cardImage: true,
                releaseDate: true,
              },
            },
          },
        },
      },
    });
  
    if (!wishlist) {
      throw new NotFoundException(`Wishlist for user ID ${userId} not found.`);
    }
  
    return {
      userId: wishlist.userId,
      items: wishlist.items.map(item => ({
        ...item,
        game: item.game ? { 
          id: item.game.id, 
          name: item.game.productName, 
          sellingPrice: item.game.sellingPrice, 
          regularPrice: item.game.regularPrice, 
          rating: item.game.averageRating, 
          stockStatus: item.game.stockStatus,
          cardDescription: item.game.cardDescription,
          cardImage: item.game.cardImage,
          releaseDate: item.game.releaseDate,
        } : null,
      })),
    };
  }
  

  // Update Wishlist items
  async updateWishlist(userId: string, gameIds: string[]): Promise<GetWishlistDto> {
    // Delete existing items in the wishlist
    await this.prisma.wishlistItem.deleteMany({
      where: { wishlist: { userId } },
    });
  
    // Create new items for the wishlist
    const wishlist = await this.prisma.wishlist.update({
      where: { userId },
      data: {
        items: {
          create: gameIds.map((gameId) => ({ gameId })),
        },
      },
      include: { items: true },
    });
  
    return {
      userId: wishlist.userId,
      items: wishlist.items,
    };
  }

  // Delete Wishlist
  async deleteWishlist(userId: string): Promise<void> {
    await this.prisma.wishlist.delete({
      where: { userId },
    });
  }
}
