import { SchedulerRunStatus } from '@prisma/client';
import { SchedulerLogsService } from './scheduler-logs.service';

describe('SchedulerLogsService', () => {
  const prisma = {
    schedulerRunLog: {
      create: jest.fn(),
      update: jest.fn(),
    },
  };
  const service = new SchedulerLogsService(prisma as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a started scheduler run log', async () => {
    prisma.schedulerRunLog.create.mockResolvedValue({ id: 'run-id', startedAt: new Date('2026-07-05T10:00:00.000Z') });

    await service.start({
      schedulerName: 'daily-reminder-check',
      queueName: 'daily-reminder-check',
      triggerType: 'REPEAT',
      input: { windowDays: 7 },
    });

    expect(prisma.schedulerRunLog.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        schedulerName: 'daily-reminder-check',
        queueName: 'daily-reminder-check',
        triggerType: 'REPEAT',
        input: { windowDays: 7 },
        status: SchedulerRunStatus.STARTED,
      }),
    });
  });

  it('marks a run successful with duration and output details', async () => {
    const startedAt = new Date(Date.now() - 25);

    await service.success('run-id', startedAt, { due: 3, sent: 2 }, 2);

    expect(prisma.schedulerRunLog.update).toHaveBeenCalledWith({
      where: { id: 'run-id' },
      data: expect.objectContaining({
        status: SchedulerRunStatus.SUCCESS,
        output: { due: 3, sent: 2 },
        itemsProcessed: 2,
        durationMs: expect.any(Number),
        finishedAt: expect.any(Date),
      }),
    });
  });

  it('marks a run failed with error details', async () => {
    const error = new Error('Redis unavailable');

    await service.failed('run-id', new Date(), error);

    expect(prisma.schedulerRunLog.update).toHaveBeenCalledWith({
      where: { id: 'run-id' },
      data: expect.objectContaining({
        status: SchedulerRunStatus.FAILED,
        errorName: 'Error',
        errorMessage: 'Redis unavailable',
        errorStack: expect.any(String),
      }),
    });
  });
});
