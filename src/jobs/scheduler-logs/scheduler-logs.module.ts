import { Global, Module } from '@nestjs/common';
import { SchedulerLogsService } from './scheduler-logs.service';

@Global()
@Module({ providers: [SchedulerLogsService], exports: [SchedulerLogsService] })
export class SchedulerLogsModule {}
