import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class VendorKycDto {
  @IsOptional()
  @IsString()
  gstNumber?: string;

  @IsOptional()
  @IsString()
  panNumber?: string;

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  documentIds?: string[];
}
