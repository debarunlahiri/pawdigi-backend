import { Injectable } from '@nestjs/common';
import { CartStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { AddCartItemDto } from '../dto/add-cart-item.dto';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async get(customerId: string) {
    return this.prisma.cart.upsert({
      where: { customerId },
      update: { lastActivityAt: new Date(), status: CartStatus.ACTIVE },
      create: { customerId, lastActivityAt: new Date() },
      include: { items: { include: { product: { include: { images: true, inventory: true } } } } },
    });
  }

  async addItem(customerId: string, dto: AddCartItemDto) {
    const product = await this.prisma.product.findUniqueOrThrow({ where: { id: dto.productId } });
    const unitPrice = product.discountPrice ?? product.price;
    const cart = await this.prisma.cart.upsert({
      where: { customerId },
      update: { status: CartStatus.ACTIVE, lastActivityAt: new Date() },
      create: { customerId, lastActivityAt: new Date() },
    });
    const item = await this.prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId: dto.productId } },
      update: {
        quantity: { increment: dto.quantity },
        unitPrice,
        mrp: product.price,
        productName: product.name,
        productSku: product.sku,
        vendorId: product.vendorId,
        removedAt: null,
      },
      create: {
        cartId: cart.id,
        productId: dto.productId,
        quantity: dto.quantity,
        unitPrice,
        mrp: product.price,
        productName: product.name,
        productSku: product.sku,
        vendorId: product.vendorId,
        lineTotal: Number(unitPrice) * dto.quantity,
      },
    });
    await this.recalculateCart(cart.id);
    return item;
  }

  async updateItem(cartItemId: string, dto: UpdateCartItemDto) {
    const existing = await this.prisma.cartItem.findUniqueOrThrow({ where: { id: cartItemId } });
    const item = await this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: dto.quantity, lineTotal: Number(existing.unitPrice ?? 0) * dto.quantity, removedAt: null },
    });
    await this.recalculateCart(item.cartId);
    return item;
  }

  async removeItem(cartItemId: string) {
    const item = await this.prisma.cartItem.update({ where: { id: cartItemId }, data: { removedAt: new Date() } });
    await this.recalculateCart(item.cartId);
    return item;
  }

  async clear(customerId: string) {
    const cart = await this.prisma.cart.findUnique({ where: { customerId } });
    if (!cart) return { count: 0 };
    await this.prisma.cartItem.updateMany({ where: { cartId: cart.id, removedAt: null }, data: { removedAt: new Date() } });
    await this.prisma.cart.update({
      where: { id: cart.id },
      data: { status: CartStatus.CLEARED, itemCount: 0, subtotalAmount: 0, discountAmount: 0, taxAmount: 0, shippingAmount: 0, totalAmount: 0, lastActivityAt: new Date() },
    });
    return { count: 0 };
  }

  private async recalculateCart(cartId: string) {
    const items = await this.prisma.cartItem.findMany({ where: { cartId, removedAt: null } });
    const subtotalAmount = items.reduce((sum, item) => sum + Number(item.unitPrice ?? 0) * item.quantity, 0);
    const discountAmount = items.reduce((sum, item) => sum + Number(item.discountAmount ?? 0), 0);
    const taxAmount = items.reduce((sum, item) => sum + Number(item.taxAmount ?? 0), 0);
    return this.prisma.cart.update({
      where: { id: cartId },
      data: {
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        subtotalAmount,
        discountAmount,
        taxAmount,
        totalAmount: subtotalAmount - discountAmount + taxAmount,
        lastActivityAt: new Date(),
      },
    });
  }
}
