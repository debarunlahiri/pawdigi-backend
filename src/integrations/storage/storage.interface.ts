export interface SignedUrlRequest {
  key: string;
  mimeType: string;
  expiresInSeconds?: number;
}

export interface StorageProvider {
  createSignedUploadUrl(input: SignedUrlRequest): Promise<{ url: string; key: string }>;
  createSignedViewUrl(key: string, expiresInSeconds?: number): Promise<string>;
  deleteObject(key: string): Promise<void>;
}
