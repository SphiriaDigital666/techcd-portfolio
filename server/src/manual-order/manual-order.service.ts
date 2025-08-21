import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManualOrderDto } from './dto/create-manual-order-dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class ManualOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async findGameBySKU(sku: string) {
    const game = await this.prisma.game.findUnique({
      where: { SKU: sku },
    });

    if (!game) {
      throw new BadRequestException(`Game with SKU ${sku} not found.`);
    }

    return game;
  }


  async createManualOrders(orderData: any[]) {
    console.log("orderData",orderData[0].products);
    // Step 1: Insert main orders and retrieve generated IDs
    const ordersToCreate = orderData.map((order) => ({
      systemuserId: order.systemuserId,
      userId: order.userId,
      totalAmount: order.totalAmount,
      // products: { create: order.products },
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      phone: order.phone,
      country: order.country,
      city: order.city,
      address: order.address,
      postalCode: order.postalCode,
      message: order.message,
      status: OrderStatus.COMPLETED
    }));

    const createdOrders = await this.prisma.order.createMany({
      data: ordersToCreate,
    });

    // Step 2: Retrieve the created order IDs for association
    const createdOrderIds = await this.prisma.order.findMany({
      select: { id: true },
      orderBy: { createdAt: 'desc' },
      take: orderData.length,
    });

    // Step 3: Prepare OrderProduct entries with associated order IDs
    const orderProductsToCreate = [];
    for (let i = 0; i < createdOrderIds.length; i++) {
      const orderId = createdOrderIds[i].id;
      const products = orderData[i].products;

      for (const product of products) {
        orderProductsToCreate.push({
          orderId: orderId,
          gameId: product.gameId,
          price: product.price,
          quantity: product.quantity,
        });
      }
    }

    // Insert OrderProduct entries
    await this.prisma.orderProduct.createMany({
      data: orderProductsToCreate,
    });

    return { message: 'Orders created successfully', count: createdOrders.count };
  }

}
