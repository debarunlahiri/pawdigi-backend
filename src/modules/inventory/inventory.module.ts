import { Module } from '@nestjs/common';
import { VendorInventoryController } from './controllers/vendor-inventory.controller';
import { InventoryService } from './services/inventory.service';

@Module({ controllers: [VendorInventoryController], providers: [InventoryService] })
export class InventoryModule {}
