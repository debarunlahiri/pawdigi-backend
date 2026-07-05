import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateVendorDto {
  @IsEmail()
  email: string;
  @IsString()
  businessName: string;
  @IsOptional()
  @IsString()
  contactPerson?: string;
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
