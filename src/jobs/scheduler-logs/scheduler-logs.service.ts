import { Injectable } from '@nestjs/common';
import { Prisma, SchedulerRunStatus } from '@prisma/client';
import { Job } from 'bullmq';
import { PrismaService } from '../../core/database/prisma.service';

type SchedulerRunInput = {
  schedulerName: string;
  queueName?: string;
  job?: Job;
  triggerType?: string;
  input?: Prisma.InputJsonValue;
};

@Injectable()
export class SchedulerLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async start(data: SchedulerRunInput) {
    const startedAt = new Date();
    return this.prisma.schedulerRunLog.create({
      data: {
        schedulerName: data.schedulerName,
        queueName: data.queueName ?? data.job?.queueName,
        jobName: data.job?.name,
        bullJobId: data.job?.id,
        repeatJobKey: data.job?.repeatJobKey,
        triggerType: data.triggerType ?? (data.job?.opts.repeat ? 'REPEAT' : 'QUEUE'),
        attempt: data.job ? data.job.attemptsMade + 1 : undefined,
        maxAttempts: data.job?.opts.attempts,
        input: data.input ?? (data.job?.data as Prisma.InputJsonValue),
        status: SchedulerRunStatus.STARTED,
        startedAt,
      },
    });
  }

  async success(id: string, startedAt: Date, output?: Prisma.InputJsonValue, itemsProcessed?: number) {
    const finishedAt = new Date();
    return this.prisma.schedulerRunLog.update({
      where: { id },
      data: {
        status: SchedulerRunStatus.SUCCESS,
        output,
        itemsProcessed,
        finishedAt,
        durationMs: finishedAt.getTime() - startedAt.getTime(),
      },
    });
  }

  async skipped(id: string, startedAt: Date, reason: string) {
    const finishedAt = new Date();
    return this.prisma.schedulerRunLog.update({
      where: { id },
      data: {
        status: SchedulerRunStatus.SKIPPED,
        output: { reason },
        finishedAt,
        durationMs: finishedAt.getTime() - startedAt.getTime(),
      },
    });
  }

  async failed(id: string, startedAt: Date, error: unknown) {
    const finishedAt = new Date();
    const normalized = error instanceof Error ? error : new Error(String(error));
    return this.prisma.schedulerRunLog.update({
      where: { id },
      data: {
        status: SchedulerRunStatus.FAILED,
        finishedAt,
        durationMs: finishedAt.getTime() - startedAt.getTime(),
        errorName: normalized.name,
        errorMessage: normalized.message,
        errorStack: normalized.stack,
      },
    });
  }
}
