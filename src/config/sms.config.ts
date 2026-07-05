import { registerAs } from '@nestjs/config';

export default registerAs('sms', () => ({
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioFromPhone: process.env.TWILIO_FROM_PHONE,
  otpExpiresInMinutes: Number(process.env.OTP_EXPIRES_IN_MINUTES ?? 5),
  otpMaxAttempts: Number(process.env.OTP_MAX_ATTEMPTS ?? 5),
}));
