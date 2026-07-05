import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateShipmentDto {
  @IsUUID()
  orderId: string;
  @IsOptional()
  @IsString()
  carrier?: string;
  @IsOptional()
  @IsString()
  trackingNumber?: string;
}
