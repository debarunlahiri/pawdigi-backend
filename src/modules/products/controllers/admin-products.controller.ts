import { Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ProductFilterDto } from '../dto/product-filter.dto';
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

  @Patch(':productId/approve')
  async approve(@Req() req: any, @Param('productId') productId: string) {
    const product = await this.products.approve(productId);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'PRODUCT_APPROVED', entityType: 'Product', entityId: product.id, newValue: product });
    return product;
  }

  @Patch(':productId/reject')
  async reject(@Req() req: any, @Param('productId') productId: string) {
    const product = await this.products.reject(productId);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'PRODUCT_REJECTED', entityType: 'Product', entityId: product.id, newValue: product });
    return product;
  }
}
