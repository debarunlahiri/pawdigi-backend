import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ReportDateRangeDto } from '../dto/report-date-range.dto';
import { ReportsService } from '../services/reports.service';

@ApiBearerAuth()
@ApiTags('Admin Reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/reports', version: '1' })
export class AdminReportsController {
  constructor(private readonly reports: ReportsService) {}

  @Get('users')
  users(@Query() dto: ReportDateRangeDto) {
    return this.reports.users(dto);
  }

  @Get('orders')
  orders(@Query() dto: ReportDateRangeDto) {
    return this.reports.orders(dto);
  }

  @Get('vendors')
  vendors(@Query() dto: ReportDateRangeDto) {
    return this.reports.vendors(dto);
  }

  @Get('revenue')
  revenue(@Query() dto: ReportDateRangeDto) {
    return this.reports.revenue(dto);
  }

  @Get('products')
  products(@Query() dto: ReportDateRangeDto) {
    return this.reports.products(dto);
  }
}
