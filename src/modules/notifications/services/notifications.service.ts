import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { FirebaseNotificationService } from '../../../integrations/firebase/firebase-notification.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService, private readonly fcm: FirebaseNotificationService) {}
  async notifyUser(userId: string, title: string, body: string, data?: Record<string, string>) {
    const tokens = await this.prisma.deviceToken.findMany({ where: { userId } });
    await this.fcm.sendPush(tokens.map((token) => token.fcmToken), title, body, data);
    return this.prisma.notification.create({ data: { userId, title, body, data } });
  }

  list(userId: string) {
    return this.prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  markRead(userId: string, id: string) {
    return this.prisma.notification.update({ where: { id, userId }, data: { readAt: new Date() } });
  }

  markAllRead(userId: string) {
    return this.prisma.notification.updateMany({ where: { userId, readAt: null }, data: { readAt: new Date() } });
  }
}
