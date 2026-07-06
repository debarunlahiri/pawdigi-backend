import { Injectable } from '@nestjs/common';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class PaymentWebhookService {
  constructor(private readonly prisma: PrismaService) {}

  async handle(eventId: string, payload: Record<string, any>) {
    const existing = await this.prisma.payment.findUnique({ where: { webhookEventId: eventId } });
    if (existing) return { message: 'Webhook already processed', data: existing };
    const providerOrderId = payload.payload?.payment?.entity?.order_id;
    const event = String(payload.event ?? '');
    const status = event.includes('failed') ? PaymentStatus.FAILED : PaymentStatus.SUCCESS;
    const payment = await this.prisma.payment.findFirst({ where: { providerOrderId }, include: { order: { include: { items: true } } } });
    if (!payment) return { message: 'Payment not found for webhook', data: null };
    if (payment.status === PaymentStatus.SUCCESS) return { message: 'Payment already successful', data: payment };

    return this.prisma.$transaction(async (tx) => {
      if (status === PaymentStatus.SUCCESS) {
        for (const item of payment.order.items) {
          await tx.inventory.update({
            where: { productId: item.productId },
            data: { stock: { decrement: item.quantity }, reserved: { decrement: item.quantity } },
          });
        }
        await tx.order.update({ where: { id: payment.orderId }, data: { status: OrderStatus.CONFIRMED } });
      }
      return tx.payment.update({
        where: { id: payment.id },
        data: {
          webhookEventId: eventId,
          status,
          providerPaymentId: payload.payload?.payment?.entity?.id,
          paymentMethod: payload.payload?.payment?.entity?.method,
          capturedAt: status === PaymentStatus.SUCCESS ? new Date() : undefined,
          failedAt: status === PaymentStatus.FAILED ? new Date() : undefined,
          failureCode: payload.payload?.payment?.entity?.error_code,
          failureReason: payload.payload?.payment?.entity?.error_description,
          lastWebhookEvent: event,
          rawPayload: payload.payload?.payment?.entity,
          rawWebhookPayload: payload,
        },
      });
    });
  }
}
