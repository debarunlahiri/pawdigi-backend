import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageProvider, SignedUrlRequest } from './storage.interface';

@Injectable()
export class S3StorageProvider implements StorageProvider {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor(config: ConfigService) {
    this.bucket = config.get<string>('storage.bucket') ?? '';
    this.client = new S3Client({
      region: config.get<string>('storage.region'),
      endpoint: config.get<string>('storage.endpoint') || undefined,
      credentials: config.get<string>('storage.accessKeyId')
        ? {
            accessKeyId: config.get<string>('storage.accessKeyId') ?? '',
            secretAccessKey: config.get<string>('storage.secretAccessKey') ?? '',
          }
        : undefined,
    });
  }

  async createSignedUploadUrl(input: SignedUrlRequest) {
    const command = new PutObjectCommand({ Bucket: this.bucket, Key: input.key, ContentType: input.mimeType });
    return { url: await getSignedUrl(this.client, command, { expiresIn: input.expiresInSeconds ?? 900 }), key: input.key };
  }

  async createSignedViewUrl(key: string, expiresInSeconds = 900) {
    return getSignedUrl(this.client, new GetObjectCommand({ Bucket: this.bucket, Key: key }), { expiresIn: expiresInSeconds });
  }

  async deleteObject(key: string) {
    await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
  }
}
