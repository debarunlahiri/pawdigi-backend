import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  async update(vendorId: string, productId: string, dto: UpdateInventoryDto) {
    const product = await this.prisma.product.findFirst({ where: { id: productId, vendorId } });
    if (!product) throw new ForbiddenException('Product access denied');
    return this.prisma.inventory.upsert({
      where: { productId },
      update: { stock: dto.stock, available: { set: dto.stock }, lastRestockedAt: new Date() },
      create: { productId, stock: dto.stock, available: dto.stock, reserved: 0, lastRestockedAt: new Date() },
    });
  }
}
