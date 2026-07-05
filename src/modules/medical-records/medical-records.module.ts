import { Module } from '@nestjs/common';
import { PetsModule } from '../pets/pets.module';
import { MedicalRecordsController } from './controllers/medical-records.controller';
import { MedicalRecordsService } from './services/medical-records.service';

@Module({ imports: [PetsModule], controllers: [MedicalRecordsController], providers: [MedicalRecordsService] })
export class MedicalRecordsModule {}
