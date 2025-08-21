import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { GetCategoryDto } from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category-dto';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { name, level, parentId, image, description } = createCategoryDto;

    try {
      const data: Prisma.CategoryCreateInput = {
        name,
        level,
        image,
        description,
        parent: parentId ? { connect: { id: parentId } } : undefined,
      };

      const category = await this.prisma.category.findUnique({
        where: { name },
      });

      if (category) {
        throw new ConflictException('Category name must be unique');
      }

      return await this.prisma.category.create({
        data,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Category name must be unique');
      }
      throw error;
    }
  }

  async getCategories(query: GetCategoryDto) {
    const { id, name, level, parentId } = query;

    const levelInt = level ? parseInt(level as any, 10) : undefined;

    const where: Prisma.CategoryWhereInput = {
      ...(id && { id }),
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
      ...(levelInt && { level: levelInt }),
      ...(parentId && { parentId }),
    };

    return this.prisma.category.findMany({ where });
  }

  async getAllCategoriesSorted(): Promise<any[]> {
    // Step 1: Get all categories
    const categories = await this.prisma.category.findMany();

    // Step 2: Build a map to easily look up categories by parentId
    const categoryMap: { [key: string]: any[] } = {};

    categories.forEach((category) => {
      const parentId = category.parentId || 'null'; // Treat `null` parentId as 'null' string for key
      if (!categoryMap[parentId]) {
        categoryMap[parentId] = [];
      }
      categoryMap[parentId].push(category);
    });

    // Step 3: Recursive function to build hierarchical structure
    const buildCategoryTree = (parentId = 'null', level = 1) => {
      const parentCategories = categoryMap[parentId] || [];
      return parentCategories.map((parent) => {
        return {
          ...parent,
          level, // Add the level information here
          children: buildCategoryTree(parent.id, level + 1), // Recursively fetch child categories
        };
      });
    };

    // Step 4: Build and return the flattened tree grouped by levels
    const flattenedCategories: any[] = [];

    const flattenTree = (categories: any[], currentLevel: number) => {
      categories.forEach((category) => {
        flattenedCategories.push({
          id: category.id,
          name: category.name,
          level: currentLevel,
          parentId: category.parentId,
          description: category.description,
          imageUrl: category.image,
        });

        if (category.children && category.children.length > 0) {
          flattenTree(category.children, currentLevel + 1); // Recursively handle children
        }
      });
    };

    // Start with top-level categories (parentId = null)
    const categoryTree = buildCategoryTree();
    flattenTree(categoryTree, 1); // Flatten the tree starting from level 1

    return flattenedCategories;
  }

  async getNestedCategoriesByObject(): Promise<any[]> {
    // Step 1: Get all categories
    const categories = await this.prisma.category.findMany();

    // Step 2: Build a map to easily look up categories by parentId
    const categoryMap: { [key: string]: any[] } = {};

    categories.forEach((category) => {
      const parentId = category.parentId || 'null'; // Treat `null` parentId as 'null' string for key
      if (!categoryMap[parentId]) {
        categoryMap[parentId] = [];
      }
      categoryMap[parentId].push(category);
    });

    // Step 3: Recursive function to build hierarchical structure
    const buildCategoryTree = (parentId = 'null') => {
      const parentCategories = categoryMap[parentId] || [];

      return parentCategories.map((parent) => {
        return {
          ...parent,
          children: buildCategoryTree(parent.id), // Recursively fetch child categories
        };
      });
    };

    // Step 4: Build and return the category tree starting from level 1 categories (parentId = null)
    return buildCategoryTree();
  }

  async getCategoryById(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.prisma.category.findUnique({ where: { id } });
  }

  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const allCategoryIds = [
      categoryId,
      ...(await this.getAllDescendantCategoryIds(categoryId)),
    ];

    const hasGames = await this.hasAssociatedGames(allCategoryIds);
    if (hasGames) {
      // throw new Error('Cannot delete category: games are associated with this category or its descendants');
      throw new BadRequestException(
        'Cannot delete category: games are associated with this category or its descendants',
      );
    }

    await this.prisma.$transaction(async (prisma) => {
      if (allCategoryIds.length > 1) {
        await prisma.category.deleteMany({
          where: { id: { in: allCategoryIds } },
        });
      } else {
        await prisma.category.delete({
          where: { id: categoryId },
        });
      }
    });
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Category name must be unique');
      }
      throw error;
    }
  }

  async getAllDescendantCategoryIds(categoryId: string): Promise<string[]> {
    const children = await this.prisma.category.findMany({
      where: { parentId: categoryId },
      select: { id: true },
    });

    const childIds = children.map((child) => child.id);
    const descendantIds = [...childIds];

    for (const childId of childIds) {
      const grandchildrenIds = await this.getAllDescendantCategoryIds(childId);
      descendantIds.push(...grandchildrenIds);
    }

    return descendantIds;
  }

  async hasAssociatedGames(categoryIds: string[]): Promise<boolean> {
    const gameCount = await this.prisma.gameCategory.count({
      where: {
        categoryId: { in: categoryIds },
      },
    });
    return gameCount > 0;
  }
}
