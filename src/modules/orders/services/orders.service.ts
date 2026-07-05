import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus, Prisma, ProductStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(customerId: string, dto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({ where: { id: { in: dto.items.map((item) => item.productId) }, status: ProductStatus.ACTIVE }, include: { inventory: true } });
      if (products.length !== dto.items.length) throw new BadRequestException('One or more products are unavailable');
      const vendorIds = new Set(products.map((product) => product.vendorId));
      if (vendorIds.size !== 1) throw new BadRequestException('Single order can contain products from one vendor');
      let totalAmount = 0;
      for (const item of dto.items) {
        const product = products.find((candidate) => candidate.id === item.productId)!;
        if (!product.inventory || product.inventory.stock - product.inventory.reserved < item.quantity) throw new BadRequestException(`Insufficient stock for ${product.name}`);
        totalAmount += Number(product.discountPrice ?? product.price) * item.quantity;
        await tx.inventory.update({ where: { productId: product.id }, data: { reserved: { increment: item.quantity } } });
      }
      return tx.order.create({
        data: {
          customerId,
          vendorId: [...vendorIds][0],
          totalAmount,
          address: dto.address as Prisma.InputJsonValue,
          items: { create: dto.items.map((item) => ({ productId: item.productId, quantity: item.quantity, unitPrice: products.find((product) => product.id === item.productId)!.price })) },
        },
        include: { items: true },
      });
    });
  }

  list(customerId: string) {
    return this.prisma.order.findMany({ where: { customerId }, include: { items: true, payment: true, shipment: true } });
  }

  get(customerId: string, orderId: string) {
    return this.prisma.order.findFirst({ where: { id: orderId, customerId }, include: { items: true, payment: true, shipment: true } });
  }

  async cancel(customerId: string, orderId: string) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findFirst({ where: { id: orderId, customerId }, include: { items: true, payment: true } });
      if (!order) throw new NotFoundException('Order not found');
      if (order.status !== OrderStatus.PLACED && order.status !== OrderStatus.CONFIRMED) throw new BadRequestException('Order cannot be cancelled');
      if (order.status === OrderStatus.PLACED) {
        for (const item of order.items) {
          await tx.inventory.update({ where: { productId: item.productId }, data: { reserved: { decrement: item.quantity } } });
        }
      }
      return tx.order.update({ where: { id: orderId }, data: { status: OrderStatus.CANCELLED } });
    });
  }
}
