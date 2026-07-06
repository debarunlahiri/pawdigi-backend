import { Injectable, NotFoundException } from '@nestjs/common';
import { VendorStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';
import { RejectVendorDto } from '../dto/reject-vendor.dto';

@Injectable()
export class AdminVendorsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = { deletedAt: null };
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { businessName: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { phoneNumber: { contains: query.search } },
        { user: { phoneNumber: { contains: query.search } } },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.vendorProfile.findMany({
        skip,
        take,
        where,
        include: { user: true },
        orderBy: { createdAt: query.sortOrder || 'desc' },
      }),
      this.prisma.vendorProfile.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async get(id: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({
      where: { id, deletedAt: null },
      include: {
        user: true,
        documents: { where: { type: 'VENDOR_KYC', deletedAt: null } },
        products: { where: { deletedAt: null }, take: 10, orderBy: { createdAt: 'desc' } },
        orders: { take: 10, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return { message: 'Data fetched successfully', data: vendor };
  }

  async approve(vendorId: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({ where: { id: vendorId, deletedAt: null } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return this.prisma.vendorProfile.update({ where: { id: vendorId }, data: { status: VendorStatus.APPROVED, rejectionReason: null } });
  }

  async reject(vendorId: string, dto: RejectVendorDto) {
    const vendor = await this.prisma.vendorProfile.findUnique({ where: { id: vendorId, deletedAt: null } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return this.prisma.vendorProfile.update({ where: { id: vendorId }, data: { status: VendorStatus.REJECTED, rejectionReason: dto.reason } });
  }

  async suspend(vendorId: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({ where: { id: vendorId, deletedAt: null } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return this.prisma.vendorProfile.update({ where: { id: vendorId }, data: { status: VendorStatus.SUSPENDED } });
  }

  async reactivate(vendorId: string) {
    const vendor = await this.prisma.vendorProfile.findUnique({ where: { id: vendorId, deletedAt: null } });
    if (!vendor) throw new NotFoundException('Vendor not found');
    return this.prisma.vendorProfile.update({ where: { id: vendorId }, data: { status: VendorStatus.APPROVED } });
  }
}
