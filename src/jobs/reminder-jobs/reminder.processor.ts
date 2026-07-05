import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { RemindersService } from '../../modules/reminders/services/reminders.service';
import { NotificationsService } from '../../modules/notifications/services/notifications.service';
import { SchedulerLogsService } from '../scheduler-logs/scheduler-logs.service';

@Processor('daily-reminder-check')
export class ReminderProcessor extends WorkerHost {
  constructor(
    private readonly reminders: RemindersService,
    private readonly notifications: NotificationsService,
    private readonly schedulerLogs: SchedulerLogsService,
  ) {
    super();
  }

  async process(job: Job) {
    const run = await this.schedulerLogs.start({ schedulerName: 'daily-reminder-check', job });
    const now = new Date();
    try {
      const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const due = await this.reminders.dueBetween(now, sevenDays);
      let sent = 0;
      let skippedAlreadySent = 0;
      for (const reminder of due) {
        if (reminder.lastSentAt && reminder.lastSentAt.toDateString() === now.toDateString()) {
          skippedAlreadySent += 1;
          continue;
        }
        await this.notifications.notifyUser(reminder.userId, reminder.title, reminder.description ?? 'Reminder due soon', {
          reminderId: reminder.id,
          type: reminder.type,
        });
        await this.reminders.markSent(reminder.id);
        sent += 1;
      }
      const overdue = await this.reminders.overdue(now);
      for (const reminder of overdue) {
        await this.reminders.markOverdue(reminder.id);
      }
      const output = { due: due.length, sent, skippedAlreadySent, overdue: overdue.length };
      await this.schedulerLogs.success(run.id, run.startedAt, output, sent + overdue.length);
      return output;
    } catch (error) {
      await this.schedulerLogs.failed(run.id, run.startedAt, error);
      throw error;
    }
  }
}
