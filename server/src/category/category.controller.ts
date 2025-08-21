import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category-dto';
import { CategoryService } from './category.service';
import { GetCategoryDto } from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category-dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('nested')
  async getNestedCategories() {
    return this.categoryService.getAllCategoriesSorted();
  }
  @Get('object')
  async getNestedCategoriesByObject() {
    return this.categoryService.getNestedCategoriesByObject();
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllCategories(@Query() query: GetCategoryDto) {
    return this.categoryService.getCategories(query);
  }

  @Get(':id')
  async getCategory(@Param('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }
}
