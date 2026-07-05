import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { UpdateCustomerProfileDto } from '../dto/update-customer-profile.dto';
import { CustomersService } from '../services/customers.service';

@ApiBearerAuth()
@ApiTags('Customers')
@UseGuards(CustomerAuthGuard)
@Controller({ path: 'customers', version: '1' })
export class CustomersController {
  constructor(private readonly customers: CustomersService) {}
  @Get('me')
  me(@Req() req: any) {
    return this.customers.profile(req.user.id);
  }
  @Patch('me')
  update(@Req() req: any, @Body() dto: UpdateCustomerProfileDto) {
    return this.customers.updateProfile(req.user.id, dto);
  }
}
