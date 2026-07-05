import { IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';
import { Platform } from '../../../common/enums/platform.enum';

export class VerifyOtpDto {
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @Length(4, 8)
  otp: string;

  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsOptional()
  @IsString()
  fcmToken?: string;

  @IsEnum(Platform)
  platform: Platform;
}
