import { Module } from '@nestjs/common';
import { PetsModule } from '../pets/pets.module';
import { DewormingController } from './controllers/deworming.controller';
import { DewormingService } from './services/deworming.service';

@Module({ imports: [PetsModule], controllers: [DewormingController], providers: [DewormingService] })
export class DewormingModule {}
