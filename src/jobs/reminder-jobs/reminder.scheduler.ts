import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { SchedulerLogsService } from '../scheduler-logs/scheduler-logs.service';

@Injectable()
export class ReminderScheduler implements OnModuleInit {
  constructor(
    @InjectQueue('daily-reminder-check') private readonly queue: Queue,
    private readonly schedulerLogs: SchedulerLogsService,
  ) {}

  async onModuleInit() {
    const run = await this.schedulerLogs.start({
      schedulerName: 'daily-reminder-check-registration',
      queueName: 'daily-reminder-check',
      triggerType: 'STARTUP',
      input: { repeatPattern: '0 8 * * *', jobId: 'daily-reminder-check' },
    });
    try {
      const job = await this.queue.add('daily-reminder-check', {}, { repeat: { pattern: '0 8 * * *' }, jobId: 'daily-reminder-check' });
      await this.schedulerLogs.success(run.id, run.startedAt, { bullJobId: job.id, repeatJobKey: job.repeatJobKey }, 1);
    } catch (error) {
      await this.schedulerLogs.failed(run.id, run.startedAt, error);
      throw error;
    }
  }
}
