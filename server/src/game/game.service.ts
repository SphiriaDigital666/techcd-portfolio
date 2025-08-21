// game.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game-dto';
import { GetGameDto } from './dto/get-game-dto';
import { GetPartialGameDto } from './dto/get-partial-game-dto';
import { UpdateGameDto } from './dto/update-game-dto';
import { SearchGameFilterParams } from './dto/search-game-filter-params-dto';
import { StockStatus, System } from '@prisma/client';
import { publish } from 'rxjs';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  /* @IsOptional()
  @IsNumber()
  regularPrice?: number;

  @IsOptional()
  @IsNumber()
  sellingPrice?: number; */

  async create(createGameDto: CreateGameDto) {
    const {
      categoryIds,
      tagIds,
      brandId,
      platformId,
      regularPrice,
      sellingPrice,
      ...gameData
    } = createGameDto;

    if (regularPrice <= 0 || sellingPrice <= 0) {
      throw new Error('Prices must be greater than zero.');
    }
    if (regularPrice < sellingPrice) {
      throw new Error(
        'Regular price must be greater than or equal to the selling price.',
      );
    }

    try {
      return await this.prisma.game.create({
        data: {
          ...gameData,
          regularPrice,
          sellingPrice,
          Brand: { connect: { id: brandId } },
          Platform: { connect: { id: platformId } },
          gameCategories: {
            create: categoryIds.map((categoryId) => ({ categoryId })),
          },
          tags: {
            create: tagIds.map((tagId) => ({ tagId })),
          },
        },
      });
    } catch (error) {
      console.error('Error creating game:', error);
      throw new Error(
        'An error occurred while creating the game. Please try again.',
      );
    }
  }

  async getAllGames(query: SearchGameFilterParams) {
    const {
      id,
      productName,
      rating,
      maxPrice,
      minPrice,
      tags,
      platforms,
      brands,
      systems,
      addToCarousel,
      displayInLatesGames,
      sort,
      page = 1,
      limit = 12,
    } = query;
    const skip = (page - 1) * limit;
    const take = parseInt(limit.toString(), 10);

    const tagArray = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
        ? tags.split(',')
        : [];
    const platformArray = Array.isArray(platforms)
      ? platforms
      : typeof platforms === 'string'
        ? platforms.split(',')
        : [];
    const brandArray = Array.isArray(brands)
      ? brands
      : typeof brands === 'string'
        ? brands.split(',')
        : [];
    const systemArray = Array.isArray(systems)
      ? systems
      : typeof systems === 'string'
        ? systems.split(',')
        : [];

    let orderBy: any = {};

    if (sort === 'latest') {
      orderBy = { releaseDate: 'desc' }; // Assuming createdAt is the timestamp field
    } else if (sort === 'pricel2h') {
      orderBy = { sellingPrice: 'asc' };
    } else if (sort === 'priceh2l') {
      orderBy = { sellingPrice: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { averageRating: 'desc' };
    } else if (sort === 'popularity') {
      orderBy = { totalSales: 'desc' };
    }

    const totalProducts = await this.prisma.game.count({
      where: {
        AND: [
          id ? { id } : {},
          { published: true },
          productName
            ? { productName: { contains: productName, mode: 'insensitive' } }
            : {},
          rating
            ? {
                averageRating: {
                  lte: parseFloat(rating.toString()),
                },
              }
            : {},
          maxPrice || minPrice
            ? {
                sellingPrice: {
                  gte: minPrice ? parseFloat(minPrice.toString()) : undefined,
                  lte: maxPrice ? parseFloat(maxPrice.toString()) : undefined,
                },
              }
            : {},
          tagArray.length > 0
            ? {
                tags: {
                  some: {
                    tagId: { in: tagArray },
                  },
                },
              }
            : {},
          platformArray.length > 0
            ? {
                platformId: { in: platformArray },
              }
            : {},
          brandArray.length > 0
            ? {
                brandId: { in: brandArray },
              }
            : {},
          systemArray.length > 0
            ? {
                system: { in: systemArray as System[] },
              }
            : {},
          addToCarousel ? { addToCarousel: addToCarousel } : {},
          displayInLatesGames
            ? { displayInLatesGames: displayInLatesGames }
            : {},
        ],
      },
    });

    const totalPages = Math.ceil(totalProducts / limit);

    const products = await this.prisma.game.findMany({
      where: {
        AND: [
          id ? { id } : {},
          { published: true },
          productName
            ? { productName: { contains: productName, mode: 'insensitive' } }
            : {},
          rating
            ? {
                averageRating: {
                  lte: parseFloat(rating.toString()),
                },
              }
            : {},
          maxPrice || minPrice
            ? {
                sellingPrice: {
                  gte: minPrice ? parseFloat(minPrice.toString()) : undefined,
                  lte: maxPrice ? parseFloat(maxPrice.toString()) : undefined,
                },
              }
            : {},
          tagArray.length > 0
            ? {
                tags: {
                  some: {
                    tagId: { in: tagArray },
                  },
                },
              }
            : {},
          platformArray.length > 0
            ? {
                platformId: { in: platformArray },
              }
            : {},
          brandArray.length > 0
            ? {
                brandId: { in: brandArray },
              }
            : {},
          systemArray.length > 0
            ? {
                system: { in: systemArray as System[] },
              }
            : {},
          addToCarousel != undefined ? { addToCarousel: addToCarousel } : {},
          displayInLatesGames != undefined
            ? { displayInLatesGames: displayInLatesGames }
            : {},
        ],
      },
      skip,
      take,
      orderBy,
      include: {
        gameCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        Platform: {
          select: {
            id: true,
            name: true,
          },
        },
        Brand: {
          select: {
            id: true,
            name: true,
          },
        },
        reviews: true,
      },
    });

    return {
      data: products,
      meta: {
        totalProducts,
        productsPerPage: take,
        currentPage: page,
        totalPages,
      },
    };
  }

  async getAllGames1(query: SearchGameFilterParams) {
    const {
      id,
      productName,
      rating,
      maxPrice,
      minPrice,
      tags,
      platforms,
      brands,
      systems,
      addToCarousel,
      displayInLatesGames,
      sort,
      page = 1,
      limit = 1000,
      published,
      stockStatus,
    } = query;
    const skip = (page - 1) * limit;
    const take = parseInt(limit.toString(), 10);

    const tagArray = Array.isArray(tags)
      ? tags
      : typeof tags === 'string'
        ? tags.split(',')
        : [];
    const platformArray = Array.isArray(platforms)
      ? platforms
      : typeof platforms === 'string'
        ? platforms.split(',')
        : [];
    const brandArray = Array.isArray(brands)
      ? brands
      : typeof brands === 'string'
        ? brands.split(',')
        : [];
    const systemArray = Array.isArray(systems)
      ? systems
      : typeof systems === 'string'
        ? systems.split(',')
        : [];

    let orderBy: any = {};

    if (sort === 'latest') {
      orderBy = { releaseDate: 'desc' }; // Assuming createdAt is the timestamp field
    } else if (sort === 'pricel2h') {
      orderBy = { sellingPrice: 'asc' };
    } else if (sort === 'priceh2l') {
      orderBy = { sellingPrice: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { averageRating: 'desc' };
    } else if (sort === 'popularity') {
      orderBy = { totalSales: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { averageRating: 'desc' };
    }

    const totalProducts = await this.prisma.game.count({
      where: {
        AND: [
          id ? { id } : {},
          published == true
            ? { published: true }
            : published == false
              ? { published: false }
              : {},
          stockStatus ? { stockStatus: stockStatus as StockStatus } : {},
          productName
            ? { productName: { contains: productName, mode: 'insensitive' } }
            : {},
          rating
            ? {
                averageRating: {
                  lte: parseFloat(rating.toString()),
                },
              }
            : {},
          maxPrice || minPrice
            ? {
                sellingPrice: {
                  gte: minPrice ? parseFloat(minPrice.toString()) : undefined,
                  lte: maxPrice ? parseFloat(maxPrice.toString()) : undefined,
                },
              }
            : {},
          tagArray.length > 0
            ? {
                tags: {
                  some: {
                    tagId: { in: tagArray },
                  },
                },
              }
            : {},
          platformArray.length > 0
            ? {
                platformId: { in: platformArray },
              }
            : {},
          brandArray.length > 0
            ? {
                brandId: { in: brandArray },
              }
            : {},
          systemArray.length > 0
            ? {
                system: { in: systemArray as System[] },
              }
            : {},
          addToCarousel ? { addToCarousel: addToCarousel } : {},
          displayInLatesGames
            ? { displayInLatesGames: displayInLatesGames }
            : {},
        ],
      },
    });

    const totalPages = Math.ceil(totalProducts / limit);

    const products = await this.prisma.game.findMany({
      where: {
        AND: [
          id ? { id } : {},
          published == true
            ? { published: true }
            : published == false
              ? { published: false }
              : {},
          stockStatus ? { stockStatus: stockStatus as StockStatus } : {},
          productName
            ? { productName: { contains: productName, mode: 'insensitive' } }
            : {},
          rating
            ? {
                averageRating: {
                  lte: parseFloat(rating.toString()),
                },
              }
            : {},
          maxPrice || minPrice
            ? {
                sellingPrice: {
                  gte: minPrice ? parseFloat(minPrice.toString()) : undefined,
                  lte: maxPrice ? parseFloat(maxPrice.toString()) : undefined,
                },
              }
            : {},
          tagArray.length > 0
            ? {
                tags: {
                  some: {
                    tagId: { in: tagArray },
                  },
                },
              }
            : {},
          platformArray.length > 0
            ? {
                platformId: { in: platformArray },
              }
            : {},
          brandArray.length > 0
            ? {
                brandId: { in: brandArray },
              }
            : {},
          systemArray.length > 0
            ? {
                system: { in: systemArray as System[] },
              }
            : {},
          addToCarousel != undefined ? { addToCarousel: addToCarousel } : {},
          displayInLatesGames != undefined
            ? { displayInLatesGames: displayInLatesGames }
            : {},
        ],
      },
      skip,
      take,
      orderBy: {
        averageRating: 'desc',
      },
      include: {
        gameCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        Platform: {
          select: {
            id: true,
            name: true,
          },
        },
        Brand: {
          select: {
            id: true,
            name: true,
          },
        },
        reviews: true,
      },
    });

    return {
      data: products,
      meta: {
        totalProducts,
        productsPerPage: take,
        currentPage: page,
        totalPages,
      },
    };
  }

  getBulkGames(ids: string[]) {
    return this.prisma.game.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        productName: true,
        sellingPrice: true,
        regularPrice: true,
        cardDescription: true,
        stock: true,
        stockStatus: true,
        cardImage: true,
        averageRating: true,
      },
    });
  }

  async getPartialGamesList(query: any): Promise<GetPartialGameDto[]> {
    const {
      page = 1,
      limit = 10,
      productName,
      system,
      stockStatus,
      minPrice,
      maxPrice,
    } = query;

    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    // Fetch the games from the database with pagination and filtering
    const games = await this.prisma.game.findMany({
      where: {
        AND: [
          productName
            ? { productName: { contains: productName, mode: 'insensitive' } }
            : {},
          system ? { system } : {},
          stockStatus ? { stockStatus } : {},
          minPrice || maxPrice
            ? {
                sellingPrice: {
                  gte: minPrice ? parseFloat(minPrice) : undefined,
                  lte: maxPrice ? parseFloat(maxPrice) : undefined,
                },
              }
            : {},
        ],
      },
      select: {
        id: true,
        productName: true,
        displayName: true,
        system: true,
        SKU: true,
        sellingPrice: true,
        regularPrice: true,
        stock: true,
        stockStatus: true,
        coverImage: true,
        cardImage: true,
        published: true,
      },
      skip,
      take,
    });

    // Map the Prisma result to the GetPartialGameDto
    return games.map((game) => ({
      id: game.id,
      productName: game.productName,
      displayName: game.displayName,
      system: game.system,
      SKU: game.SKU,
      sellingPrice: game.sellingPrice,
      regularPrice: game.regularPrice,
      stock: game.stock,
      stockStatus: game.stockStatus,
      coverImage: game.coverImage,
      cardimage: game.cardImage,
      published: game.published,
    }));
  }

  async getGameById(id: string) {
    return await this.prisma.game.findUnique({
      where: { id },
      include: {
        gameCategories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            }, // Include the related categories
          },
        },
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            }, // Include the related tags
          },
        },
        Platform: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        reviews: true, // Include reviews
      },
    });
  }

  async update(id: string, updateGameDto: UpdateGameDto) {
    const game = await this.prisma.game.findUnique({
      where: { id },
    });
  
    if (!game) {
      throw new NotFoundException('Game not found');
    }
  
    const { categoryIds, tagIds, regularPrice, sellingPrice, ...updateData } =
      updateGameDto;
  
    // Validate prices
    if (regularPrice != null && sellingPrice != null) {
      if (regularPrice <= 0 || sellingPrice <= 0) {
        throw new BadRequestException('Prices must be greater than zero.');
      }
      if (regularPrice < sellingPrice) {
        throw new BadRequestException(
          'Regular price must be greater than or equal to the selling price.',
        );
      }
    }
  
    // Prepare category updates
    const categoryUpdateData = categoryIds
      ? {
          gameCategories: {
            deleteMany: {}, // Remove all existing category relations
            create: categoryIds.map((categoryId) => ({
              category: { connect: { id: categoryId } },
            })),
          },
        }
      : {};
  
    // Prepare tag updates
    const tagUpdateData = tagIds
      ? {
          tags: {
            deleteMany: {}, // Remove all existing tag relations
            create: tagIds.map((tagId) => ({
              tag: { connect: { id: tagId } },
            })),
          },
        }
      : {};
  
    // Execute the update with transaction
    try {
      return await this.prisma.$transaction(async (prisma) => {
        return prisma.game.update({
          where: { id },
          data: {
            regularPrice,
            sellingPrice,
            ...updateData,
            ...categoryUpdateData, // Include category relationship updates
            ...tagUpdateData, // Include tag relationship updates
          },
        });
      });
    } catch (error) {
      throw new BadRequestException(
        `Failed to update the game: ${error.message || 'Unknown error'}`,
      );
    }
  }
  

  async getMaxOverallGamePrice(): Promise<number> {
    const result = await this.prisma.game.aggregate({
      _max: {
        regularPrice: true,
        sellingPrice: true,
      },
    });

    // Calculate the maximum of the two prices
    return Math.max(
      result._max.regularPrice || 0,
      result._max.sellingPrice || 0,
    );
  }

  async getGameCountBySystem(): Promise<{ [key in System]: number }> {
    // Initialize counts for each system to zero
    const systemCounts: { [key in System]: number } = {
      WINDOWS: 0,
      PLAYSTATION: 0,
      XBOX: 0,
    };

    // Fetch actual counts grouped by system
    const result = await this.prisma.game.groupBy({
      by: ['system'],
      _count: {
        system: true,
      },
    });

    // Update the initialized counts with the actual data
    result.forEach((item) => {
      systemCounts[item.system] = item._count.system;
    });

    return systemCounts;
  }

  // Method to get the top 4 games by review rating
  /*  async getTopGamesByReviewRating(limit: number = 4) {
    return this.prisma.game.findMany({
      orderBy: {
        averageRating: 'desc',
      },
      take: limit,
      include: {
        reviews: true,
      },
    });
  } */
  async getTopGamesByReviewRating() {
    const products = await this.prisma.game.findMany({
      orderBy: {
        averageRating: 'desc',
      },
      take: 4,
      include: {
        reviews: true,
      },
    });

    return {
      products,
    };
  }
}
