import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: { actorUserId?: string; actorRole?: Role; action: string; entityType: string; entityId?: string; oldValue?: Prisma.InputJsonValue; newValue?: Prisma.InputJsonValue; ipAddress?: string; userAgent?: string }) {
    return this.prisma.auditLog.create({ data });
  }

  list() {
    return this.prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
