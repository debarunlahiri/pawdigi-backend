import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { PrismaService } from '../../../core/database/prisma.service';
import { RefundPaymentDto } from '../dto/refund-payment.dto';
import { RefundsService } from '../services/refunds.service';

@ApiBearerAuth()
@ApiTags('Admin Payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/payments', version: '1' })
export class AdminPaymentsController {
  constructor(private readonly prisma: PrismaService, private readonly refunds: RefundsService) {}

  @Get()
  list() {
    return this.prisma.payment.findMany({ include: { order: true } });
  }

  @Post('refund')
  refund(@Body() dto: RefundPaymentDto) {
    return this.refunds.refund(dto);
  }
}
