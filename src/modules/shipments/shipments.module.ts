import { Module } from '@nestjs/common';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { AdminShipmentsController } from './controllers/admin-shipments.controller';
import { VendorShipmentsController } from './controllers/vendor-shipments.controller';
import { ShipmentsService } from './services/shipments.service';

@Module({
  imports: [AuditLogsModule],
  controllers: [VendorShipmentsController, AdminShipmentsController],
  providers: [ShipmentsService],
})
export class ShipmentsModule {}
