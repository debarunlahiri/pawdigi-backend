import { Module } from '@nestjs/common';
import { PetsModule } from '../pets/pets.module';
import { AdminVaccinationsController } from './controllers/admin-vaccinations.controller';
import { VaccinationsController } from './controllers/vaccinations.controller';
import { AdminVaccinationsService } from './services/admin-vaccinations.service';
import { VaccinationsService } from './services/vaccinations.service';

@Module({
  imports: [PetsModule],
  controllers: [VaccinationsController, AdminVaccinationsController],
  providers: [VaccinationsService, AdminVaccinationsService],
})
export class VaccinationsModule {}
