import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';
import { AdminSendNotificationDto } from '../dto/admin-send-notification.dto';
import { NotificationsService } from './notifications.service';

@Injectable()
export class AdminNotificationsService {
  constructor(private readonly prisma: PrismaService, private readonly notifications: NotificationsService) {}

  async list(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { body: { contains: query.search, mode: 'insensitive' } },
        { user: { phoneNumber: { contains: query.search } } },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.notification.findMany({
        skip,
        take,
        where,
        include: { user: { include: { customerProfile: true } } },
        orderBy: { createdAt: query.sortOrder || 'desc' },
      }),
      this.prisma.notification.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async get(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
      include: { user: { include: { customerProfile: true } } },
    });
    if (!notification) throw new NotFoundException('Notification not found');
    return { message: 'Data fetched successfully', data: notification };
  }

  async send(dto: AdminSendNotificationDto) {
    const data = dto.data ? JSON.parse(dto.data) : undefined;
    if (dto.userId) {
      const notification = await this.notifications.notifyUser(dto.userId, dto.title, dto.body, data);
      return { message: 'Notification sent successfully', data: notification };
    }

    const roleMap: Record<string, Role> = {
      CUSTOMER: Role.CUSTOMER,
      VENDOR: Role.VENDOR,
      ADMIN: Role.ADMIN,
    };

    const where: any = {};
    if (dto.target && dto.target !== 'ALL') where.role = roleMap[dto.target];
    const users = await this.prisma.user.findMany({ where, select: { id: true } });
    const results = [];
    for (const user of users) {
      try {
        const notification = await this.notifications.notifyUser(user.id, dto.title, dto.body, data);
        results.push(notification);
      } catch (error) {
        results.push({ error: error instanceof Error ? error.message : 'Failed', userId: user.id });
      }
    }
    return { message: `Notifications sent to ${results.length} users`, data: results };
  }

  async retry(id: string) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found');
    const data = notification.data ? (notification.data as Record<string, string>) : undefined;
    const retried = await this.notifications.notifyUser(notification.userId, notification.title, notification.body, data);
    return { message: 'Notification retried successfully', data: retried };
  }
}
