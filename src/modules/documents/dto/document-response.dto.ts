import { DocumentType, DocumentVisibility } from '@prisma/client';

export class DocumentResponseDto {
  id: string;
  type: DocumentType;
  fileName: string;
  mimeType: string;
  size: number;
  visibility: DocumentVisibility;
  createdAt: Date;
}
