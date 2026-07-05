import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { NotificationsService } from '../services/notifications.service';

@ApiBearerAuth()
@ApiTags('Notifications')
@UseGuards(CustomerAuthGuard)
@Controller({ path: 'notifications', version: '1' })
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}
  @Get()
  list(@Req() req: any) {
    return this.notifications.list(req.user.id);
  }
  @Patch(':id/read')
  read(@Req() req: any, @Param('id') id: string) {
    return this.notifications.markRead(req.user.id, id);
  }
  @Patch('read-all')
  readAll(@Req() req: any) {
    return this.notifications.markAllRead(req.user.id);
  }
}
