import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { VendorApprovedGuard } from '../../../common/guards/vendor-approved.guard';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { UpdateShipmentStatusDto } from '../dto/update-shipment-status.dto';
import { ShipmentsService } from '../services/shipments.service';

@ApiBearerAuth()
@ApiTags('Vendor Shipments')
@UseGuards(JwtAuthGuard, RolesGuard, VendorApprovedGuard)
@Roles(Role.VENDOR)
@Controller({ path: 'vendor/shipments', version: '1' })
export class VendorShipmentsController {
  constructor(private readonly shipments: ShipmentsService) {}
  @Post()
  create(@Body() dto: CreateShipmentDto) {
    return this.shipments.create(dto);
  }
  @Patch(':orderId/status')
  update(@Param('orderId') orderId: string, @Body() dto: UpdateShipmentStatusDto) {
    return this.shipments.update(orderId, dto);
  }
}
