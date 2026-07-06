import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';

@Injectable()
export class SchedulerRunLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { schedulerName: { contains: query.search, mode: 'insensitive' } },
        { jobName: { contains: query.search, mode: 'insensitive' } },
        { errorMessage: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.fromDate || query.toDate) {
      where.startedAt = {};
      if (query.fromDate) where.startedAt.gte = new Date(query.fromDate);
      if (query.toDate) where.startedAt.lte = new Date(query.toDate);
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.schedulerRunLog.findMany({
        skip,
        take,
        where,
        orderBy: { startedAt: query.sortOrder || 'desc' },
      }),
      this.prisma.schedulerRunLog.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async get(id: string) {
    const log = await this.prisma.schedulerRunLog.findUnique({ where: { id } });
    if (!log) throw new NotFoundException('Scheduler log not found');
    return { message: 'Data fetched successfully', data: log };
  }
}
