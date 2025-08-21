import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review-dto';
import { GetReviewDto } from './dto/get-review-dto';
import { UpdateReviewDto } from './dto/update-review-dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  // Create a new review
  async createReview(createReviewDto: CreateReviewDto) {
    const { rating, comment, userId, gameId, title } = createReviewDto;

    // Check if the user has already reviewed this game
    const existingReview = await this.prisma.review.findFirst({
      where: { userId, gameId },
    });
    if (existingReview) {
      throw new HttpException(
        `You already reviewed the game with ID ${gameId}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Create review with publish status set to 'unPublish' by default
    const newReview = await this.prisma.review.create({
      data: {
        rating,
        comment,
        title,
        publish: 'Rejected', // Set the initial publish status to 'Rejected'
        user: { connect: { id: userId } },
        game: { connect: { id: gameId } },
      },
    });

    return {
      message: 'Review created successfully',
      review: newReview, // Optionally return the created review
    };
  }

  // async createReview(createReviewDto: CreateReviewDto) {
  //   const { rating, comment, userId, gameId } = createReviewDto;

  //   return await this.prisma.$transaction(async (prisma) => {
  //     // Check if the user has already reviewed this game
  //     const existingReview = await prisma.review.findFirst({
  //       where: { userId, gameId },
  //     });
  //     if (existingReview) {
  //       throw new HttpException(
  //         `You already reviewed the game with ID ${gameId}`,
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }

  //     // Create a new review
  //     const review = await prisma.review.create({
  //       data: {
  //         rating,
  //         comment,
  //         publish: 'unPublish', // Default publish status
  //         user: { connect: { id: userId } },
  //         game: { connect: { id: gameId } },
  //       },
  //     });

  //     // Update the game's average rating
  //     await this.updateGameAverageRating(prisma, gameId);

  //     return review;
  //   });
  // }

  async nearestLargestInteger(num: number): Promise<number> {
    return Math.ceil(num);
  }

  async getAllReviews(
    gameId: string,
    userId: string,
    page: number,
    limit: number,
    search?: string,
  ): Promise<{ reviews: any; totalReviews: number; totalPages: number }> {
    // Define the filter object with optional parameters
    const filter: Prisma.ReviewWhereInput = {
      ...(gameId && { gameId }),
      ...(userId && { userId }),
      ...(search && {
        OR: [
          { user: { email: { contains: search, mode: 'insensitive' } } },
          { user: { username: { contains: search, mode: 'insensitive' } } },
        ],
      }),
    };

    // Fetch the total number of matching reviews
    const totalReviews = await this.prisma.review.count({ where: filter });

    // Fetch the reviews with pagination and sorting
    const reviews = await this.prisma.review.findMany({
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { rating: 'desc' },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        publish: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            firstName: true,
            profile_image: true,
          },
        },
        game: {
          select: {
            id: true,
            productName: true,
          },
        },
      },
    });

    // Calculate total pages
    const totalPages = Math.ceil(totalReviews / limit);

    return { reviews, totalReviews, totalPages };
  }

  // Get all reviews with pagination
  /* async getAllReviews(
    gameId: string,
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ reviews: GetReviewDto[]; totalReviews: number }> {
    const skip = (page - 1) * limit;

    // Fetch reviews based on gameId, userId, and pagination
    const reviews = await this.prisma.review.findMany({
      where: {
        ...(gameId && { gameId }),
        ...(userId && { userId }),
      },
      skip,
      take: limit,
      orderBy: {
        rating: 'desc',
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        publish: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            firstName: true,
            profile_image: true,
          },
        },
        game: {
          select: {
            id: true,
            productName: true,
          },
        },
      },
    });

    // Fetch total count of reviews for the given query
    const totalReviews = await this.prisma.review.count({
      where: {
        ...(gameId && { gameId }),
        ...(userId && { userId }),
      },
    });

    return {
      reviews,
      totalReviews,
    };
  } */

  // Get review by ID
  async getReviewById(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      select: {
        id: true,
        rating: true,
        comment: true,
        createdAt: true,
        publish: true, // Include the publish status
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        game: {
          select: {
            id: true,
            productName: true,
          },
        },
      },
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async getReviews(gameId?: string, userId?: string): Promise<any[]> {
    // Ensure at least one parameter is provided
    if (!gameId && !userId) {
      throw new HttpException(
        'Either gameId or userId must be provided.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Fetch reviews based on provided gameId or userId
    const reviews = await this.prisma.review.findMany({
      where: {
        ...(gameId && { gameId }), // Add conditionally if gameId is provided
        ...(userId && { userId }), // Add conditionally if userId is provided
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        title: true,
        createdAt: true,
        publish: true,
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            profile_image: true,
            firstName: true,
          },
        },
        game: {
          select: {
            id: true,
            productName: true,
          },
        },
      },
    });

    // Throw error if no reviews are found
    if (!reviews.length) {
      throw new NotFoundException(
        `No reviews found for the provided ${gameId ? `gameId: ${gameId}` : `userId: ${userId}`}`,
      );
    }

    // Flatten the reviews data
    const flattenedReviews = reviews.map((review) => ({
      rating: review.rating,
      avatar: review.user.profile_image,
      username: review.user.username,
      fullname: review.user.firstName,
      title: review.title,
      content: review.comment,
      date: Date.now(),
    }));

    return flattenedReviews;
  }

  async updateReview(reviewId: string, updateReviewDto: UpdateReviewDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const existingReview = await prisma.review.findUnique({
        where: { id: reviewId },
      });

      if (!existingReview) {
        throw new NotFoundException(`Review with ID ${reviewId} not found`);
      }

      // Update the review
      const updatedReview = await prisma.review.update({
        where: { id: reviewId },
        data: updateReviewDto,
      });

      // Update the game's average rating
      await this.updateGameAverageRating(prisma, updatedReview.gameId);

      return updatedReview;
    });
  }

  // Delete review
  async deleteReview(reviewId: string) {
    return await this.prisma.$transaction(async (prisma) => {
      const review = await prisma.review.findUnique({
        where: { id: reviewId },
      });

      if (!review) {
        throw new NotFoundException(`Review with ID ${reviewId} not found`);
      }

      // Delete the review
      await prisma.review.delete({
        where: { id: reviewId },
      });

      // Update the game's average rating only if the deleted review was published
      if (review.publish === 'Approved') {
        await this.updateGameAverageRating(prisma, review.gameId);
      }

      return { message: 'Review deleted successfully' };
    });
  }

  // Update publish status
  async updatePublishStatus(reviewId: string, publishStatus: any) {
    return await this.prisma.$transaction(async (prisma) => {
      // Find the existing review
      const review = await prisma.review.findUnique({
        where: { id: reviewId },
      });

      if (!review) {
        throw new NotFoundException(`Review with ID ${reviewId} not found`);
      }

      // Validate the new publish status
      if (!['Rejected', 'Approved'].includes(publishStatus)) {
        throw new HttpException(
          `Invalid publish status: ${publishStatus}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      // Update the review's publish status
      const updatedReview = await prisma.review.update({
        where: { id: reviewId },
        data: { publish: publishStatus },
      });

      // Update the average rating for the game based on the updated publish status
      await this.updateGameAverageRating(prisma, updatedReview.gameId);
      return updatedReview;
    });
  }

  async updateGameAverageRating(prisma: any, gameId: string) {
    // Get only published reviews for the game
    const publishedReviews = await prisma.review.findMany({
      where: { gameId, publish: 'Approved' },
      select: { rating: true },
    });

    // Calculate the average rating
    const averageRating =
      publishedReviews.reduce((sum, review) => sum + review.rating, 0) /
      (publishedReviews.length || 1); // Avoid division by 0

    // Update the game's average rating
    await prisma.game.update({
      where: { id: gameId },
      data: { averageRating },
    });
  }
}
