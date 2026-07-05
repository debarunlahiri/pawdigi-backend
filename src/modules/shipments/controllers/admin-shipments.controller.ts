import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ShipmentsService } from '../services/shipments.service';

@ApiBearerAuth()
@ApiTags('Admin Shipments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/shipments', version: '1' })
export class AdminShipmentsController {
  constructor(private readonly shipments: ShipmentsService) {}
  @Get()
  list() {
    return this.shipments.adminList();
  }
}
