import { Injectable } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { ProductFilterDto } from '../dto/product-filter.dto';

@Injectable()
export class ProductSearchService {
  constructor(private readonly prisma: PrismaService) {}

  search(query: ProductFilterDto) {
    return this.prisma.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
        deletedAt: null,
        name: query.search ? { contains: query.search, mode: 'insensitive' } : undefined,
        categoryId: query.status ? undefined : undefined,
      },
      include: { images: true, inventory: true, category: true },
      take: query.limit,
      skip: ((query.page ?? 1) - 1) * (query.limit ?? 20),
    });
  }
}
