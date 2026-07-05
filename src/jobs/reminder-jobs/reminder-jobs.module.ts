import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { NotificationsModule } from '../../modules/notifications/notifications.module';
import { RemindersModule } from '../../modules/reminders/reminders.module';
import { ReminderProcessor } from './reminder.processor';
import { ReminderScheduler } from './reminder.scheduler';

@Module({
  imports: [BullModule.registerQueue({ name: 'daily-reminder-check' }), RemindersModule, NotificationsModule],
  providers: [ReminderProcessor, ReminderScheduler],
})
export class ReminderJobsModule {}
