import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { RegisterDeviceDto } from '../dto/register-device.dto';
import { DeviceTokensService } from '../services/device-tokens.service';

@ApiBearerAuth()
@ApiTags('Devices')
@UseGuards(CustomerAuthGuard)
@Controller({ path: 'devices', version: '1' })
export class DevicesController {
  constructor(private readonly devices: DeviceTokensService) {}
  @Post('register')
  register(@Req() req: any, @Body() dto: RegisterDeviceDto) {
    return this.devices.register(req.user.id, dto);
  }
  @Delete(':deviceId')
  unregister(@Req() req: any, @Param('deviceId') deviceId: string) {
    return this.devices.unregister(req.user.id, deviceId);
  }
}
