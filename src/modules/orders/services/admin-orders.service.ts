import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';
import { CancelOrderDto } from '../dto/cancel-order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';

@Injectable()
export class AdminOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { orderNumber: { contains: query.search, mode: 'insensitive' } },
        { customer: { phoneNumber: { contains: query.search } } },
        { vendor: { businessName: { contains: query.search, mode: 'insensitive' } } },
      ];
    }
    if (query.fromDate || query.toDate) {
      where.createdAt = {};
      if (query.fromDate) where.createdAt.gte = new Date(query.fromDate);
      if (query.toDate) where.createdAt.lte = new Date(query.toDate);
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.order.findMany({
        skip,
        take,
        where,
        include: { customer: { include: { customerProfile: true } }, vendor: true, payment: true, shipment: true, items: { include: { product: true } } },
        orderBy: { createdAt: query.sortOrder || 'desc' },
      }),
      this.prisma.order.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async get(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { customer: { include: { customerProfile: true } }, vendor: true, payment: true, shipment: true, items: { include: { product: true } } },
    });
    if (!order) throw new NotFoundException('Order not found');
    return { message: 'Data fetched successfully', data: order };
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    const data: any = { status: dto.status };
    if (dto.status === OrderStatus.CONFIRMED) data.confirmedAt = new Date();
    if (dto.status === OrderStatus.DELIVERED) data.deliveredAt = new Date();
    return this.prisma.order.update({ where: { id }, data });
  }

  async cancel(id: string, dto: CancelOrderDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status === OrderStatus.CANCELLED) throw new NotFoundException('Order already cancelled');
    return this.prisma.order.update({
      where: { id },
      data: { status: OrderStatus.CANCELLED, cancellationReason: dto.reason, cancelledAt: new Date() },
    });
  }
}
