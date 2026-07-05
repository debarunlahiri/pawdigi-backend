import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Role, UserStatus, VendorStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { createUuidV7 } from '../../../common/utils/id.util';
import { PrismaService } from '../../../core/database/prisma.service';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { VendorLoginDto } from '../dto/vendor-login.dto';
import { VendorRegisterDto } from '../dto/vendor-register.dto';
import { RefreshTokenService } from './refresh-token.service';
import { TokenService } from './token.service';

@Injectable()
export class VendorAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokens: TokenService,
    private readonly refreshTokens: RefreshTokenService,
  ) {}

  async register(dto: VendorRegisterDto) {
    if (await this.prisma.user.findFirst({ where: { email: dto.email } })) throw new ConflictException('Email already registered');
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: await bcrypt.hash(dto.password, 12),
        role: Role.VENDOR,
        vendorProfile: { create: { businessName: dto.businessName, contactPerson: dto.contactPerson, email: dto.email, phoneNumber: dto.phoneNumber } },
      },
      include: { vendorProfile: true },
    });
    return { message: 'Vendor registered and pending approval', data: { user } };
  }

  async login(dto: VendorLoginDto) {
    const user = await this.prisma.user.findFirst({ where: { email: dto.email, role: Role.VENDOR, deletedAt: null }, include: { vendorProfile: true } });
    if (!user?.passwordHash || !(await bcrypt.compare(dto.password, user.passwordHash))) throw new UnauthorizedException('Invalid credentials');
    if (user.status !== UserStatus.ACTIVE) throw new ForbiddenException('User account is not active');
    if (user.vendorProfile?.status !== VendorStatus.APPROVED) throw new ForbiddenException('Vendor account is not approved');
    return this.issue(user);
  }

  async refresh(dto: RefreshTokenDto) {
    const payload = await this.refreshTokens.verify(dto.refreshToken);
    await this.refreshTokens.revoke(payload.sessionId, payload.sub);
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: payload.sub }, include: { vendorProfile: true } });
    return this.issue(user);
  }

  async me(userId: string) {
    return { data: await this.prisma.user.findUnique({ where: { id: userId }, include: { vendorProfile: true } }) };
  }

  logout(userId: string, sessionId: string) {
    return this.refreshTokens.revoke(sessionId, userId).then(() => ({ message: 'Logged out', data: null }));
  }

  private async issue(user: { id: string; email: string | null; role: Role; vendorProfile?: { id: string } | null }) {
    const sessionId = createUuidV7();
    const payload = { sub: user.id, email: user.email, role: user.role, vendorId: user.vendorProfile?.id, sessionId };
    const accessToken = await this.tokens.signAccess(payload);
    const refreshToken = await this.tokens.signRefresh(payload);
    await this.refreshTokens.create(user.id, sessionId, refreshToken);
    return { message: 'Login successful', data: { user, accessToken, refreshToken } };
  }
}
