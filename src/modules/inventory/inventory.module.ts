import { Module } from '@nestjs/common';
import { AdminInventoryController } from './controllers/admin-inventory.controller';
import { VendorInventoryController } from './controllers/vendor-inventory.controller';
import { AdminInventoryService } from './services/admin-inventory.service';
import { InventoryService } from './services/inventory.service';

@Module({
  controllers: [VendorInventoryController, AdminInventoryController],
  providers: [InventoryService, AdminInventoryService],
})
export class InventoryModule {}
