import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async users() {
    const [customers, vendors, admins] = await this.prisma.$transaction([
      this.prisma.user.count({ where: { role: 'CUSTOMER' } }),
      this.prisma.user.count({ where: { role: 'VENDOR' } }),
      this.prisma.user.count({ where: { role: { in: ['ADMIN', 'SUPER_ADMIN'] } } }),
    ]);
    return { data: { customers, vendors, admins } };
  }

  async orders() {
    const total = await this.prisma.order.count();
    const byStatus = await this.prisma.order.groupBy({ by: ['status'], _count: true });
    return { data: { total, byStatus } };
  }

  async vendors() {
    const byStatus = await this.prisma.vendorProfile.groupBy({ by: ['status'], _count: true });
    return { data: { byStatus } };
  }
}
