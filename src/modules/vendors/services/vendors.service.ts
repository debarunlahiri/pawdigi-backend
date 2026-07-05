import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { UpdateVendorProfileDto } from '../dto/update-vendor-profile.dto';

@Injectable()
export class VendorsService {
  constructor(private readonly prisma: PrismaService) {}

  profile(vendorId: string) {
    return this.prisma.vendorProfile.findUnique({ where: { id: vendorId } });
  }

  update(vendorId: string, dto: UpdateVendorProfileDto) {
    return this.prisma.vendorProfile.update({ where: { id: vendorId }, data: dto });
  }
}
