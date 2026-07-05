import { IsInt, IsOptional, Min } from 'class-validator';

export class CreatePassportShareDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  expiresInDays?: number;
}
