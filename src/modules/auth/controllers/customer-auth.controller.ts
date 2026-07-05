import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RequestOtpDto } from '../dto/request-otp.dto';
import { VerifyOtpDto } from '../dto/verify-otp.dto';
import { CustomerAuthService } from '../services/customer-auth.service';

@ApiTags('Customer Auth')
@Controller({ path: 'customer/auth', version: '1' })
export class CustomerAuthController {
  constructor(private readonly auth: CustomerAuthService) {}

  @Post('request-otp')
  requestOtp(@Body() dto: RequestOtpDto, @Req() req: Request) {
    return this.auth.requestOtp(dto, req);
  }

  @Post('verify-otp')
  verifyOtp(@Body() dto: VerifyOtpDto, @Req() req: Request) {
    return this.auth.verifyOtp(dto, req);
  }
}
