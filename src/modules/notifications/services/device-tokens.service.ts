import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { RegisterDeviceDto } from '../dto/register-device.dto';

@Injectable()
export class DeviceTokensService {
  constructor(private readonly prisma: PrismaService) {}

  register(userId: string, dto: RegisterDeviceDto) {
    return this.prisma.deviceToken.upsert({
      where: { userId_deviceId: { userId, deviceId: dto.deviceId } },
      update: { fcmToken: dto.fcmToken, platform: dto.platform, isActive: true, revokedAt: null, lastSeenAt: new Date() },
      create: { userId, deviceId: dto.deviceId, fcmToken: dto.fcmToken, platform: dto.platform, isActive: true, lastSeenAt: new Date() },
    });
  }

  unregister(userId: string, deviceId: string) {
    return this.prisma.deviceToken.updateMany({ where: { userId, deviceId }, data: { isActive: false, revokedAt: new Date(), revocationReason: 'USER_UNREGISTERED' } });
  }
}
