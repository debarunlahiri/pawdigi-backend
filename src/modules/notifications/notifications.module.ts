import { Module } from '@nestjs/common';
import { AdminNotificationsController } from './controllers/admin-notifications.controller';
import { DevicesController } from './controllers/devices.controller';
import { NotificationsController } from './controllers/notifications.controller';
import { AdminNotificationsService } from './services/admin-notifications.service';
import { DeviceTokensService } from './services/device-tokens.service';
import { NotificationsService } from './services/notifications.service';

@Module({
  controllers: [NotificationsController, DevicesController, AdminNotificationsController],
  providers: [NotificationsService, DeviceTokensService, AdminNotificationsService],
  exports: [NotificationsService, DeviceTokensService],
})
export class NotificationsModule {}
