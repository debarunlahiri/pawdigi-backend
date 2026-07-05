import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';
import { RazorpayProvider } from './razorpay.provider';

const config = new ConfigService({
  payment: {
    razorpayKeyId: 'rzp_key',
    razorpayKeySecret: 'rzp_secret',
  },
});

describe('RazorpayProvider', () => {
  let provider: RazorpayProvider;
  const originalFetch = global.fetch;

  beforeEach(() => {
    provider = new RazorpayProvider(config);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'order_123', amount: 50000, currency: 'INR', status: 'created' }),
    } as Response);
  });

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('creates a Razorpay order through the REST API', async () => {
    const order = await provider.createOrder({ amount: 50000, currency: 'INR', receipt: 'local-order-id' });

    expect(order).toEqual({ providerOrderId: 'order_123', amount: 50000, currency: 'INR' });
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.razorpay.com/v1/orders',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: `Basic ${Buffer.from('rzp_key:rzp_secret').toString('base64')}`,
        }),
      }),
    );
  });

  it('verifies Razorpay checkout signatures', async () => {
    const signature = createHmac('sha256', 'rzp_secret').update('order_123|pay_123').digest('hex');

    await expect(
      provider.verifyPayment({
        razorpay_order_id: 'order_123',
        razorpay_payment_id: 'pay_123',
        razorpay_signature: signature,
      }),
    ).resolves.toEqual({ verified: true, providerPaymentId: 'pay_123' });
  });

  it('rejects invalid Razorpay checkout signatures', async () => {
    await expect(
      provider.verifyPayment({
        razorpay_order_id: 'order_123',
        razorpay_payment_id: 'pay_123',
        razorpay_signature: 'bad-signature',
      }),
    ).resolves.toEqual({ verified: false, providerPaymentId: 'pay_123' });
  });

  it('creates refunds through the REST API', async () => {
    jest.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'rfnd_123', status: 'processed', amount: 1000 }),
    } as Response);

    const refund = await provider.refund({ paymentId: 'pay_123', amount: 1000, notes: { reason: 'Customer requested refund' } });

    expect(refund).toEqual({
      providerRefundId: 'rfnd_123',
      status: 'processed',
      amount: 1000,
      rawPayload: { id: 'rfnd_123', status: 'processed', amount: 1000 },
    });
    expect(global.fetch).toHaveBeenCalledWith('https://api.razorpay.com/v1/payments/pay_123/refund', expect.objectContaining({ method: 'POST' }));
  });
});
