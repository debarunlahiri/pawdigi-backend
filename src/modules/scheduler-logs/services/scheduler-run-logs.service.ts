import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class SchedulerRunLogsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.schedulerRunLog.findMany({
      orderBy: { startedAt: 'desc' },
      take: 500,
    });
  }

  get(id: string) {
    return this.prisma.schedulerRunLog.findUniqueOrThrow({ where: { id } });
  }
}
