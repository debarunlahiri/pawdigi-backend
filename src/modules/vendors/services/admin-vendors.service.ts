import { Injectable } from '@nestjs/common';
import { VendorStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { RejectVendorDto } from '../dto/reject-vendor.dto';

@Injectable()
export class AdminVendorsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.vendorProfile.findMany({ include: { user: true } });
  }

  approve(vendorId: string) {
    return this.prisma.vendorProfile.update({ where: { id: vendorId }, data: { status: VendorStatus.APPROVED, rejectionReason: null } });
  }

  reject(vendorId: string, dto: RejectVendorDto) {
    return this.prisma.vendorProfile.update({ where: { id: vendorId }, data: { status: VendorStatus.REJECTED, rejectionReason: dto.reason } });
  }

  suspend(vendorId: string) {
    return this.prisma.vendorProfile.update({ where: { id: vendorId }, data: { status: VendorStatus.SUSPENDED } });
  }
}
