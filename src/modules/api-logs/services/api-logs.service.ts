import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class ApiLogsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.apiRequestLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 500,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            phoneNumber: true,
            role: true,
            status: true,
          },
        },
      },
    });
  }
}
