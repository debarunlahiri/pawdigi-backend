import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthService {
  private readonly app?: admin.app.App;

  constructor(private readonly config: ConfigService) {
    const projectId = this.config.get<string>('firebase.projectId');
    const clientEmail = this.config.get<string>('firebase.clientEmail');
    const privateKey = this.config.get<string>('firebase.privateKey');
    if (projectId && clientEmail && privateKey && !admin.apps.length) {
      this.app = admin.initializeApp({
        credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
      });
    } else {
      this.app = admin.apps[0] ?? undefined;
    }
  }

  async sendPush(tokens: string[], title: string, body: string, data?: Record<string, string>) {
    if (!this.app || tokens.length === 0) return;
    await admin.messaging(this.app).sendEachForMulticast({ tokens, notification: { title, body }, data });
  }
}
