import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AdminUpdatePetDto } from '../dto/admin-update-pet.dto';
import { AdminPetsService } from '../services/admin-pets.service';

@ApiBearerAuth()
@ApiTags('Admin Pets')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/pets', version: '1' })
export class AdminPetsController {
  constructor(private readonly pets: AdminPetsService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.pets.list(query);
  }

  @Get(':petId')
  get(@Param('petId') petId: string) {
    return this.pets.get(petId);
  }

  @Patch(':petId')
  update(@Param('petId') petId: string, @Body() dto: AdminUpdatePetDto) {
    return this.pets.update(petId, dto);
  }

  @Delete(':petId')
  remove(@Param('petId') petId: string) {
    return this.pets.remove(petId);
  }
}
