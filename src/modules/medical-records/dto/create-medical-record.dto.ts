import { MedicalRecordType } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMedicalRecordDto {
  @IsEnum(MedicalRecordType)
  recordType: MedicalRecordType;
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsDateString()
  recordDate: string;
  @IsOptional()
  @IsString()
  vetName?: string;
  @IsOptional()
  @IsString()
  clinicName?: string;
  @IsOptional()
  @IsUUID()
  documentId?: string;
}
