import { Module } from '@nestjs/common';
import { DevicesController } from './controllers/devices.controller';
import { NotificationsController } from './controllers/notifications.controller';
import { DeviceTokensService } from './services/device-tokens.service';
import { NotificationsService } from './services/notifications.service';

@Module({ controllers: [NotificationsController, DevicesController], providers: [NotificationsService, DeviceTokensService], exports: [NotificationsService, DeviceTokensService] })
export class NotificationsModule {}
