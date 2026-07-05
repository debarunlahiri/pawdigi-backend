import { Injectable } from '@nestjs/common';
import { randomToken } from '../../../common/utils/token.util';

@Injectable()
export class PassportShareService {
  createToken() {
    return randomToken(24);
  }

  expiry(days = 7) {
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
}
