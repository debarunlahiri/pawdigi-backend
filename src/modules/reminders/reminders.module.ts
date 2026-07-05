import { Module } from '@nestjs/common';
import { PetsModule } from '../pets/pets.module';
import { RemindersController } from './controllers/reminders.controller';
import { RemindersService } from './services/reminders.service';
import { ReminderCalculationService } from './services/reminder-calculation.service';

@Module({ imports: [PetsModule], controllers: [RemindersController], providers: [RemindersService, ReminderCalculationService], exports: [RemindersService] })
export class RemindersModule {}
