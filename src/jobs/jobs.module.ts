import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationJobsModule } from './notification-jobs/notification-jobs.module';
import { PassportJobsModule } from './passport-jobs/passport-jobs.module';
import { ReminderJobsModule } from './reminder-jobs/reminder-jobs.module';
import { SchedulerLogsModule } from './scheduler-logs/scheduler-logs.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('redis.host'),
          port: config.get<number>('redis.port'),
          password: config.get<string>('redis.password'),
        },
      }),
    }),
    SchedulerLogsModule,
    ReminderJobsModule,
    PassportJobsModule,
    NotificationJobsModule,
  ],
})
export class JobsModule {}
