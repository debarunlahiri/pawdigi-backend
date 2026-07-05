import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { PassportCleanupProcessor } from './passport-cleanup.processor';

@Module({
  imports: [BullModule.registerQueue({ name: 'passport-cleanup' })],
  providers: [PassportCleanupProcessor],
})
export class PassportJobsModule {}
