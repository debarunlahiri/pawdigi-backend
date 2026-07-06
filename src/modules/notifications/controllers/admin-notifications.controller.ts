import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AdminSendNotificationDto } from '../dto/admin-send-notification.dto';
import { AdminNotificationsService } from '../services/admin-notifications.service';

@ApiBearerAuth()
@ApiTags('Admin Notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/notifications', version: '1' })
export class AdminNotificationsController {
  constructor(private readonly notifications: AdminNotificationsService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.notifications.list(query);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.notifications.get(id);
  }

  @Post()
  send(@Body() dto: AdminSendNotificationDto) {
    return this.notifications.send(dto);
  }

  @Post(':id/retry')
  retry(@Param('id') id: string) {
    return this.notifications.retry(id);
  }
}
