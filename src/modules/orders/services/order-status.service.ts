import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderStatusService {
  assertTransitionAllowed(current: OrderStatus, next: OrderStatus) {
    const allowed: Record<OrderStatus, OrderStatus[]> = {
      PLACED: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      CONFIRMED: [OrderStatus.PACKED, OrderStatus.CANCELLED],
      PACKED: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
      SHIPPED: [OrderStatus.DELIVERED, OrderStatus.RETURN_REQUESTED],
      DELIVERED: [OrderStatus.RETURN_REQUESTED],
      CANCELLED: [],
      RETURN_REQUESTED: [OrderStatus.RETURNED, OrderStatus.REFUNDED],
      RETURNED: [OrderStatus.REFUNDED],
      REFUNDED: [],
    };
    if (!allowed[current].includes(next)) throw new BadRequestException(`Cannot move order from ${current} to ${next}`);
  }
}
