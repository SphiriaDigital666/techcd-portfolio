import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCouponDto } from './dto/create-coupon-dto';
import { UpdateCouponDto } from './dto/update-coupon-dto';
import { isValidObjectId } from 'mongoose';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CouponService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCouponDto: CreateCouponDto) {
    try {
      const coupon = await this.prisma.coupon.create({
        data: createCouponDto,
      });
      return coupon;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (
          error.code === 'P2002' &&
          error.meta?.target === 'Coupon_code_key'
        ) {
          // Unique constraint violation on the 'code' field
          throw new ConflictException(
            'A coupon with this code already exists.',
          );
        }
      }
      console.error('Error creating coupon:', error);
      throw new InternalServerErrorException('Failed to create coupon.');
    }
  }

  /* async getAllOrders(page: number, limit: number, search?: string) {
    let whereCondition: any = {};
    
    if (search) {
      whereCondition.OR = [];
  
      if (isValidObjectId(search)) {
        whereCondition.OR.push({
          id: {
            contains: search,
            mode: 'insensitive',
          },
        });
      }
      whereCondition.OR.push({
        email: {
          contains: search,
          mode: 'insensitive',
        },
      });
    }
    const [orders, totalOrders] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where: whereCondition,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          products: {
            include: {
              game: true,
            },
          },
          appliedCoupons: true,
          user: true,
        },
      }),
      this.prisma.order.count({ where: whereCondition }),
    ]);
  
    const totalPages = Math.ceil(totalOrders / limit);
    return { orders, totalOrders, totalPages };
  } */

  async getAllCoupons(page: number, limit: number, search?: string) {
    let whereCondition: any = {};

    if (search) {
      whereCondition.OR = [];

      // Check if search is a valid ObjectId and search by id
      if (isValidObjectId(search)) {
        whereCondition.OR.push({
          id: {
            equals: search,
          },
        });
      }

      // Search by discount (if the search is a number)
      if (!isNaN(Number(search))) {
        whereCondition.OR.push({
          discount: {
            equals: parseFloat(search),
          },
        });
      }

      // Search by code (case-insensitive)
      whereCondition.OR.push({
        code: {
          contains: search,
          mode: 'insensitive',
        },
      });
    }

    // Use Prisma transaction to fetch paginated results and count
    const [coupons, totalCoupons] = await this.prisma.$transaction([
      this.prisma.coupon.findMany({
        where: whereCondition,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.coupon.count({ where: whereCondition }),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalCoupons / limit);

    return { coupons, totalCoupons, totalPages };
  }
  async findOne(id: string) {
    return this.prisma.coupon.findUnique({ where: { id } });
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    console.log(updateCouponDto, 'updateCouponDto'); // Log the update DTO for debugging
  
    try {
      const updatedCoupon = await this.prisma.coupon.update({
        where: { id },
        data: updateCouponDto,
      });
  
      // Return success message with the updated coupon data
      return {
        message: 'Coupon updated successfully',
        data: updatedCoupon,
      };
    } catch (error) {
      // Check if error is related to the coupon not being found or any other issue
      if (error.code === 'P2025') { // Prisma error code for 'Record to update not found'
        throw new NotFoundException('Coupon not found');
      }
  
      console.error('Error updating coupon:', error); // Log error for debugging
      throw new InternalServerErrorException('Failed to update coupon');
    }
  }
  

  async remove(id: string) {
    return this.prisma.coupon.delete({ where: { id } });
  }
  async validateCoupon(code: string) {
    const currentDate = new Date();

    // Find the coupon by its code
    const coupon = await this.prisma.coupon.findUnique({
      where: { code },
    });

    // Check if the coupon exists
    if (!coupon) {
      throw new BadRequestException(
        'Coupon code is invalid or does not exist.',
      );
    }

    // Check if the coupon is expired
    if (currentDate > coupon.endDate) {
      throw new BadRequestException('Coupon has expired.');
    }

    // Optionally, check if the coupon is active (not before startDate)
    if (currentDate < coupon.startDate) {
      throw new BadRequestException('Coupon is not yet active.');
    }

    // If coupon is valid and not expired, return the coupon data
    return coupon;
  }
}
