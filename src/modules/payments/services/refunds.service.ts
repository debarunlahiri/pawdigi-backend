import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { RazorpayProvider } from '../../../integrations/payment/razorpay.provider';
import { RefundPaymentDto } from '../dto/refund-payment.dto';

@Injectable()
export class RefundsService {
  constructor(private readonly prisma: PrismaService, private readonly gateway: RazorpayProvider) {}

  async refund(dto: RefundPaymentDto) {
    const payment = await this.prisma.payment.findUniqueOrThrow({ where: { id: dto.paymentId } });
    if (!payment.providerPaymentId) throw new BadRequestException('Payment does not have a provider payment id');

    const providerRefund = await this.gateway.refund({
      paymentId: payment.providerPaymentId,
      amount: dto.amount,
      notes: {
        paymentId: payment.id,
        reason: dto.reason ?? 'Admin refund',
      },
    });
    const updated = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.REFUNDED,
        refundedAmount: dto.amount,
        refundProviderId: providerRefund.providerRefundId,
        refundStatus: providerRefund.status,
        refundReason: dto.reason,
        refundedAt: new Date(),
      },
    });
    return { data: { payment: updated, providerRefund } };
  }
}
