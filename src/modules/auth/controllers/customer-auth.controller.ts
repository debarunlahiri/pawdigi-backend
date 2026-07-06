import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';
import { RequestOtpDto } from '../dto/request-otp.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { CustomerAuthService } from '../services/customer-auth.service';

@ApiTags('Customer Auth')
@Controller({ path: 'customer/auth', version: '1' })
export class CustomerAuthController {
  constructor(private readonly auth: CustomerAuthService) {}

  @Throttle({ otp: { ttl: 600000, limit: 3 }, auth: { ttl: 60000, limit: 5 } })
  @Post('request-otp')
  requestOtp(@Body() dto: RequestOtpDto, @Req() req: Request) {
    return this.auth.requestOtp(dto, req);
  }

  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  @Post('verify-otp')
  verifyOtp(@Body() dto: VerifyOtpDto, @Req() req: Request) {
    return this.auth.verifyOtp(dto, req);
  }
}
