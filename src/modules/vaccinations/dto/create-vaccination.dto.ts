import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateVaccinationDto {
  @IsString()
  vaccineName: string;
  @IsDateString()
  vaccinationDate: string;
  @IsOptional()
  @IsDateString()
  nextDueDate?: string;
  @IsOptional()
  @IsString()
  vetName?: string;
  @IsOptional()
  @IsString()
  clinicName?: string;
  @IsOptional()
  @IsString()
  batchNumber?: string;
  @IsOptional()
  @IsString()
  notes?: string;
  @IsOptional()
  @IsUUID()
  documentId?: string;
}
