import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class AdminCustomersService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.customerProfile.findMany({ include: { user: true }, orderBy: { createdAt: 'desc' } });
  }

  get(userId: string) {
    return this.prisma.customerProfile.findUnique({ where: { userId }, include: { user: true } });
  }
}
