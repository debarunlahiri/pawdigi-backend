import { Injectable } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { ProductFilterDto } from '../dto/product-filter.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';

@Injectable()
export class AdminProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ProductFilterDto) {
    const { page, limit, skip, take } = getPagination(query);
    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({ skip, take, include: { vendor: true, category: true, inventory: true } }),
      this.prisma.product.count(),
    ]);
    return { message: 'Data fetched successfully', data, meta: paginationMeta(page, limit, total) };
  }

  approve(productId: string) {
    return this.prisma.product.update({ where: { id: productId }, data: { status: ProductStatus.ACTIVE } });
  }

  reject(productId: string) {
    return this.prisma.product.update({ where: { id: productId }, data: { status: ProductStatus.REJECTED } });
  }
}
