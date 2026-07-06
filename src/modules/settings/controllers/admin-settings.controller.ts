import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UpdateRateLimitsDto } from '../dto/update-rate-limits.dto';
import { AdminSettingsService } from '../services/admin-settings.service';

@ApiBearerAuth()
@ApiTags('Admin Settings')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
@Controller({ path: 'admin/settings', version: '1' })
export class AdminSettingsController {
  constructor(private readonly settings: AdminSettingsService) {}

  @Get()
  list() {
    return this.settings.list();
  }

  @Patch('rate-limits')
  updateRateLimits(@Body() dto: UpdateRateLimitsDto) {
    return this.settings.updateRateLimits(dto);
  }
}
