import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class AdminDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async counts() {
    const [users, pets, vendors, products, orders, payments] = await this.prisma.$transaction([
      this.prisma.user.count(),
      this.prisma.pet.count(),
      this.prisma.vendorProfile.count(),
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.payment.count(),
    ]);
    return { data: { users, pets, vendors, products, orders, payments } };
  }
}
