import { Module } from '@nestjs/common';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { AdminVendorsController } from './controllers/admin-vendors.controller';
import { VendorKycController } from './controllers/vendor-kyc.controller';
import { VendorProfileController } from './controllers/vendor-profile.controller';
import { AdminVendorsService } from './services/admin-vendors.service';
import { VendorKycService } from './services/vendor-kyc.service';
import { VendorsService } from './services/vendors.service';

@Module({
  imports: [AuditLogsModule],
  controllers: [VendorProfileController, VendorKycController, AdminVendorsController],
  providers: [VendorsService, VendorKycService, AdminVendorsService],
})
export class VendorsModule {}
