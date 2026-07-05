import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../core/database/prisma.service';
import { SchedulerLogsService } from '../scheduler-logs/scheduler-logs.service';

@Processor('passport-cleanup')
export class PassportCleanupProcessor extends WorkerHost {
  constructor(
    private readonly prisma: PrismaService,
    private readonly schedulerLogs: SchedulerLogsService,
  ) {
    super();
  }

  async process(job: Job) {
    const run = await this.schedulerLogs.start({ schedulerName: 'passport-cleanup', job });
    try {
      const result = await this.prisma.petPassport.updateMany({
        where: { shareExpires: { lt: new Date() }, shareRevoked: false },
        data: { shareRevoked: true },
      });
      await this.schedulerLogs.success(run.id, run.startedAt, { revokedShares: result.count }, result.count);
      return result;
    } catch (error) {
      await this.schedulerLogs.failed(run.id, run.startedAt, error);
      throw error;
    }
  }
}
