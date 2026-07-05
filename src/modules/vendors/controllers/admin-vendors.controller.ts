import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { RejectVendorDto } from '../dto/reject-vendor.dto';
import { AuditLogsService } from '../../audit-logs/services/audit-logs.service';
import { AdminVendorsService } from '../services/admin-vendors.service';

@ApiBearerAuth()
@ApiTags('Admin Vendors')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/vendors', version: '1' })
export class AdminVendorsController {
  constructor(private readonly vendors: AdminVendorsService, private readonly auditLogs: AuditLogsService) {}

  @Get()
  list() {
    return this.vendors.list();
  }

  @Patch(':vendorId/approve')
  async approve(@Req() req: any, @Param('vendorId') vendorId: string) {
    const vendor = await this.vendors.approve(vendorId);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'VENDOR_APPROVED', entityType: 'VendorProfile', entityId: vendor.id, newValue: vendor });
    return vendor;
  }

  @Patch(':vendorId/reject')
  async reject(@Req() req: any, @Param('vendorId') vendorId: string, @Body() dto: RejectVendorDto) {
    const vendor = await this.vendors.reject(vendorId, dto);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'VENDOR_REJECTED', entityType: 'VendorProfile', entityId: vendor.id, newValue: vendor });
    return vendor;
  }

  @Patch(':vendorId/suspend')
  async suspend(@Req() req: any, @Param('vendorId') vendorId: string) {
    const vendor = await this.vendors.suspend(vendorId);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'VENDOR_SUSPENDED', entityType: 'VendorProfile', entityId: vendor.id });
    return vendor;
  }
}
