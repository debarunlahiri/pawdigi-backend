import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class CustomerAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) throw new UnauthorizedException('Customer bearer token is required');
    const payload = await this.jwt.verifyAsync<{ sub: string; role: Role; sessionId: string }>(token, {
      secret: this.config.get<string>('jwt.accessSecret'),
    });
    if (payload.role !== Role.CUSTOMER && payload.role !== Role.GUARDIAN) {
      throw new UnauthorizedException('Customer token is required');
    }
    const user = await this.prisma.user.findFirst({ where: { id: payload.sub, deletedAt: null } });
    if (!user || user.status !== 'ACTIVE') throw new UnauthorizedException('Customer is not active');
    request.user = { id: user.id, role: user.role, email: user.email, phoneNumber: user.phoneNumber, sessionId: payload.sessionId };
    return true;
  }
}
