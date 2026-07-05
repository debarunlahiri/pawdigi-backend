import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { VendorApprovedGuard } from '../../../common/guards/vendor-approved.guard';
import { VendorReportsService } from '../services/vendor-reports.service';

@ApiBearerAuth()
@ApiTags('Vendor Reports')
@UseGuards(JwtAuthGuard, RolesGuard, VendorApprovedGuard)
@Roles(Role.VENDOR)
@Controller({ path: 'vendor/reports', version: '1' })
export class VendorReportsController {
  constructor(private readonly reports: VendorReportsService) {}
  @Get('summary')
  summary(@Req() req: any) {
    return this.reports.summary(req.user.vendorId);
  }
}
