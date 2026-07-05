import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class AdminOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.order.findMany({ include: { customer: true, vendor: true, payment: true, shipment: true } });
  }
}
