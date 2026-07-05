import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderPricingService {
  lineTotal(price: number, quantity: number) {
    return price * quantity;
  }
}
