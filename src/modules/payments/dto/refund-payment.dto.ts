import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class RefundPaymentDto {
  @IsUUID()
  paymentId: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsOptional()
  @IsString()
  reason?: string;
}
