import { Injectable } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable()
export class FirebaseNotificationService {
  constructor(private readonly firebase: FirebaseAuthService) {}

  sendPush(tokens: string[], title: string, body: string, data?: Record<string, string>) {
    return this.firebase.sendPush(tokens, title, body, data);
  }
}
