import { Body, Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
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
  list(@Query() query: PaginationQueryDto) {
    return this.vendors.list(query);
  }

  @Get(':vendorId')
  get(@Param('vendorId') vendorId: string) {
    return this.vendors.get(vendorId);
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

  @Patch(':vendorId/reactivate')
  async reactivate(@Req() req: any, @Param('vendorId') vendorId: string) {
    const vendor = await this.vendors.reactivate(vendorId);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'VENDOR_REACTIVATED', entityType: 'VendorProfile', entityId: vendor.id });
    return vendor;
  }
}
