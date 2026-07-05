import { IsString } from 'class-validator';

export class RejectVendorDto {
  @IsString()
  reason: string;
}
