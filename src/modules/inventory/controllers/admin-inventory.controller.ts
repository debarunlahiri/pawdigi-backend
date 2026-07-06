import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';
import { AdminInventoryService } from '../services/admin-inventory.service';

@ApiBearerAuth()
@ApiTags('Admin Inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/inventory', version: '1' })
export class AdminInventoryController {
  constructor(private readonly inventory: AdminInventoryService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.inventory.list(query);
  }

  @Get(':productId')
  get(@Param('productId') productId: string) {
    return this.inventory.get(productId);
  }

  @Patch(':productId')
  update(@Param('productId') productId: string, @Body() dto: UpdateInventoryDto) {
    return this.inventory.update(productId, dto);
  }
}
