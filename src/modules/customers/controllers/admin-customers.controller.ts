import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AdminUpdateCustomerDto } from '../dto/admin-update-customer.dto';
import { AdminCustomersService } from '../services/admin-customers.service';

@ApiBearerAuth()
@ApiTags('Admin Customers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/customers', version: '1' })
export class AdminCustomersController {
  constructor(private readonly customers: AdminCustomersService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.customers.list(query);
  }

  @Get(':userId')
  get(@Param('userId') userId: string) {
    return this.customers.get(userId);
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() dto: AdminUpdateCustomerDto) {
    return this.customers.update(userId, dto);
  }
}
