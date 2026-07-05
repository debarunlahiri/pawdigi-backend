import { Global, Module } from '@nestjs/common';
import { S3StorageProvider } from './s3-storage.provider';
import { StorageService } from './storage.service';

@Global()
@Module({ providers: [S3StorageProvider, StorageService], exports: [StorageService] })
export class StorageModule {}
