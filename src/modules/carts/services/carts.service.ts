import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { AddCartItemDto } from '../dto/add-cart-item.dto';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async get(customerId: string) {
    return this.prisma.cart.upsert({
      where: { customerId },
      update: {},
      create: { customerId },
      include: { items: { include: { product: { include: { images: true, inventory: true } } } } },
    });
  }

  async addItem(customerId: string, dto: AddCartItemDto) {
    const cart = await this.prisma.cart.upsert({ where: { customerId }, update: {}, create: { customerId } });
    return this.prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId: dto.productId } },
      update: { quantity: { increment: dto.quantity } },
      create: { cartId: cart.id, productId: dto.productId, quantity: dto.quantity },
    });
  }

  updateItem(cartItemId: string, dto: UpdateCartItemDto) {
    return this.prisma.cartItem.update({ where: { id: cartItemId }, data: { quantity: dto.quantity } });
  }

  removeItem(cartItemId: string) {
    return this.prisma.cartItem.delete({ where: { id: cartItemId } });
  }

  async clear(customerId: string) {
    const cart = await this.prisma.cart.findUnique({ where: { customerId } });
    if (!cart) return { count: 0 };
    return this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  }
}
