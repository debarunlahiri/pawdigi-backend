import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { RefundPaymentDto } from '../dto/refund-payment.dto';
import { AdminPaymentsService } from '../services/admin-payments.service';
import { RefundsService } from '../services/refunds.service';

@ApiBearerAuth()
@ApiTags('Admin Payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/payments', version: '1' })
export class AdminPaymentsController {
  constructor(private readonly payments: AdminPaymentsService, private readonly refunds: RefundsService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.payments.list(query);
  }

  @Get(':paymentId')
  get(@Param('paymentId') paymentId: string) {
    return this.payments.get(paymentId);
  }

  @Post('refund')
  refund(@Body() dto: RefundPaymentDto) {
    return this.refunds.refund(dto);
  }
}
