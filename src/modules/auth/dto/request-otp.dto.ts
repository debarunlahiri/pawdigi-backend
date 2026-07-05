import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class RequestOtpDto {
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  deviceId: string;
}
