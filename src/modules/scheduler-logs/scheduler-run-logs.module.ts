import { Module } from '@nestjs/common';
import { SchedulerRunLogsController } from './controllers/scheduler-run-logs.controller';
import { SchedulerRunLogsService } from './services/scheduler-run-logs.service';

@Module({ controllers: [SchedulerRunLogsController], providers: [SchedulerRunLogsService] })
export class SchedulerRunLogsModule {}
