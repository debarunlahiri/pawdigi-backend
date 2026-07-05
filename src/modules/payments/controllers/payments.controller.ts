import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { VerifyPaymentDto } from '../dto/verify-payment.dto';
import { PaymentsService } from '../services/payments.service';

@ApiBearerAuth()
@ApiTags('Payments')
@UseGuards(CustomerAuthGuard)
@Controller({ path: 'payments', version: '1' })
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post('create')
  create(@Req() req: any, @Body() dto: CreatePaymentDto) {
    return this.payments.create(req.user.id, dto);
  }

  @Post('verify')
  verify(@Req() req: any, @Body() dto: VerifyPaymentDto) {
    return this.payments.verify(req.user.id, dto);
  }
}
