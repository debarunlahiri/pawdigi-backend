import { Module } from '@nestjs/common';
import { AdminShipmentsController } from './controllers/admin-shipments.controller';
import { VendorShipmentsController } from './controllers/vendor-shipments.controller';
import { ShipmentsService } from './services/shipments.service';

@Module({ controllers: [VendorShipmentsController, AdminShipmentsController], providers: [ShipmentsService] })
export class ShipmentsModule {}
