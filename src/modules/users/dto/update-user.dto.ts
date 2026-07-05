import { UserStatus } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  phoneNumber?: string;
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
