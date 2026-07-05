import { IsOptional, IsString } from 'class-validator';

export class ApproveProductDto {
  @IsOptional()
  @IsString()
  note?: string;
}
