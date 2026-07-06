import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UpdateRateLimitsDto } from '../dto/update-rate-limits.dto';

@Injectable()
export class AdminSettingsService {
  constructor(private readonly config: ConfigService) {}

  list() {
    return {
      data: {
        nodeEnv: this.config.get('NODE_ENV'),
        port: this.config.get('PORT'),
        apiPrefix: this.config.get('API_PREFIX'),
        rateLimits: {
          globalPerMinute: this.config.get<number>('GLOBAL_RATE_LIMIT_PER_MINUTE'),
          authPerMinute: this.config.get<number>('AUTH_RATE_LIMIT_PER_MINUTE'),
          otpPer10Minutes: this.config.get<number>('OTP_RATE_LIMIT_PER_10_MINUTES'),
        },
        origins: {
          adminPanel: this.config.get('ADMIN_PANEL_ORIGIN'),
          vendorPanel: this.config.get('VENDOR_PANEL_ORIGIN'),
          cors: this.config.get('CORS_ORIGINS'),
        },
      },
    };
  }

  updateRateLimits(dto: UpdateRateLimitsDto) {
    if (dto.globalPerMinute !== undefined) process.env.GLOBAL_RATE_LIMIT_PER_MINUTE = String(dto.globalPerMinute);
    if (dto.authPerMinute !== undefined) process.env.AUTH_RATE_LIMIT_PER_MINUTE = String(dto.authPerMinute);
    if (dto.otpPer10Minutes !== undefined) process.env.OTP_RATE_LIMIT_PER_10_MINUTES = String(dto.otpPer10Minutes);
    return this.list();
  }
}
