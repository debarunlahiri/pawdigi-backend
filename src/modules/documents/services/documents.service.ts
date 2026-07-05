import { Injectable } from '@nestjs/common';
import { DocumentType, DocumentVisibility } from '@prisma/client';
import { assertAllowedFile } from '../../../common/utils/file.util';
import { createUuidV7 } from '../../../common/utils/id.util';
import { PrismaService } from '../../../core/database/prisma.service';
import { StorageService } from '../../../integrations/storage/storage.service';
import { ConfirmUploadDto } from '../dto/confirm-upload.dto';
import { SignedUploadUrlDto } from '../dto/signed-upload-url.dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly storage: StorageService, private readonly prisma: PrismaService) {}

  signedUploadUrl(userId: string, dto: SignedUploadUrlDto) {
    assertAllowedFile(dto.mimeType, dto.size);
    return this.storage.signedUploadUrl(`${userId}/${createUuidV7()}-${dto.fileName}`, dto.mimeType);
  }

  confirmUpload(userId: string, dto: ConfirmUploadDto & { fileName?: string; mimeType?: string; size?: number; type?: DocumentType; visibility?: DocumentVisibility }) {
    return this.prisma.document.create({
      data: {
        ownerId: userId,
        storageKey: dto.storageKey,
        fileName: dto.fileName ?? dto.storageKey.split('/').pop() ?? 'document',
        mimeType: dto.mimeType ?? 'application/octet-stream',
        size: dto.size ?? 0,
        type: dto.type ?? DocumentType.OTHER,
        visibility: dto.visibility ?? DocumentVisibility.PRIVATE,
      },
    });
  }

  async signedViewUrl(userId: string, documentId: string) {
    const document = await this.prisma.document.findFirstOrThrow({ where: { id: documentId, ownerId: userId, deletedAt: null } });
    return { data: { url: await this.storage.signedViewUrl(document.storageKey) } };
  }

  async remove(userId: string, documentId: string) {
    const document = await this.prisma.document.update({ where: { id: documentId, ownerId: userId }, data: { deletedAt: new Date() } });
    await this.storage.delete(document.storageKey);
    return document;
  }
}
