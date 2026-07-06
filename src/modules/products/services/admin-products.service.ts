import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { ProductFilterDto } from '../dto/product-filter.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';
import { AdminUpdateProductDto } from '../dto/admin-update-product.dto';

@Injectable()
export class AdminProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ProductFilterDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = { deletedAt: null };
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { sku: { contains: query.search, mode: 'insensitive' } },
        { vendor: { businessName: { contains: query.search, mode: 'insensitive' } } },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip,
        take,
        where,
        include: { vendor: true, category: true, inventory: true, images: true },
        orderBy: { createdAt: query.sortOrder || 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async get(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id, deletedAt: null },
      include: { vendor: true, category: true, inventory: true, images: true, reviews: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return { message: 'Data fetched successfully', data: product };
  }

  async update(id: string, dto: AdminUpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id, deletedAt: null } });
    if (!product) throw new NotFoundException('Product not found');
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async approve(productId: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId, deletedAt: null } });
    if (!product) throw new NotFoundException('Product not found');
    return this.prisma.product.update({ where: { id: productId }, data: { status: ProductStatus.ACTIVE } });
  }

  async reject(productId: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId, deletedAt: null } });
    if (!product) throw new NotFoundException('Product not found');
    return this.prisma.product.update({ where: { id: productId }, data: { status: ProductStatus.REJECTED } });
  }

  async remove(productId: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId, deletedAt: null } });
    if (!product) throw new NotFoundException('Product not found');
    return this.prisma.product.update({ where: { id: productId }, data: { deletedAt: new Date(), status: ProductStatus.INACTIVE } });
  }
}
