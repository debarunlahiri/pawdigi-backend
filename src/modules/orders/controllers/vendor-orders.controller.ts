import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { VendorApprovedGuard } from '../../../common/guards/vendor-approved.guard';
import { UpdateOrderStatusDto } from '../dto/update-order-status.dto';
import { VendorOrdersService } from '../services/vendor-orders.service';

@ApiBearerAuth()
@ApiTags('Vendor Orders')
@UseGuards(JwtAuthGuard, RolesGuard, VendorApprovedGuard)
@Roles(Role.VENDOR)
@Controller({ path: 'vendor/orders', version: '1' })
export class VendorOrdersController {
  constructor(private readonly orders: VendorOrdersService) {}

  @Get()
  list(@Req() req: any) {
    return this.orders.list(req.user.vendorId);
  }

  @Patch(':orderId/status')
  updateStatus(@Req() req: any, @Param('orderId') orderId: string, @Body() dto: UpdateOrderStatusDto) {
    return this.orders.updateStatus(req.user.vendorId, orderId, dto);
  }
}
