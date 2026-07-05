import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationsService } from '../../modules/notifications/services/notifications.service';
import { SchedulerLogsService } from '../scheduler-logs/scheduler-logs.service';

@Processor('notifications')
export class NotificationProcessor extends WorkerHost {
  constructor(
    private readonly notifications: NotificationsService,
    private readonly schedulerLogs: SchedulerLogsService,
  ) {
    super();
  }

  async process(job: Job<{ userId: string; title: string; body: string; data?: Record<string, string> }>) {
    const run = await this.schedulerLogs.start({ schedulerName: 'notifications', job });
    try {
      const result = await this.notifications.notifyUser(job.data.userId, job.data.title, job.data.body, job.data.data);
      await this.schedulerLogs.success(run.id, run.startedAt, { notificationId: result.id }, 1);
      return result;
    } catch (error) {
      await this.schedulerLogs.failed(run.id, run.startedAt, error);
      throw error;
    }
  }
}
