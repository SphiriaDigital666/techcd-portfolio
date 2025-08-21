import { Module } from '@nestjs/common';
import { ManualOrderService } from './manual-order.service';
import { ManualOrderController } from './manual-order.controller';
import { OrderService } from 'src/order/order.service';

@Module({
  providers: [ManualOrderService, OrderService],
  controllers: [ManualOrderController]
})
export class ManualOrderModule {}
