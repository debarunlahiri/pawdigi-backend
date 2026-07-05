import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UpdateVendorProfileDto } from '../dto/update-vendor-profile.dto';
import { VendorsService } from '../services/vendors.service';

@ApiBearerAuth()
@ApiTags('Vendor Profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.VENDOR)
@Controller({ path: 'vendor/profile', version: '1' })
export class VendorProfileController {
  constructor(private readonly vendors: VendorsService) {}

  @Get()
  profile(@Req() req: any) {
    return this.vendors.profile(req.user.vendorId);
  }

  @Patch()
  update(@Req() req: any, @Body() dto: UpdateVendorProfileDto) {
    return this.vendors.update(req.user.vendorId, dto);
  }

}
