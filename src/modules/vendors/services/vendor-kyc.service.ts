import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { VendorKycDto } from '../dto/vendor-kyc.dto';

@Injectable()
export class VendorKycService {
  constructor(private readonly prisma: PrismaService) {}

  submit(vendorId: string, dto: VendorKycDto) {
    return this.prisma.vendorProfile.update({
      where: { id: vendorId },
      data: {
        gstNumber: dto.gstNumber,
        panNumber: dto.panNumber,
        documents: dto.documentIds ? { connect: dto.documentIds.map((id) => ({ id })) } : undefined,
      },
      include: { documents: true },
    });
  }
}
