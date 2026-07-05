import { IsString } from 'class-validator';

export class RejectProductDto {
  @IsString()
  reason: string;
}
