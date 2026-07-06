import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { actorUserId?: string; actorRole?: Role; action: string; entityType: string; entityId?: string; oldValue?: Prisma.InputJsonValue; newValue?: Prisma.InputJsonValue; ipAddress?: string; userAgent?: string }) {
    return this.prisma.auditLog.create({ data });
  }

  async list(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = {};
    if (query.status) where.action = { contains: query.status, mode: 'insensitive' };
    if (query.search) {
      where.OR = [
        { action: { contains: query.search, mode: 'insensitive' } },
        { entityType: { contains: query.search, mode: 'insensitive' } },
        { entityId: { contains: query.search } },
      ];
    }
    if (query.fromDate || query.toDate) {
      where.createdAt = {};
      if (query.fromDate) where.createdAt.gte = new Date(query.fromDate);
      if (query.toDate) where.createdAt.lte = new Date(query.toDate);
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.auditLog.findMany({
        skip,
        take,
        where,
        include: { actor: { include: { customerProfile: true } } },
        orderBy: { createdAt: query.sortOrder || 'desc' },
      }),
      this.prisma.auditLog.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async get(id: string) {
    const log = await this.prisma.auditLog.findUnique({
      where: { id },
      include: { actor: { include: { customerProfile: true } } },
    });
    if (!log) throw new NotFoundException('Audit log not found');
    return { message: 'Data fetched successfully', data: log };
  }
}
