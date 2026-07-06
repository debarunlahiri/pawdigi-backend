import { Module } from '@nestjs/common';
import { AdminSettingsController } from './controllers/admin-settings.controller';
import { AdminSettingsService } from './services/admin-settings.service';

@Module({
  controllers: [AdminSettingsController],
  providers: [AdminSettingsService],
})
export class SettingsModule {}
