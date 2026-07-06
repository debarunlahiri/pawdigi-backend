import { Module } from '@nestjs/common';
import { PetsModule } from '../pets/pets.module';
import { AdminPetPassportsController } from './controllers/admin-pet-passports.controller';
import { PetPassportsController } from './controllers/pet-passports.controller';
import { PublicPetPassportsController } from './controllers/public-pet-passports.controller';
import { AdminPetPassportsService } from './services/admin-pet-passports.service';
import { PassportPdfService } from './services/passport-pdf.service';
import { PassportShareService } from './services/passport-share.service';
import { PetPassportsService } from './services/pet-passports.service';

@Module({
  imports: [PetsModule],
  controllers: [PetPassportsController, PublicPetPassportsController, AdminPetPassportsController],
  providers: [PetPassportsService, PassportPdfService, PassportShareService, AdminPetPassportsService],
  exports: [PetPassportsService],
})
export class PetPassportsModule {}
