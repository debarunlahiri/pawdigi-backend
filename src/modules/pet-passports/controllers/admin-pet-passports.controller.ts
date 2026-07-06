import { Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AdminPetPassportsService } from '../services/admin-pet-passports.service';

@ApiBearerAuth()
@ApiTags('Admin Pet Passports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/pet-passports', version: '1' })
export class AdminPetPassportsController {
  constructor(private readonly passports: AdminPetPassportsService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.passports.list(query);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.passports.get(id);
  }

  @Post(':petId/generate')
  generate(@Param('petId') petId: string) {
    return this.passports.generate(petId);
  }

  @Patch(':id/revoke')
  revoke(@Param('id') id: string) {
    return this.passports.revoke(id);
  }
}
