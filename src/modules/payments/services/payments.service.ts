import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { RazorpayProvider } from '../../../integrations/payment/razorpay.provider';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { VerifyPaymentDto } from '../dto/verify-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService, private readonly gateway: RazorpayProvider) {}

  async create(customerId: string, dto: CreatePaymentDto) {
    const order = await this.prisma.order.findFirst({ where: { id: dto.orderId, customerId } });
    if (!order) throw new NotFoundException('Order not found');
    const gatewayOrder = await this.gateway.createOrder({ amount: Number(order.totalAmount) * 100, currency: 'INR', receipt: order.id });
    const payment = await this.prisma.payment.upsert({
      where: { orderId: order.id },
      update: { providerOrderId: gatewayOrder.providerOrderId, status: PaymentStatus.PENDING },
      create: { orderId: order.id, provider: 'RAZORPAY', providerOrderId: gatewayOrder.providerOrderId, amount: order.totalAmount },
    });
    return { data: { payment, gatewayOrder } };
  }

  async verify(customerId: string, dto: VerifyPaymentDto) {
    const result = await this.gateway.verifyPayment({
      razorpay_order_id: dto.razorpayOrderId,
      razorpay_payment_id: dto.razorpayPaymentId,
      razorpay_signature: dto.razorpaySignature,
    });
    if (!result.verified) return { data: { verified: false } };
    const payment = await this.prisma.payment.findFirstOrThrow({
      where: { providerOrderId: dto.razorpayOrderId, order: { customerId } },
      include: { order: { include: { items: true } } },
    });
    if (payment.status === PaymentStatus.SUCCESS) {
      return { data: { verified: true, payment } };
    }
    const updated = await this.prisma.$transaction(async (tx) => {
      for (const item of payment.order.items) {
        await tx.inventory.update({
          where: { productId: item.productId },
          data: { stock: { decrement: item.quantity }, reserved: { decrement: item.quantity } },
        });
      }
      await tx.order.update({ where: { id: payment.orderId }, data: { status: OrderStatus.CONFIRMED } });
      return tx.payment.update({
        where: { id: payment.id },
        data: { status: PaymentStatus.SUCCESS, providerPaymentId: dto.razorpayPaymentId },
      });
    });
    return { data: { verified: true, payment: updated } };
  }
}
