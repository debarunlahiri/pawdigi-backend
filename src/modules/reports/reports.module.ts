import { Module } from '@nestjs/common';
import { AdminReportsController } from './controllers/admin-reports.controller';
import { VendorReportsController } from './controllers/vendor-reports.controller';
import { ReportsService } from './services/reports.service';
import { VendorReportsService } from './services/vendor-reports.service';

@Module({ controllers: [AdminReportsController, VendorReportsController], providers: [ReportsService, VendorReportsService] })
export class ReportsModule {}
