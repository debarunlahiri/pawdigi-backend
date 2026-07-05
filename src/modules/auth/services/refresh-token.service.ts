import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async create(userId: string, sessionId: string, refreshToken: string) {
    return this.prisma.refreshToken.create({
      data: {
        id: sessionId,
        userId,
        tokenHash: await bcrypt.hash(refreshToken, 12),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async verify(refreshToken: string) {
    const payload = await this.jwt.verifyAsync<{ sub: string; sessionId: string }>(refreshToken, {
      secret: this.config.get<string>('jwt.refreshSecret'),
    });
    const session = await this.prisma.refreshToken.findFirst({
      where: { id: payload.sessionId, userId: payload.sub, revokedAt: null },
    });
    if (!session || !(await bcrypt.compare(refreshToken, session.tokenHash))) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return payload;
  }

  revoke(sessionId: string, userId: string) {
    return this.prisma.refreshToken.updateMany({ where: { id: sessionId, userId }, data: { revokedAt: new Date() } });
  }
}
