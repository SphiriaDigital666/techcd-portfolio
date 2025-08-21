import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { isValidObjectId } from 'mongoose';
import { sendEmail } from '../utils/email.utils';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(
    userId: string | null,
    products: { gameId: string; quantity: number }[],
    couponCode?: string,
    discount?: number,
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
    return this.prisma.$transaction(async (prisma) => {
      let totalAmount = 0;
      const orderProductsData: {
        gameId: string;
        quantity: number;
        price: number;
      }[] = [];

      for (const product of products) {
        const game = await prisma.game.findUnique({
          where: { id: product.gameId },
        });
        if (!game || game.stock < product.quantity) {
          throw new BadRequestException('Insufficient stock or game not found');
        }

        await prisma.game.update({
          where: { id: product.gameId },
          data: {
            stock: { decrement: product.quantity },
            totalSales: { increment: product.quantity },
          },
        });

        totalAmount += game.sellingPrice * product.quantity;
        orderProductsData.push({
          gameId: product.gameId,
          quantity: product.quantity,
          price: game.sellingPrice,
        });
      }

      let discountAmount = 0;
      let appliedCoupon = null;

      if (couponCode) {
        const coupon = await prisma.coupon.findUnique({
          where: { code: couponCode },
        });
        if (!coupon || coupon.endDate < new Date()) {
          throw new BadRequestException(
            `Invalid or expired coupon: ${couponCode}`,
          );
        }

        discountAmount =
          coupon.type === 'PERCENTAGE'
            ? (totalAmount * coupon.discount) / 100
            : coupon.discount;
        appliedCoupon = { couponId: coupon.id };
      }

      totalAmount -= discountAmount;
      totalAmount = Math.max(totalAmount, 0);

      let systemUserId = await prisma.user.findFirst({
        where: { email: billingData.email },
        select: {
          userId: true,
        },
      });

      console.log('systemUserId111..........', systemUserId);

      if (!systemUserId) {
        systemUserId = { userId: await this.generateUniqueUserId() };
      }

      const order = await prisma.order.create({
        data: {
          userId: userId || undefined, // Allow for guest orders without userId
          totalAmount,
          products: { create: orderProductsData },
          appliedCoupons: appliedCoupon ? { create: appliedCoupon } : undefined,
          discount,
          systemuserId: systemUserId?.userId,
          firstName: billingData.firstName,
          lastName: billingData.lastName,
          email: billingData.email,
          phone: billingData.phone,
          country: billingData.country,
          city: billingData.city,
          address: billingData.address,
          postalCode: billingData.postalCode,
          message: billingData.message || '',
        },
      });
      const orderDetails = orderProductsData
        .map(
          (product) =>
            `<tr>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${product.gameId}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${product.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${product.price.toFixed(2)}</td>
      </tr>`,
        )
        .join('');

        const emailContent = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="padding: 20px; text-align: center;">
            <!-- Reference the image using its URL -->
            <img src="http://localhost:3000/public/images/logo.png" alt="Company Logo" style="width: 150px; height: auto; margin-bottom: 20px;" />
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px;">Dear <strong>${billingData.firstName} ${billingData.lastName}</strong>,</p>
            <p style="font-size: 16px;">Thank you for your order! Here are the details:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="background-color: #4caf50; color: white;">
                <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Game ID</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: center;">Quantity</th>
                <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Price</th>
              </tr>
              ${orderDetails}
            </table>
            
            <p style="font-size: 16px;"><strong>Order ID:</strong> ${order.id}</p>
            <p style="font-size: 16px;"><strong>Total Amount:</strong> <span style="color: #4caf50;">$${totalAmount.toFixed(2)}</span></p>
            
            <h3 style="color: #4caf50;">Billing Information:</h3>
            <p style="margin: 0;">Name: ${billingData.firstName} ${billingData.lastName}</p>
            <p style="margin: 0;">Email: ${billingData.email}</p>
            <p style="margin: 0;">Phone: ${billingData.phone}</p>
            <p style="margin: 0;">Address: ${billingData.address}, ${billingData.city}, ${billingData.country}, ${billingData.postalCode}</p>
            
            <p style="font-size: 16px; margin-top: 20px; color: #555;">Message: <i>${billingData.message || 'N/A'}</i></p>
            
            <div style="background-color: #f4f4f4; padding: 10px; margin-top: 20px; text-align: center;">
              <p style="font-size: 14px; color: #555; margin: 0;">We hope you enjoy your purchase!</p>
              <p style="font-size: 14px; color: #555; margin: 0;">Thank you for choosing our service.</p>
            </div>
          </div>
        </div>
      `;
      

      // Send the email
      await sendEmail(billingData.email, 'Order Confirmation', emailContent);

      return order;
    });
  }

  private async generateUniqueUserId(): Promise<string> {
    let isUnique = false;
    let userId: string;

    while (!isUnique) {
      // Generate a random userId with the format SUxxxxxx
      userId = `SU${Math.floor(100000 + Math.random() * 900000)}`; // e.g., SU123456

      console.log('userId,.....', userId);

      // Check if this userId already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { userId },
      });

      if (!existingUser) {
        isUnique = true; // userId is unique
      }
    }

    console.log('here....', userId);

    return userId;
  }

  async updateOrder(orderId: string, status: any) {
    const validStatuses = ['PENDING', 'COMPLETED', 'CANCELLED', 'HOLD'];

    // Check if the provided status is valid
    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid order status');
    }

    return this.prisma.$transaction(async (prisma) => {
      // Fetch the order with associated products
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          products: true, // Include associated products
        },
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      // Check if the order is already in the requested status
      if (order.status === status) {
        throw new BadRequestException(`Order is already in ${status} status`);
      }

      // If the new status is CANCELLED, restore product stock
      if (status === 'CANCELLED') {
        for (const orderProduct of order.products) {
          await prisma.game.update({
            where: { id: orderProduct.gameId },
            data: {
              stock: { increment: orderProduct.quantity }, // Increment stock by the product quantity
              totalSales: { decrement: orderProduct.quantity }, // Decrement total sales by the product quantity
            },
          });
        }
      }

      // Update the order status
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: { status: status },
      });

      return updatedOrder;
    });
  }

  // method to get all orders
  async getAllOrders(page: number, limit: number, search?: string) {
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
        take: limit ? limit : undefined,
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
    console.log('orders..........', orders[0]);
    return { orders, totalOrders, totalPages };
  }

  async getAllOrdersForAUser(
    page: number,
    limit: number,
    search?: string,
    userId?: string,
  ) {
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

    if (userId) {
      whereCondition.userId = userId;
    }

    const [orders, totalOrders] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        where: whereCondition,
        skip: (page - 1) * limit,
        take: limit ? limit : undefined,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          products: {
            include: {
              game: {
                select: {
                  SKU: true,
                  productName: true,
                  displayName: true,
                  sellingPrice: true,
                  cardImage: true,
                },
              },
            },
          },
          appliedCoupons: true,
          user: true,
        },
      }),
      this.prisma.order.count({ where: whereCondition }),
    ]);

    const totalPages = Math.ceil(totalOrders / limit);
    console.log('orders..........', orders[0]);
    return { orders, totalOrders, totalPages };
  }

  // delete user by id
  async deleteOrder(id: string) {
    let deleteOrder = await this.prisma.order.delete({
      where: { id },
    });
    return {
      deletedOrder: deleteOrder,
      message: `${deleteOrder.id} delete successfully`,
    };
  }

  async getTopRatedDataByMonth() {
    // Group orders by month and calculate total income
    const ordersGroupedByMonth = await this.prisma.order.groupBy({
      by: ['createdAt'],
      _sum: {
        totalAmount: true, // Sum total income for each month
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Transform the data into a format suitable for the chart
    const chartData = Array(12).fill({ month: '', totalIncome: 0 });

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    for (const order of ordersGroupedByMonth) {
      const monthIndex = new Date(order.createdAt).getMonth();
      const totalIncome = order._sum.totalAmount || 0;

      if (chartData[monthIndex].totalIncome) {
        chartData[monthIndex].totalIncome += totalIncome;
      } else {
        chartData[monthIndex] = {
          month: months[monthIndex],
          totalIncome,
        };
      }
    }

    return chartData.filter((data) => data.totalIncome > 0);
  }

  async getTopData(limit: number) {
    // Fetch top customers by order count
    const topUsers = await this.prisma.user.findMany({
      take: limit,
      orderBy: {
        Order: {
          _count: 'desc',
        },
      },
      include: {
        _count: {
          select: { Order: true },
        },
        Order: {
          include: {
            products: true,
          },
        },
      },
    });

    // Fetch top games by total sales (or total orders, you can change this as needed)
    const topGames = await this.prisma.game.findMany({
      take: limit,
      orderBy: {
        totalSales: 'desc', // Change this to order by 'totalSales' or 'stock' as needed
      },
      include: {
        OrderProduct: {
          select: {
            quantity: true,
          },
        },
      },
    });

    // Calculate total orders
    const totalOrders = await this.prisma.order.count();

    // Calculate total customers
    const totalCustomers = await this.prisma.user.count();

    // Calculate total products (games)
    const totalProducts = await this.prisma.game.count();

    // Calculate total earnings from all completed orders
    const totalEarnings = await this.prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        status: 'COMPLETED', // Ensure to only sum the completed orders
      },
    });

    // Get total earnings value (if any orders exist)
    const totalEarningsAmount = totalEarnings._sum.totalAmount || 0;

    // Fetch top rated data by month
    const topRatedDataByMonth = await this.getTopRatedDataByMonth();

    return {
      topUsers,
      topGames,
      totalOrders,
      totalCustomers,
      totalProducts,
      totalEarnings: totalEarningsAmount, // Add the total earnings value
      topRatedDataByMonth,
    };
  }

  // Add this method to your OrderService class
  async getOrderDetailsById(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        products: {
          include: {
            game: true, // Include game details for each product in the order
          },
        },
        appliedCoupons: {
          include: {
            coupon: true, // Include coupon details if a coupon was applied
          },
        },
        user: true, // Include user details if the order is linked to a user
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
