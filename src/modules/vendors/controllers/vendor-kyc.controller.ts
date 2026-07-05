import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { VendorKycDto } from '../dto/vendor-kyc.dto';
import { VendorKycService } from '../services/vendor-kyc.service';

@ApiBearerAuth()
@ApiTags('Vendor KYC')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.VENDOR)
@Controller({ path: 'vendor/kyc', version: '1' })
export class VendorKycController {
  constructor(private readonly kyc: VendorKycService) {}

  @Post()
  submit(@Req() req: any, @Body() dto: VendorKycDto) {
    return this.kyc.submit(req.user.vendorId, dto);
  }
}
