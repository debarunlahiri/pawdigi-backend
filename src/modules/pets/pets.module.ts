import { Module } from '@nestjs/common';
import { AdminPetsController } from './controllers/admin-pets.controller';
import { PetsController } from './controllers/pets.controller';
import { AdminPetsService } from './services/admin-pets.service';
import { PetAccessService } from './services/pet-access.service';
import { PetsService } from './services/pets.service';

@Module({
  controllers: [PetsController, AdminPetsController],
  providers: [PetsService, PetAccessService, AdminPetsService],
  exports: [PetAccessService, PetsService],
})
export class PetsModule {}
