import { Module } from '@nestjs/common';
import { AdminOrdersController } from './controllers/admin-orders.controller';
import { OrdersController } from './controllers/orders.controller';
import { VendorOrdersController } from './controllers/vendor-orders.controller';
import { AdminOrdersService } from './services/admin-orders.service';
import { OrderPricingService } from './services/order-pricing.service';
import { OrderStatusService } from './services/order-status.service';
import { OrdersService } from './services/orders.service';
import { VendorOrdersService } from './services/vendor-orders.service';

@Module({
  controllers: [OrdersController, VendorOrdersController, AdminOrdersController],
  providers: [OrdersService, OrderPricingService, OrderStatusService, VendorOrdersService, AdminOrdersService],
})
export class OrdersModule {}
