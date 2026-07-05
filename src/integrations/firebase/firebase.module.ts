import { Global, Module } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';
import { FirebaseAdminService } from './firebase-admin.service';
import { FirebaseNotificationService } from './firebase-notification.service';

@Global()
@Module({
  providers: [FirebaseAdminService, FirebaseAuthService, FirebaseNotificationService],
  exports: [FirebaseAdminService, FirebaseAuthService, FirebaseNotificationService],
})
export class FirebaseModule {}
