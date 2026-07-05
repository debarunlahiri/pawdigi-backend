import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import twilio, { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private readonly client?: Twilio;
  private readonly fromPhone?: string;

  constructor(private readonly config: ConfigService) {
    const accountSid = this.config.get<string>('sms.twilioAccountSid');
    const authToken = this.config.get<string>('sms.twilioAuthToken');
    this.fromPhone = this.config.get<string>('sms.twilioFromPhone');
    if (accountSid && authToken) {
      this.client = twilio(accountSid, authToken);
    }
  }

  async sendSms(phoneNumber: string, message: string) {
    if (!this.client || !this.fromPhone) {
      console.log(`[sms:dev] ${phoneNumber}: ${message}`);
      return { provider: 'dev_console', status: 'DELIVERED_TO_CONSOLE' };
    }
    const result = await this.client.messages.create({
      to: phoneNumber,
      from: this.fromPhone,
      body: message,
    });
    return { provider: 'twilio', status: result.status, providerMessageId: result.sid };
  }
}
