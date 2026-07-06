import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { VendorApprovedGuard } from '../../../common/guards/vendor-approved.guard';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { VendorLoginDto } from '../dto/vendor-login.dto';
import { VendorRegisterDto } from '../dto/vendor-register.dto';
import { VendorAuthService } from '../services/vendor-auth.service';

@ApiTags('Vendor Auth')
@Controller({ path: 'vendor/auth', version: '1' })
export class VendorAuthController {
  constructor(private readonly auth: VendorAuthService) {}

  @Throttle({ auth: { ttl: 60000, limit: 3 } })
  @Post('register')
  register(@Body() dto: VendorRegisterDto) {
    return this.auth.register(dto);
  }

  @Throttle({ auth: { ttl: 60000, limit: 5 } })
  @Post('login')
  login(@Body() dto: VendorLoginDto) {
    return this.auth.login(dto);
  }

  @Throttle({ auth: { ttl: 60000, limit: 10 } })
  @Post('refresh-token')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.auth.refresh(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.VENDOR)
  @Post('logout')
  logout(@Req() req: any) {
    return this.auth.logout(req.user.id, req.user.sessionId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard, VendorApprovedGuard)
  @Roles(Role.VENDOR)
  @Get('me')
  me(@Req() req: any) {
    return this.auth.me(req.user.id);
  }
}
