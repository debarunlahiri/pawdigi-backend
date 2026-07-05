import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDewormingDto {
  @IsString()
  medicineName: string;
  @IsDateString()
  givenDate: string;
  @IsOptional()
  @IsDateString()
  nextDueDate?: string;
  @IsOptional()
  @IsString()
  dosage?: string;
  @IsOptional()
  @IsString()
  vetName?: string;
  @IsOptional()
  @IsString()
  notes?: string;
  @IsOptional()
  @IsUUID()
  documentId?: string;
}
