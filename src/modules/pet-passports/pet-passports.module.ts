import { Module } from '@nestjs/common';
import { PetsModule } from '../pets/pets.module';
import { PetPassportsController } from './controllers/pet-passports.controller';
import { PublicPetPassportsController } from './controllers/public-pet-passports.controller';
import { PassportPdfService } from './services/passport-pdf.service';
import { PassportShareService } from './services/passport-share.service';
import { PetPassportsService } from './services/pet-passports.service';

@Module({
  imports: [PetsModule],
  controllers: [PetPassportsController, PublicPetPassportsController],
  providers: [PetPassportsService, PassportPdfService, PassportShareService],
  exports: [PetPassportsService],
})
export class PetPassportsModule {}
