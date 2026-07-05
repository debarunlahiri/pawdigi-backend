import { Injectable } from '@nestjs/common';
import { S3StorageProvider } from './s3-storage.provider';

@Injectable()
export class StorageService {
  constructor(private readonly provider: S3StorageProvider) {}

  signedUploadUrl(key: string, mimeType: string) {
    return this.provider.createSignedUploadUrl({ key, mimeType });
  }

  signedViewUrl(key: string) {
    return this.provider.createSignedViewUrl(key);
  }

  delete(key: string) {
    return this.provider.deleteObject(key);
  }
}
