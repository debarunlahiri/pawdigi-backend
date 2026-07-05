import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { CreateVaccinationDto } from '../dto/create-vaccination.dto';
import { UpdateVaccinationDto } from '../dto/update-vaccination.dto';
import { VaccinationsService } from '../services/vaccinations.service';

@ApiBearerAuth()
@ApiTags('Vaccinations')
@UseGuards(CustomerAuthGuard)
@Controller({ version: '1' })
export class VaccinationsController {
  constructor(private readonly vaccinations: VaccinationsService) {}

  @Get('pets/:petId/vaccinations')
  list(@Req() req: any, @Param('petId') petId: string) {
    return this.vaccinations.list(petId, req.user.id);
  }

  @Post('pets/:petId/vaccinations')
  create(@Req() req: any, @Param('petId') petId: string, @Body() dto: CreateVaccinationDto) {
    return this.vaccinations.create(petId, req.user.id, dto);
  }

  @Patch('vaccinations/:vaccinationId')
  update(@Param('vaccinationId') vaccinationId: string, @Body() dto: UpdateVaccinationDto) {
    return this.vaccinations.update(vaccinationId, dto);
  }

  @Delete('vaccinations/:vaccinationId')
  remove(@Param('vaccinationId') vaccinationId: string) {
    return this.vaccinations.remove(vaccinationId);
  }
}
