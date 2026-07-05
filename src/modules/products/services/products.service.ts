import { Injectable } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';
import { ProductFilterDto } from '../dto/product-filter.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ProductFilterDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where = { status: ProductStatus.ACTIVE, deletedAt: null };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({ where, skip, take, include: { images: true, inventory: true, category: true } }),
      this.prisma.product.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data, meta: paginationMeta(page, limit, total) };
  }

  get(productId: string) {
    return this.prisma.product.findFirst({ where: { id: productId, status: ProductStatus.ACTIVE, deletedAt: null }, include: { images: true, inventory: true, category: true } });
  }
}
