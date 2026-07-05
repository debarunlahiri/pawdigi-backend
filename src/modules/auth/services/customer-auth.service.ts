import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Role, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { Request } from 'express';
import { createUuidV7 } from '../../../common/utils/id.util';
import { PrismaService } from '../../../core/database/prisma.service';
import { SmsService } from '../../../integrations/sms/sms.service';
import { RequestOtpDto } from '../dto/request-otp.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { RefreshTokenService } from './refresh-token.service';
import { TokenService } from './token.service';

@Injectable()
export class CustomerAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sms: SmsService,
    private readonly tokens: TokenService,
    private readonly refreshTokens: RefreshTokenService,
  ) {}

  async requestOtp(dto: RequestOtpDto, req?: Request) {
    const otp = String(randomInt(100000, 999999));
    const expiresInMinutes = Number(process.env.OTP_EXPIRES_IN_MINUTES ?? 5);
    const maxAttempts = Number(process.env.OTP_MAX_ATTEMPTS ?? 5);
    const verification = await this.prisma.otpVerification.create({
      data: {
        phoneNumber: dto.phoneNumber,
        otpCode: otp,
        otpHash: await bcrypt.hash(otp, 12),
        maxAttempts,
        deviceId: dto.deviceId,
        requestIpAddress: req?.ip,
        userAgent: req?.headers['user-agent'],
        expiresAt: new Date(Date.now() + expiresInMinutes * 60 * 1000),
      },
    });

    try {
      const delivery = await this.sms.sendSms(dto.phoneNumber, `Your PawDigi verification code is ${otp}. It expires in ${expiresInMinutes} minutes.`);
      await this.prisma.otpVerification.update({
        where: { id: verification.id },
        data: {
          deliveryProvider: delivery.provider,
          deliveryStatus: delivery.status,
          deliveryMessage: delivery.providerMessageId,
          deliveredAt: new Date(),
        },
      });
    } catch (error) {
      await this.prisma.otpVerification.update({
        where: { id: verification.id },
        data: {
          deliveryStatus: 'FAILED',
          failedAt: new Date(),
          failureReason: error instanceof Error ? error.message : 'SMS delivery failed',
        },
      });
      throw error;
    }

    return { message: 'OTP sent successfully', data: { phoneNumber: dto.phoneNumber, deviceId: dto.deviceId, expiresInMinutes } };
  }

  async verifyOtp(dto: VerifyOtpDto, req?: Request) {
    const verification = await this.prisma.otpVerification.findFirst({
      where: { phoneNumber: dto.phoneNumber, verifiedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    });
    if (!verification) throw new UnauthorizedException('OTP expired or not found');
    if (verification.attempts >= verification.maxAttempts) {
      await this.prisma.otpVerification.update({
        where: { id: verification.id },
        data: {
          failedAt: new Date(),
          failureReason: 'OTP attempt limit exceeded',
          verifiedIpAddress: req?.ip,
          userAgent: req?.headers['user-agent'],
        },
      });
      throw new UnauthorizedException('OTP attempt limit exceeded');
    }

    const isValid = await bcrypt.compare(dto.otp, verification.otpHash);
    if (!isValid) {
      await this.prisma.otpVerification.update({
        where: { id: verification.id },
        data: {
          attempts: { increment: 1 },
          lastAttemptAt: new Date(),
          verifiedIpAddress: req?.ip,
          userAgent: req?.headers['user-agent'],
          failureReason: 'Invalid OTP',
        },
      });
      throw new UnauthorizedException('Invalid OTP');
    }

    const user = await this.prisma.user.upsert({
      where: { phoneNumber: dto.phoneNumber },
      update: { lastLoginAt: new Date(), status: UserStatus.ACTIVE },
      create: {
        phoneNumber: dto.phoneNumber,
        role: Role.CUSTOMER,
        status: UserStatus.ACTIVE,
        lastLoginAt: new Date(),
        customerProfile: { create: {} },
      },
      include: { customerProfile: true },
    });
    if (user.status !== UserStatus.ACTIVE) throw new BadRequestException('Customer account is not active');

    await this.prisma.otpVerification.update({
      where: { id: verification.id },
      data: {
        verifiedAt: new Date(),
        lastAttemptAt: new Date(),
        verifiedIpAddress: req?.ip,
        platform: dto.platform,
        userAgent: req?.headers['user-agent'],
        userId: user.id,
      },
    });

    if (dto.fcmToken) {
      await this.prisma.deviceToken.upsert({
        where: { userId_deviceId: { userId: user.id, deviceId: dto.deviceId } },
        update: { fcmToken: dto.fcmToken, platform: dto.platform },
        create: { userId: user.id, deviceId: dto.deviceId, fcmToken: dto.fcmToken, platform: dto.platform },
      });
    }

    const sessionId = createUuidV7();
    const payload = { sub: user.id, role: user.role, email: user.email, sessionId };
    const accessToken = await this.tokens.signAccess(payload);
    const refreshToken = await this.tokens.signRefresh(payload);
    await this.refreshTokens.create(user.id, sessionId, refreshToken);

    return { message: 'Customer authenticated', data: { customer: user, accessToken, refreshToken, session: { provider: 'twilio_otp' } } };
  }
}
