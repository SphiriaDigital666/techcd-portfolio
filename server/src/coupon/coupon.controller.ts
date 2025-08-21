import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon-dto';
import { UpdateCouponDto } from './dto/update-coupon-dto';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  async getAllCoupons(
    @Query('page') page: string = '1', // Default page to '1'
    @Query('limit') limit: string = '10', // Default limit to '3'
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1; // Convert to number, default to 1 if NaN
    const limitNumber = parseInt(limit, 10) || 3; // Convert to number, default to 3 if NaN
    return this.couponService.getAllCoupons(pageNumber, limitNumber, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(id);
  }
  @Post('validateCoupon')
  validateCoupon(@Body('code') code: string) {
    return this.couponService.validateCoupon(code);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(id);
  }
}
