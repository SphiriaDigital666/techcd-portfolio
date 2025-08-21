import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review-dto';
import { UpdateReviewDto } from './dto/update-review-dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get('reviewByFlat')
  async getReviews(
    @Query('gameId') gameId?: string,
    @Query('userId') userId?: string,
  ) {
    return this.reviewService.getReviews(gameId, userId);
  }

  @Get()
  async getAllReviews(
    @Query('gameId') gameId?: string,
    @Query('userId') userId?: string,
    @Query('page') page: string = '1', // Default page to '1'
    @Query('limit') limit: string = '10', // Default limit to '3'
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1; // Convert to number, default to 1 if NaN
    const limitNumber = parseInt(limit, 10) || 10; // Convert to number, default to 3 if NaN

    return this.reviewService.getAllReviews(
      gameId,
      userId,
      pageNumber,
      limitNumber,
      search,
    );
  }

  @Get(':id')
  async getReviewById(@Param('id') id: string) {
    return this.reviewService.getReviewById(id);
  }

  @Patch(':id')
  async updateReview(
    @Param('id') reviewId: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.updateReview(reviewId, updateReviewDto);
  }

  @Delete(':id')
  async deleteReview(@Param('id') reviewId: string) {
    return this.reviewService.deleteReview(reviewId);
  }

  @Patch(':id/publish')
  async updatePublishStatus(
    @Param('id') reviewId: string,
    @Body('publish') publish: boolean,
  ) {
    return this.reviewService.updatePublishStatus(reviewId, publish);
  }
}
