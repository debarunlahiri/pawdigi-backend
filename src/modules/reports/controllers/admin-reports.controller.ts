import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ReportsService } from '../services/reports.service';

@ApiBearerAuth()
@ApiTags('Admin Reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/reports', version: '1' })
export class AdminReportsController {
  constructor(private readonly reports: ReportsService) {}
  @Get('users')
  users() {
    return this.reports.users();
  }
  @Get('orders')
  orders() {
    return this.reports.orders();
  }
  @Get('vendors')
  vendors() {
    return this.reports.vendors();
  }
}
