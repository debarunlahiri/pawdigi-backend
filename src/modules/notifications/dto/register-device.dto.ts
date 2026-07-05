import { IsEnum, IsString } from 'class-validator';
import { Platform } from '../../../common/enums/platform.enum';

export class RegisterDeviceDto {
  @IsString()
  deviceId: string;
  @IsString()
  fcmToken: string;
  @IsEnum(Platform)
  platform: Platform;
}
