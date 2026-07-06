import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ProductStatus } from '@prisma/client';

export class AdminUpdateProductDto {
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsString()
  rejectionReason?: string;
}
