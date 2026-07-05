import { ForbiddenException, Injectable } from '@nestjs/common';
import { DocumentVisibility } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class DocumentAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async assertCanView(documentId: string, userId: string) {
    const document = await this.prisma.document.findFirstOrThrow({ where: { id: documentId, deletedAt: null } });
    if (document.ownerId === userId || document.visibility === DocumentVisibility.PUBLIC_SHARE) return document;
    if (document.petId && document.visibility === DocumentVisibility.GUARDIAN_ALLOWED) {
      const guardian = await this.prisma.petGuardian.findFirst({ where: { petId: document.petId, guardianUserId: userId, revokedAt: null } });
      if (guardian) return document;
    }
    throw new ForbiddenException('Document access denied');
  }
}
