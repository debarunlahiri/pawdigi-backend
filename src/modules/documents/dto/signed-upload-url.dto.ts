import { DocumentType, DocumentVisibility } from '@prisma/client';
import { IsEnum, IsInt, IsMimeType, IsString, Min } from 'class-validator';

export class SignedUploadUrlDto {
  @IsString()
  fileName: string;
  @IsMimeType()
  mimeType: string;
  @IsInt()
  @Min(1)
  size: number;
  @IsEnum(DocumentType)
  type: DocumentType;
  @IsEnum(DocumentVisibility)
  visibility: DocumentVisibility;
}
