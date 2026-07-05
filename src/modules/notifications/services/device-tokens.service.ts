import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { RegisterDeviceDto } from '../dto/register-device.dto';

@Injectable()
export class DeviceTokensService {
  constructor(private readonly prisma: PrismaService) {}

  register(userId: string, dto: RegisterDeviceDto) {
    return this.prisma.deviceToken.upsert({
      where: { userId_deviceId: { userId, deviceId: dto.deviceId } },
      update: { fcmToken: dto.fcmToken, platform: dto.platform },
      create: { userId, deviceId: dto.deviceId, fcmToken: dto.fcmToken, platform: dto.platform },
    });
  }

  unregister(userId: string, deviceId: string) {
    return this.prisma.deviceToken.deleteMany({ where: { userId, deviceId } });
  }
}
