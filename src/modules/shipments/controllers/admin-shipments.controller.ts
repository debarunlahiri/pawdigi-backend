import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { UpdateShipmentStatusDto } from '../dto/update-shipment-status.dto';
import { AuditLogsService } from '../../audit-logs/services/audit-logs.service';
import { ShipmentsService } from '../services/shipments.service';

@ApiBearerAuth()
@ApiTags('Admin Shipments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/shipments', version: '1' })
export class AdminShipmentsController {
  constructor(private readonly shipments: ShipmentsService, private readonly auditLogs: AuditLogsService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.shipments.adminList(query);
  }

  @Get(':shipmentId')
  get(@Param('shipmentId') shipmentId: string) {
    return this.shipments.adminGet(shipmentId);
  }

  @Post()
  async create(@Req() req: any, @Body() dto: CreateShipmentDto) {
    const shipment = await this.shipments.create(dto);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'SHIPMENT_CREATED', entityType: 'Shipment', entityId: shipment.id, newValue: shipment });
    return shipment;
  }

  @Patch(':shipmentId')
  async update(@Req() req: any, @Param('shipmentId') shipmentId: string, @Body() dto: UpdateShipmentStatusDto) {
    const shipment = await this.shipments.adminUpdate(shipmentId, dto);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'SHIPMENT_UPDATED', entityType: 'Shipment', entityId: shipment.id, newValue: shipment });
    return { message: 'Shipment updated successfully', data: shipment };
  }
}
