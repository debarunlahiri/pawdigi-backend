import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AdminCustomersService } from '../services/admin-customers.service';

@ApiBearerAuth()
@ApiTags('Admin Customers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/customers', version: '1' })
export class AdminCustomersController {
  constructor(private readonly customers: AdminCustomersService) {}
  @Get()
  list() {
    return this.customers.list();
  }
  @Get(':userId')
  get(@Param('userId') userId: string) {
    return this.customers.get(userId);
  }
}
