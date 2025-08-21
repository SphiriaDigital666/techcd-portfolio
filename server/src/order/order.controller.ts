import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Query,
  Delete,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Express, Multer } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csv from 'csv-parser';
// import { Multer } from 'multer';
import { Readable } from 'stream';
// import { PrismaService } from '../prisma/prisma.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(
    @Query('page') page: string = '1', // Default page to '1'
    @Query('limit') limit: string = '1', // Default limit to '3'
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1; // Convert to number, default to 1 if NaN
    const limitNumber = parseInt(limit, 10) || 3; // Convert to number, default to 3 if NaN
    return this.orderService.getAllOrders(pageNumber, limitNumber, search,);
  }

  @Get("single-user")
  async getAllOrdersOfAUser(
    @Query('page') page: string = '1', // Default page to '1'
    @Query('limit') limit: string = '1', // Default limit to '3'
    @Query('search') search?: string,
    @Query('userId') userId?: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1; // Convert to number, default to 1 if NaN
    const limitNumber = parseInt(limit, 10) || 10; // Convert to number, default to 3 if NaN
    return this.orderService.getAllOrdersForAUser(pageNumber, limitNumber, search, userId);
  }

  @Get('top-users')
  async getTopUsersByPurchase(@Query('limit') limit: string = '6') {
    const limitNumber = parseInt(limit, 10) || 2;
    return this.orderService.getTopData(limitNumber);
  }

  // Endpoint to get details of a specific order by ID
  @Get(':orderId')
  async getOrderDetailsById(@Param('orderId') orderId: string) {
    const order = await this.orderService.getOrderDetailsById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  @Post()
  async createOrder(
    @Body('products') products: { gameId: string; quantity: number }[],
    @Body('userId') userId?: string | null,
    @Body('coupon') coupon?: string,
    @Body('discount') discount?: number,
    @Body('billingData')
    billingData?: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      country: string;
      city: string;
      address: string;
      postalCode: string;
      message?: string;
    },
  ) {
    return this.orderService.createOrder(
      userId,
      products,
      coupon,
      discount,
      billingData,
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File) {
    const orders = [];
    // Parse CSV file
    await new Promise((resolve, reject) => {
      const stream = Readable.from(file.buffer);
      stream
        .pipe(csv())
        .on('data', (row) => {
          orders.push(row);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    try {
      // await this.prisma.order.createMany({ data: orders });
      console.log(orders);
      return { message: 'Orders uploaded successfully', count: orders.length };
    } catch (error) {
      throw new Error('Error uploading orders');
    }
  }

  @Delete(':orderId')
  async deleteOrder(@Param('orderId') orderId: string) {
    return this.orderService.deleteOrder(orderId);
  }

  @Patch(':orderId/:status')
  async updateOrder(
    @Param('orderId') orderId: string,
    @Param('status') status: string,
  ) {
    return this.orderService.updateOrder(orderId, status);
  }



  
}
