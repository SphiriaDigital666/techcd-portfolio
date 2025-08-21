import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ManualOrderService } from './manual-order.service';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateManualOrderDto, Product } from './dto/create-manual-order-dto';
// import { Express } from 'express';
import { Express, Multer } from 'multer';
import { first } from 'rxjs';

@Controller('manual-orders')
export class ManualOrderController {
  constructor(private readonly orderService: ManualOrderService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('CSV file is required');
    }

    const orders = new Map();
    const stream = Readable.from(file.buffer);

    await new Promise((resolve, reject) => {
      stream
        .pipe(csvParser())
        .on('data', (row) => {
          const orderId = row['order_id'];
          const product = {
            sku: row['sku'],
            price: parseFloat(row['selling_price']),
            quantity: parseInt(row['quantity'], 10),
          };
          const orderTotal = parseFloat(row['order_total']);

          if (!orders.has(orderId)) {
            // Initialize a new order entry if it doesn't exist
            orders.set(orderId, {
              systemuserId: row['userId'],
              userId: undefined,
              totalAmount: orderTotal,
              products: [product],
              appliedCoupons: undefined,
              firstName: row['firstName'],
              lastName: row['lastName'],
              email: row['email'],
              phone: row['phone'],
              country: row['country'],
              city: row['city'],
              address: row['address'],
              postalCode: row['postalCode'],
              message: '',
            });
          } else {
            // If orderId exists, add the product to the existing entry's products array
            const existingOrder = orders.get(orderId);
            existingOrder.products.push(product);
          }
        })
        .on('end', resolve)
        .on('error', reject);
    });


    // const { userId, appliedCoupons , validateData } = orders.values().next().value;

    for (const [_, orderData] of orders) {
      const orderDto = plainToInstance(CreateManualOrderDto, orderData);
      orderDto.products = orderData.products.map((product) =>
        plainToInstance(Product, product)
      );

      const errors = await validate(orderDto, { whitelist: true, forbidNonWhitelisted: true });
      if (errors.length > 0) {
        throw new BadRequestException(`Validation failed: ${errors}`);
      }
    }

    // Convert map to array for service processing
    const groupedOrders = Array.from(orders.values());

    // Fetch game IDs by SKU and add them to products
    for (const order of groupedOrders) {
      order.products = await Promise.all(
        order.products.map(async (product) => {
          const game = await this.orderService.findGameBySKU(product.sku);
          return {
            gameId: game?.id || null,
            // name: game?.productName || 'Unknown Product',
            // sku: product.sku,
            price: product.price,
            quantity: product.quantity,
          };
        })
      );
    }

    console.log(groupedOrders[0].products);

    // return groupedOrders;

    // // Validate each grouped order
    // for (const orderData of groupedOrders) {
    //   const orderDto = plainToInstance(CreateManualOrderDto, orderData);
    //   const errors = await validate(orderDto);
    //   if (errors.length > 0) {
    //     throw new BadRequestException(`Validation failed: ${errors}`);
    //   }
    // }

    return this.orderService.createManualOrders(groupedOrders);
  }
}


  
  
