import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('jwt.accessSecret'),
    });
  }

  async validate(payload: { sub: string; role: string; email?: string; vendorId?: string; sessionId: string }) {
    const user = await this.prisma.user.findFirst({ where: { id: payload.sub, deletedAt: null } });
    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User is not active');
    }
    return { id: user.id, role: user.role, email: user.email, vendorId: payload.vendorId, sessionId: payload.sessionId };
  }
}
