import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class VendorApprovedGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = context.switchToHttp().getRequest().user;
    if (!user?.vendorId) throw new ForbiddenException('Vendor account is required');
    const vendor = await this.prisma.vendorProfile.findUnique({ where: { id: user.vendorId } });
    if (vendor?.status !== 'APPROVED') throw new ForbiddenException('Vendor account is not approved');
    return true;
  }
}
