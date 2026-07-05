export interface PaymentOrderResponse {
  providerOrderId: string;
  amount: number;
  currency: string;
}

export interface PaymentVerificationResponse {
  verified: boolean;
  providerPaymentId?: string;
}

export interface RefundResponse {
  providerRefundId: string;
  status: string;
  amount?: number;
  rawPayload?: Record<string, unknown>;
}

export interface PaymentGateway {
  createOrder(data: { amount: number; currency: string; receipt: string }): Promise<PaymentOrderResponse>;
  verifyPayment(data: Record<string, unknown>): Promise<PaymentVerificationResponse>;
  refund(data: { paymentId: string; amount?: number; notes?: Record<string, string> }): Promise<RefundResponse>;
}
