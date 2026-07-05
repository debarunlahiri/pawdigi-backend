import { Injectable } from '@nestjs/common';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable()
export class FirebaseAdminService {
  constructor(private readonly auth: FirebaseAuthService) {}
}
