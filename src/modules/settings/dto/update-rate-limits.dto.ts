import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateRateLimitsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  globalPerMinute?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  authPerMinute?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  otpPer10Minutes?: number;
}
