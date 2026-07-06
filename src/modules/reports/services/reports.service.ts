import { Injectable } from '@nestjs/common';
import { PaymentStatus, ProductStatus, VendorStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { ReportDateRangeDto } from '../dto/report-date-range.dto';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  private dateFilter(dto: ReportDateRangeDto) {
    const filter: any = {};
    if (dto.from) filter.gte = new Date(dto.from);
    if (dto.to) filter.lte = new Date(dto.to);
    return Object.keys(filter).length ? filter : undefined;
  }

  async users(dto: ReportDateRangeDto) {
    const dateFilter = this.dateFilter(dto);
    const [customers, vendors, admins] = await this.prisma.$transaction([
      this.prisma.user.count({ where: { role: 'CUSTOMER', createdAt: dateFilter, deletedAt: null } }),
      this.prisma.user.count({ where: { role: 'VENDOR', createdAt: dateFilter, deletedAt: null } }),
      this.prisma.user.count({ where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] }, createdAt: dateFilter, deletedAt: null } }),
    ]);
    return { data: { customers, vendors, admins, from: dto.from, to: dto.to } };
  }

  async orders(dto: ReportDateRangeDto) {
    const dateFilter = this.dateFilter(dto);
    const total = await this.prisma.order.count({ where: dateFilter ? { createdAt: dateFilter } : undefined });
    const byStatus = await this.prisma.order.groupBy({ by: ['status'], _count: true, where: dateFilter ? { createdAt: dateFilter } : undefined });
    const grossRevenue = await this.prisma.payment.aggregate({
      where: { status: PaymentStatus.SUCCESS, createdAt: dateFilter },
      _sum: { amount: true },
    });
    return { data: { total, byStatus, grossRevenue: grossRevenue._sum.amount?.toString() ?? '0', from: dto.from, to: dto.to } };
  }

  async vendors(dto: ReportDateRangeDto) {
    const dateFilter = this.dateFilter(dto);
    const [total, approved, pending, rejected, suspended] = await this.prisma.$transaction([
      this.prisma.vendorProfile.count({ where: { createdAt: dateFilter, deletedAt: null } }),
      this.prisma.vendorProfile.count({ where: { status: VendorStatus.APPROVED, createdAt: dateFilter, deletedAt: null } }),
      this.prisma.vendorProfile.count({ where: { status: VendorStatus.PENDING, createdAt: dateFilter, deletedAt: null } }),
      this.prisma.vendorProfile.count({ where: { status: VendorStatus.REJECTED, createdAt: dateFilter, deletedAt: null } }),
      this.prisma.vendorProfile.count({ where: { status: VendorStatus.SUSPENDED, createdAt: dateFilter, deletedAt: null } }),
    ]);
    return { data: { total, approved, pending, rejected, suspended, from: dto.from, to: dto.to } };
  }

  async revenue(dto: ReportDateRangeDto) {
    const dateFilter = this.dateFilter(dto);
    const [success, refunded, failed] = await this.prisma.$transaction([
      this.prisma.payment.aggregate({ where: { status: PaymentStatus.SUCCESS, createdAt: dateFilter }, _sum: { amount: true }, _count: true }),
      this.prisma.payment.aggregate({ where: { status: { in: [PaymentStatus.REFUNDED, PaymentStatus.PARTIALLY_REFUNDED] }, createdAt: dateFilter }, _sum: { refundedAmount: true }, _count: true }),
      this.prisma.payment.aggregate({ where: { status: PaymentStatus.FAILED, createdAt: dateFilter }, _count: true }),
    ]);
    return {
      data: {
        successfulAmount: success._sum.amount?.toString() ?? '0',
        successfulCount: success._count,
        refundedAmount: refunded._sum.refundedAmount?.toString() ?? '0',
        refundedCount: refunded._count,
        failedCount: failed._count,
        from: dto.from,
        to: dto.to,
      },
    };
  }

  async products(dto: ReportDateRangeDto) {
    const dateFilter = this.dateFilter(dto);
    const [total, active, pendingApproval, rejected, outOfStock] = await this.prisma.$transaction([
      this.prisma.product.count({ where: { createdAt: dateFilter, deletedAt: null } }),
      this.prisma.product.count({ where: { status: ProductStatus.ACTIVE, createdAt: dateFilter, deletedAt: null } }),
      this.prisma.product.count({ where: { status: ProductStatus.PENDING_APPROVAL, createdAt: dateFilter, deletedAt: null } }),
      this.prisma.product.count({ where: { status: ProductStatus.REJECTED, createdAt: dateFilter, deletedAt: null } }),
      this.prisma.product.count({ where: { status: ProductStatus.OUT_OF_STOCK, createdAt: dateFilter, deletedAt: null } }),
    ]);
    return { data: { total, active, pendingApproval, rejected, outOfStock, from: dto.from, to: dto.to } };
  }
}
