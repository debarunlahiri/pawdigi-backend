import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { OrderStatusService } from './order-status.service';

@Injectable()
export class VendorOrdersService {
  constructor(private readonly prisma: PrismaService, private readonly orderStatus: OrderStatusService) {}

  list(vendorId: string) {
    return this.prisma.order.findMany({ where: { vendorId }, include: { items: true, shipment: true } });
  }

  async updateStatus(vendorId: string, orderId: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findFirstOrThrow({ where: { id: orderId, vendorId } });
    this.orderStatus.assertTransitionAllowed(order.status, dto.status);
    return this.prisma.order.update({ where: { id: orderId }, data: { status: dto.status } });
  }
}
