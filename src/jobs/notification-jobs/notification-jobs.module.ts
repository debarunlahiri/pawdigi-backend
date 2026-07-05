import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { NotificationsModule } from '../../modules/notifications/notifications.module';
import { NotificationProcessor } from './notification.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'notifications' }), NotificationsModule],
  providers: [NotificationProcessor],
})
export class NotificationJobsModule {}
