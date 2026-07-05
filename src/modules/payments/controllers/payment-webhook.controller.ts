import { Body, Controller, Headers, Post, RawBodyRequest, Req, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RazorpayProvider } from '../../../integrations/payment/razorpay.provider';
import { PaymentWebhookService } from '../services/payment-webhook.service';

@ApiTags('Payment Webhooks')
@Controller({ path: 'payments', version: '1' })
export class PaymentWebhookController {
  constructor(
    private readonly webhooks: PaymentWebhookService,
    private readonly razorpay: RazorpayProvider,
    private readonly config: ConfigService,
  ) {}

  @Post('webhook')
  webhook(@Req() req: RawBodyRequest<Request>, @Headers('x-razorpay-event-id') eventId: string, @Headers('x-razorpay-signature') signature: string, @Body() body: Record<string, any>) {
    const secret = this.config.get<string>('payment.razorpayWebhookSecret');
    if (secret && signature && req.rawBody && !this.razorpay.verifyWebhookSignature(req.rawBody.toString(), signature, secret)) {
      throw new UnauthorizedException('Invalid payment webhook signature');
    }
    return this.webhooks.handle(eventId, body);
  }
}
