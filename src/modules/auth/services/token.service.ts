import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService, private readonly config: ConfigService) {}

  signAccess(payload: { sub: string; role: Role; email?: string | null; vendorId?: string; sessionId: string }) {
    return this.jwt.signAsync(payload, {
      secret: this.config.get<string>('jwt.accessSecret'),
      expiresIn: this.config.get<string>('jwt.accessExpiresIn'),
    });
  }

  signRefresh(payload: { sub: string; role: Role; email?: string | null; vendorId?: string; sessionId: string }) {
    return this.jwt.signAsync(payload, {
      secret: this.config.get<string>('jwt.refreshSecret'),
      expiresIn: this.config.get<string>('jwt.refreshExpiresIn'),
    });
  }
}
