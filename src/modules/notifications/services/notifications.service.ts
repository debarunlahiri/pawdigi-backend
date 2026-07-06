import { Injectable } from '@nestjs/common';
import { NotificationStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { FirebaseNotificationService } from '../../../integrations/firebase/firebase-notification.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService, private readonly fcm: FirebaseNotificationService) {}
  async notifyUser(userId: string, title: string, body: string, data?: Record<string, string>) {
    const tokens = await this.prisma.deviceToken.findMany({ where: { userId, isActive: true } });
    const notification = await this.prisma.notification.create({ data: { userId, title, body, data, status: NotificationStatus.QUEUED } });
    try {
      await this.fcm.sendPush(tokens.map((token) => token.fcmToken), title, body, data);
      return this.prisma.notification.update({ where: { id: notification.id }, data: { status: NotificationStatus.SENT, sentAt: new Date(), provider: 'FCM' } });
    } catch (error) {
      return this.prisma.notification.update({
        where: { id: notification.id },
        data: { status: NotificationStatus.FAILED, failureReason: error instanceof Error ? error.message : 'Push notification failed' },
      });
    }
  }

  list(userId: string) {
    return this.prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  }

  markRead(userId: string, id: string) {
    return this.prisma.notification.update({ where: { id, userId }, data: { status: NotificationStatus.READ, readAt: new Date() } });
  }

  markAllRead(userId: string) {
    return this.prisma.notification.updateMany({ where: { userId, readAt: null }, data: { status: NotificationStatus.READ, readAt: new Date() } });
  }
}
