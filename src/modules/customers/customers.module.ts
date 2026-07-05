import { Module } from '@nestjs/common';
import { AdminCustomersController } from './controllers/admin-customers.controller';
import { CustomersController } from './controllers/customers.controller';
import { AdminCustomersService } from './services/admin-customers.service';
import { CustomersService } from './services/customers.service';

@Module({ controllers: [CustomersController, AdminCustomersController], providers: [CustomersService, AdminCustomersService], exports: [CustomersService] })
export class CustomersModule {}
