import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { CreatePetDto } from '../dto/create-pet.dto';
import { UpdatePetDto } from '../dto/update-pet.dto';
import { PetsService } from '../services/pets.service';

@ApiBearerAuth()
@ApiTags('Pets')
@UseGuards(CustomerAuthGuard)
@Controller({ path: 'pets', version: '1' })
export class PetsController {
  constructor(private readonly pets: PetsService) {}

  @Get()
  list(@Req() req: any, @Query() query: PaginationQueryDto) {
    return this.pets.list(req.user.id, query);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreatePetDto) {
    return this.pets.create(req.user.id, dto);
  }

  @Get(':petId')
  get(@Req() req: any, @Param('petId') petId: string) {
    return this.pets.get(petId, req.user.id);
  }

  @Patch(':petId')
  update(@Req() req: any, @Param('petId') petId: string, @Body() dto: UpdatePetDto) {
    return this.pets.update(petId, req.user.id, dto);
  }

  @Delete(':petId')
  remove(@Req() req: any, @Param('petId') petId: string) {
    return this.pets.remove(petId, req.user.id);
  }
}
