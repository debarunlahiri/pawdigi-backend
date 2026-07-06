import { IsIn, IsJSON, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminSendNotificationDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsIn(['CUSTOMER', 'VENDOR', 'ADMIN', 'ALL'])
  target?: string;

  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsOptional()
  @IsJSON()
  data?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  priority?: string;
}
