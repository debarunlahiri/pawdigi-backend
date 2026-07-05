import { BadRequestException } from '@nestjs/common';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

export const assertAllowedFile = (mimeType: string, size: number, maxSize = 10 * 1024 * 1024) => {
  if (!allowedMimeTypes.includes(mimeType)) throw new BadRequestException('Unsupported file type');
  if (size > maxSize) throw new BadRequestException('File too large');
};
