import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PetPassportsService } from '../services/pet-passports.service';

@ApiTags('Public Pet Passports')
@Controller({ path: 'public/passport', version: '1' })
export class PublicPetPassportsController {
  constructor(private readonly passports: PetPassportsService) {}
  @Get(':shareToken')
  get(@Param('shareToken') shareToken: string) {
    return this.passports.publicByToken(shareToken);
  }
}
