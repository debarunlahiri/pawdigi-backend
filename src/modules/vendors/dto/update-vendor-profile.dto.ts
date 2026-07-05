import { IsOptional, IsString } from 'class-validator';

export class UpdateVendorProfileDto {
  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @IsString()
  contactPerson?: string;
}
