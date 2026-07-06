import { Module } from '@nestjs/common';
import { AdminPaymentsController } from './controllers/admin-payments.controller';
import { PaymentWebhookController } from './controllers/payment-webhook.controller';
import { PaymentsController } from './controllers/payments.controller';
import { AdminPaymentsService } from './services/admin-payments.service';
import { PaymentWebhookService } from './services/payment-webhook.service';
import { PaymentsService } from './services/payments.service';
import { RefundsService } from './services/refunds.service';

@Module({
  controllers: [PaymentsController, PaymentWebhookController, AdminPaymentsController],
  providers: [PaymentsService, PaymentWebhookService, RefundsService, AdminPaymentsService],
})
export class PaymentsModule {}
