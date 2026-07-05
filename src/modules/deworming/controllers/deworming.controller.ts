import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { CreateDewormingDto } from '../dto/create-deworming.dto';
import { UpdateDewormingDto } from '../dto/update-deworming.dto';
import { DewormingService } from '../services/deworming.service';

@ApiBearerAuth()
@ApiTags('Deworming')
@UseGuards(CustomerAuthGuard)
@Controller({ version: '1' })
export class DewormingController {
  constructor(private readonly deworming: DewormingService) {}

  @Get('pets/:petId/deworming')
  list(@Req() req: any, @Param('petId') petId: string) {
    return this.deworming.list(petId, req.user.id);
  }

  @Post('pets/:petId/deworming')
  create(@Req() req: any, @Param('petId') petId: string, @Body() dto: CreateDewormingDto) {
    return this.deworming.create(petId, req.user.id, dto);
  }

  @Patch('deworming/:dewormingId')
  update(@Param('dewormingId') dewormingId: string, @Body() dto: UpdateDewormingDto) {
    return this.deworming.update(dewormingId, dto);
  }

  @Delete('deworming/:dewormingId')
  remove(@Param('dewormingId') dewormingId: string) {
    return this.deworming.remove(dewormingId);
  }
}
