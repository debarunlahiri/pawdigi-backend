import { ForbiddenException, Injectable } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class VendorProductsService {
  constructor(private readonly prisma: PrismaService) {}

  list(vendorId: string) {
    return this.prisma.product.findMany({ where: { vendorId, deletedAt: null }, include: { inventory: true, images: true } });
  }

  create(vendorId: string, dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        vendorId,
        categoryId: dto.categoryId,
        name: dto.name,
        sku: dto.sku,
        description: dto.description,
        price: dto.price,
        discountPrice: dto.discountPrice,
        petType: dto.petType,
        status: ProductStatus.PENDING_APPROVAL,
        images: { create: dto.imageUrls?.map((url, sortOrder) => ({ url, sortOrder })) ?? [] },
        inventory: { create: { stock: 0, reserved: 0 } },
      },
    });
  }

  async update(vendorId: string, productId: string, dto: UpdateProductDto) {
    await this.assertOwns(vendorId, productId);
    return this.prisma.product.update({ where: { id: productId }, data: { ...dto, status: ProductStatus.PENDING_APPROVAL } });
  }

  async remove(vendorId: string, productId: string) {
    await this.assertOwns(vendorId, productId);
    return this.prisma.product.update({ where: { id: productId }, data: { deletedAt: new Date() } });
  }

  private async assertOwns(vendorId: string, productId: string) {
    const product = await this.prisma.product.findFirst({ where: { id: productId, vendorId } });
    if (!product) throw new ForbiddenException('Product access denied');
  }
}
