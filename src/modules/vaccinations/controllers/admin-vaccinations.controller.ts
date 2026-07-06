import { Body, Controller, Delete, Get, Param, Post, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AdminCreateVaccinationDto } from '../dto/admin-create-vaccination.dto';
import { UpdateVaccinationDto } from '../dto/update-vaccination.dto';
import { AdminVaccinationsService } from '../services/admin-vaccinations.service';

@ApiBearerAuth()
@ApiTags('Admin Vaccinations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/vaccinations', version: '1' })
export class AdminVaccinationsController {
  constructor(private readonly vaccinations: AdminVaccinationsService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.vaccinations.list(query);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.vaccinations.get(id);
  }

  @Post()
  create(@Body() dto: AdminCreateVaccinationDto) {
    return this.vaccinations.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVaccinationDto) {
    return this.vaccinations.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vaccinations.remove(id);
  }
}
