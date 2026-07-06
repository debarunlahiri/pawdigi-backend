import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ProductFilterDto } from '../dto/product-filter.dto';
import { AdminUpdateProductDto } from '../dto/admin-update-product.dto';
import { AuditLogsService } from '../../audit-logs/services/audit-logs.service';
import { AdminProductsService } from '../services/admin-products.service';

@ApiBearerAuth()
@ApiTags('Admin Products')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/products', version: '1' })
export class AdminProductsController {
  constructor(private readonly products: AdminProductsService, private readonly auditLogs: AuditLogsService) {}

  @Get()
  list(@Query() query: ProductFilterDto) {
    return this.products.list(query);
  }

  @Get(':productId')
  get(@Param('productId') productId: string) {
    return this.products.get(productId);
  }

  @Patch(':productId')
  async update(@Req() req: any, @Param('productId') productId: string, @Body() dto: AdminUpdateProductDto) {
    const product = await this.products.update(productId, dto);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'PRODUCT_UPDATED', entityType: 'Product', entityId: product.id, newValue: product });
    return { message: 'Product updated successfully', data: product };
  }

  @Patch(':productId/approve')
  async approve(@Req() req: any, @Param('productId') productId: string) {
    const product = await this.products.approve(productId);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'PRODUCT_APPROVED', entityType: 'Product', entityId: product.id, newValue: product });
    return { message: 'Product approved successfully', data: product };
  }

  @Patch(':productId/reject')
  async reject(@Req() req: any, @Param('productId') productId: string) {
    const product = await this.products.reject(productId);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'PRODUCT_REJECTED', entityType: 'Product', entityId: product.id, newValue: product });
    return { message: 'Product rejected successfully', data: product };
  }

  @Delete(':productId')
  async remove(@Req() req: any, @Param('productId') productId: string) {
    const product = await this.products.remove(productId);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'PRODUCT_DELETED', entityType: 'Product', entityId: product.id, newValue: product });
    return { message: 'Product deleted successfully', data: product };
  }
}
