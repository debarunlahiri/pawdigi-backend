import { Global, Module } from '@nestjs/common';
import { RazorpayProvider } from './razorpay.provider';

@Global()
@Module({ providers: [RazorpayProvider], exports: [RazorpayProvider] })
export class PaymentIntegrationModule {}
