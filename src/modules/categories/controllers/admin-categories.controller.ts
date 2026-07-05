import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoriesService } from '../services/categories.service';

@ApiBearerAuth()
@ApiTags('Admin Categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/categories', version: '1' })
export class AdminCategoriesController {
  constructor(private readonly categories: CategoriesService) {}
  @Get()
  list() {
    return this.categories.adminList();
  }
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categories.create(dto);
  }
  @Patch(':categoryId')
  update(@Param('categoryId') categoryId: string, @Body() dto: UpdateCategoryDto) {
    return this.categories.update(categoryId, dto);
  }
  @Delete(':categoryId')
  remove(@Param('categoryId') categoryId: string) {
    return this.categories.remove(categoryId);
  }
}
