import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class VendorReportsService {
  constructor(private readonly prisma: PrismaService) {}
  async summary(vendorId: string) {
    const [products, orders] = await this.prisma.$transaction([
      this.prisma.product.count({ where: { vendorId } }),
      this.prisma.order.count({ where: { vendorId } }),
    ]);
    return { data: { products, orders } };
  }
}
