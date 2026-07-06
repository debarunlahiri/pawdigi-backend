import { Injectable } from '@nestjs/common';
import { PaymentStatus, ProductStatus, VendorStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class AdminDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async counts() {
    const [
      users,
      pets,
      vendors,
      products,
      orders,
      payments,
      pendingVendors,
      pendingProducts,
      lowStock,
      totalRevenue,
      recentOrders,
      recentSignups,
    ] = await this.prisma.$transaction([
      this.prisma.user.count({ where: { deletedAt: null } }),
      this.prisma.pet.count({ where: { deletedAt: null } }),
      this.prisma.vendorProfile.count({ where: { deletedAt: null } }),
      this.prisma.product.count({ where: { deletedAt: null } }),
      this.prisma.order.count(),
      this.prisma.payment.count(),
      this.prisma.vendorProfile.count({ where: { status: VendorStatus.PENDING, deletedAt: null } }),
      this.prisma.product.count({ where: { status: ProductStatus.PENDING_APPROVAL, deletedAt: null } }),
      this.prisma.inventory.count({ where: { stock: { lte: 5 } } }),
      this.prisma.payment.aggregate({ where: { status: PaymentStatus.SUCCESS }, _sum: { amount: true } }),
      this.prisma.order.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { customer: { include: { customerProfile: true } }, vendor: true } }),
      this.prisma.user.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { customerProfile: true } }),
    ]);
    return {
      data: {
        users,
        pets,
        vendors,
        products,
        orders,
        payments,
        pendingVendors,
        pendingProducts,
        lowStock,
        totalRevenue: totalRevenue._sum.amount?.toString() ?? '0',
        recentOrders,
        recentSignups,
      },
    };
  }
}
