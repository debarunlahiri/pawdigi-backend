import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Role, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { createUuidV7 } from '../../../common/utils/id.util';
import { PrismaService } from '../../../core/database/prisma.service';
import { AdminLoginDto } from '../dto/admin-login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { RefreshTokenService } from './refresh-token.service';
import { TokenService } from './token.service';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokens: TokenService,
    private readonly refreshTokens: RefreshTokenService,
  ) {}

  async login(dto: AdminLoginDto) {
    const user = await this.prisma.user.findFirst({ where: { email: dto.email, role: { in: [Role.ADMIN, Role.SUPER_ADMIN] }, deletedAt: null } });
    if (!user?.passwordHash || !(await bcrypt.compare(dto.password, user.passwordHash))) throw new UnauthorizedException('Invalid credentials');
    if (user.status !== UserStatus.ACTIVE) throw new ForbiddenException('User account is not active');
    return this.issue(user);
  }

  async refresh(dto: RefreshTokenDto) {
    const payload = await this.refreshTokens.verify(dto.refreshToken);
    await this.refreshTokens.revoke(payload.sessionId, payload.sub);
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: payload.sub } });
    return this.issue(user);
  }

  async me(userId: string) {
    return { data: await this.prisma.user.findUnique({ where: { id: userId }, include: { adminProfile: true } }) };
  }

  logout(userId: string, sessionId: string) {
    return this.refreshTokens.revoke(sessionId, userId).then(() => ({ message: 'Logged out', data: null }));
  }

  private async issue(user: { id: string; email: string | null; role: Role }) {
    const sessionId = createUuidV7();
    const payload = { sub: user.id, email: user.email, role: user.role, sessionId };
    const accessToken = await this.tokens.signAccess(payload);
    const refreshToken = await this.tokens.signRefresh(payload);
    await this.refreshTokens.create(user.id, sessionId, refreshToken);
    return { message: 'Login successful', data: { user, accessToken, refreshToken } };
  }
}
