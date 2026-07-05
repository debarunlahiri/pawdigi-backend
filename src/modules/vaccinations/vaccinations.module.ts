import { Module } from '@nestjs/common';
import { PetsModule } from '../pets/pets.module';
import { VaccinationsController } from './controllers/vaccinations.controller';
import { VaccinationsService } from './services/vaccinations.service';

@Module({ imports: [PetsModule], controllers: [VaccinationsController], providers: [VaccinationsService] })
export class VaccinationsModule {}
