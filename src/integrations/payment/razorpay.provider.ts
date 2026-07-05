import { Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';
import { PaymentGateway, PaymentOrderResponse, RefundResponse } from './payment-gateway.interface';

const RAZORPAY_API_BASE_URL = 'https://api.razorpay.com/v1';

@Injectable()
export class RazorpayProvider implements PaymentGateway {
  constructor(private readonly config: ConfigService) {}

  async createOrder(data: { amount: number; currency: string; receipt: string }): Promise<PaymentOrderResponse> {
    const response = await this.razorpayFetch<Record<string, unknown>>('/orders', {
      method: 'POST',
      body: {
        amount: data.amount,
        currency: data.currency,
        receipt: data.receipt,
        payment_capture: 1,
        notes: {
          orderId: data.receipt,
        },
      },
    });

    return {
      providerOrderId: String(response.id),
      amount: Number(response.amount),
      currency: String(response.currency),
    };
  }

  async verifyPayment(data: Record<string, unknown>) {
    const orderId = String(data.razorpay_order_id ?? '');
    const paymentId = String(data.razorpay_payment_id ?? '');
    const signature = String(data.razorpay_signature ?? '');
    const secret = this.requiredSecret();
    const digest = createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex');

    return { verified: Boolean(orderId && paymentId && signature && digest === signature), providerPaymentId: paymentId };
  }

  async refund(data: { paymentId: string; amount?: number; notes?: Record<string, string> }): Promise<RefundResponse> {
    const response = await this.razorpayFetch<Record<string, unknown>>(`/payments/${data.paymentId}/refund`, {
      method: 'POST',
      body: {
        amount: data.amount,
        speed: 'normal',
        notes: data.notes,
      },
    });

    return {
      providerRefundId: String(response.id),
      status: String(response.status),
      amount: response.amount === undefined ? undefined : Number(response.amount),
      rawPayload: response,
    };
  }

  verifyWebhookSignature(rawBody: string, signature: string, secret: string) {
    const digest = createHmac('sha256', secret).update(rawBody).digest('hex');
    return digest === signature;
  }

  private async razorpayFetch<T>(path: string, options: { method: 'POST'; body?: Record<string, unknown> }): Promise<T> {
    const keyId = this.config.get<string>('payment.razorpayKeyId');
    const keySecret = this.requiredSecret();
    if (!keyId) throw new ServiceUnavailableException('Razorpay key id is not configured');

    const response = await fetch(`${RAZORPAY_API_BASE_URL}${path}`, {
      method: options.method,
      headers: {
        Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.removeUndefined(options.body ?? {})),
    });

    const body = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    if (!response.ok) {
      const error = body.error as Record<string, unknown> | undefined;
      throw new UnauthorizedException(error?.description ?? 'Razorpay request failed');
    }

    return body as T;
  }

  private requiredSecret() {
    const keySecret = this.config.get<string>('payment.razorpayKeySecret');
    if (!keySecret) throw new ServiceUnavailableException('Razorpay key secret is not configured');
    return keySecret;
  }

  private removeUndefined(data: Record<string, unknown>) {
    return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined));
  }
}
