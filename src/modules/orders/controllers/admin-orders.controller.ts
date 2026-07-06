import { Body, Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CancelOrderDto } from '../dto/cancel-order.dto';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { AuditLogsService } from '../../audit-logs/services/audit-logs.service';
import { AdminOrdersService } from '../services/admin-orders.service';

@ApiBearerAuth()
@ApiTags('Admin Orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/orders', version: '1' })
export class AdminOrdersController {
  constructor(private readonly orders: AdminOrdersService, private readonly auditLogs: AuditLogsService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.orders.list(query);
  }

  @Get(':orderId')
  get(@Param('orderId') orderId: string) {
    return this.orders.get(orderId);
  }

  @Patch(':orderId/status')
  async updateStatus(@Req() req: any, @Param('orderId') orderId: string, @Body() dto: UpdateOrderStatusDto) {
    const order = await this.orders.updateStatus(orderId, dto);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'ORDER_STATUS_UPDATED', entityType: 'Order', entityId: order.id, newValue: order });
    return { message: 'Order status updated successfully', data: order };
  }

  @Patch(':orderId/cancel')
  async cancel(@Req() req: any, @Param('orderId') orderId: string, @Body() dto: CancelOrderDto) {
    const order = await this.orders.cancel(orderId, dto);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'ORDER_CANCELLED', entityType: 'Order', entityId: order.id, newValue: order });
    return { message: 'Order cancelled successfully', data: order };
  }
}
