import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { AdminsService } from '../services/admins.service';

@ApiBearerAuth()
@ApiTags('Admins')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
@Controller({ path: 'admin/admins', version: '1' })
export class AdminsController {
  constructor(private readonly admins: AdminsService) {}
  @Get()
  list() {
    return this.admins.list();
  }
  @Post()
  create(@Body() dto: CreateAdminDto) {
    return this.admins.create(dto);
  }
  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() dto: UpdateAdminDto) {
    return this.admins.update(userId, dto);
  }
}
