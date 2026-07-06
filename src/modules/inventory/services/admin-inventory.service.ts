import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';

@Injectable()
export class AdminInventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = {};
    if (query.search) {
      where.product = {
        OR: [
          { name: { contains: query.search, mode: 'insensitive' } },
          { sku: { contains: query.search, mode: 'insensitive' } },
        ],
      };
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.inventory.findMany({
        skip,
        take,
        where,
        include: { product: { include: { vendor: true, category: true } } },
        orderBy: { updatedAt: query.sortOrder || 'desc' },
      }),
      this.prisma.inventory.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async get(productId: string) {
    const inventory = await this.prisma.inventory.findUnique({
      where: { productId },
      include: { product: { include: { vendor: true, category: true } } },
    });
    if (!inventory) throw new NotFoundException('Inventory not found');
    return { message: 'Data fetched successfully', data: inventory };
  }

  async update(productId: string, dto: UpdateInventoryDto) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');
    const inventory = await this.prisma.inventory.upsert({
      where: { productId },
      update: { stock: dto.stock, available: { set: dto.stock }, lastRestockedAt: new Date() },
      create: { productId, stock: dto.stock, available: dto.stock, reserved: 0, lastRestockedAt: new Date() },
    });
    return { message: 'Inventory updated successfully', data: inventory };
  }
}
