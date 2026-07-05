import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterVendorDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  businessName: string;

  @IsOptional()
  @IsString()
  contactPerson?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
