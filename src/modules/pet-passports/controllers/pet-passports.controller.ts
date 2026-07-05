import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { CreatePassportShareDto } from '../dto/create-passport-share.dto';
import { PetPassportsService } from '../services/pet-passports.service';

@ApiBearerAuth()
@ApiTags('Pet Passports')
@UseGuards(CustomerAuthGuard)
@Controller({ version: '1' })
export class PetPassportsController {
  constructor(private readonly passports: PetPassportsService) {}
  @Get('pets/:petId/passport')
  get(@Req() req: any, @Param('petId') petId: string) {
    return this.passports.get(petId, req.user.id);
  }
  @Post('pets/:petId/passport/generate')
  generate(@Req() req: any, @Param('petId') petId: string) {
    return this.passports.generate(petId, req.user.id);
  }
  @Post('pets/:petId/passport/share')
  share(@Req() req: any, @Param('petId') petId: string, @Body() dto: CreatePassportShareDto) {
    return this.passports.share(petId, req.user.id, dto.expiresInDays);
  }
  @Patch('passport/share/:shareId/revoke')
  revoke(@Param('shareId') shareId: string) {
    return this.passports.revoke(shareId);
  }
}
