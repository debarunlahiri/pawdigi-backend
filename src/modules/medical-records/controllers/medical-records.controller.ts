import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { CreateMedicalRecordDto } from '../dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from '../dto/update-medical-record.dto';
import { MedicalRecordsService } from '../services/medical-records.service';

@ApiBearerAuth()
@ApiTags('Medical Records')
@UseGuards(CustomerAuthGuard)
@Controller({ version: '1' })
export class MedicalRecordsController {
  constructor(private readonly records: MedicalRecordsService) {}

  @Get('pets/:petId/medical-records')
  list(@Req() req: any, @Param('petId') petId: string) {
    return this.records.list(petId, req.user.id);
  }

  @Post('pets/:petId/medical-records')
  create(@Req() req: any, @Param('petId') petId: string, @Body() dto: CreateMedicalRecordDto) {
    return this.records.create(petId, req.user.id, dto);
  }

  @Patch('medical-records/:recordId')
  update(@Param('recordId') recordId: string, @Body() dto: UpdateMedicalRecordDto) {
    return this.records.update(recordId, dto);
  }

  @Delete('medical-records/:recordId')
  remove(@Param('recordId') recordId: string) {
    return this.records.remove(recordId);
  }
}
