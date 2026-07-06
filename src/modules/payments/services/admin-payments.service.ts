import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';

@Injectable()
export class AdminPaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { providerOrderId: { contains: query.search, mode: 'insensitive' } },
        { providerPaymentId: { contains: query.search, mode: 'insensitive' } },
        { order: { orderNumber: { contains: query.search, mode: 'insensitive' } } },
      ];
    }
    if (query.fromDate || query.toDate) {
      where.createdAt = {};
      if (query.fromDate) where.createdAt.gte = new Date(query.fromDate);
      if (query.toDate) where.createdAt.lte = new Date(query.toDate);
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.payment.findMany({
        skip,
        take,
        where,
        include: { order: { include: { customer: { include: { customerProfile: true } }, vendor: true } } },
        orderBy: { createdAt: query.sortOrder || 'desc' },
      }),
      this.prisma.payment.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async get(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: { order: { include: { customer: { include: { customerProfile: true } }, vendor: true, items: { include: { product: true } } } } },
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return { message: 'Data fetched successfully', data: payment };
  }
}
