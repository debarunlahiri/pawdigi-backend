import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { UpdateShipmentStatusDto } from '../dto/update-shipment-status.dto';

@Injectable()
export class ShipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateShipmentDto) {
    return this.prisma.shipment.upsert({
      where: { orderId: dto.orderId },
      update: { ...dto, trackingUrl: dto.trackingNumber && dto.carrier ? `https://track.aftership.com/${dto.carrier}/${dto.trackingNumber}` : undefined },
      create: { ...dto, trackingUrl: dto.trackingNumber && dto.carrier ? `https://track.aftership.com/${dto.carrier}/${dto.trackingNumber}` : undefined },
    });
  }

  update(orderId: string, dto: UpdateShipmentStatusDto) {
    return this.prisma.shipment.update({
      where: { orderId },
      data: {
        ...dto,
        shippedAt: dto.status === 'IN_TRANSIT' ? new Date() : undefined,
        deliveredAt: dto.status === 'DELIVERED' ? new Date() : undefined,
        failedAt: dto.status === 'FAILED' ? new Date() : undefined,
      },
    });
  }

  async adminList(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { trackingNumber: { contains: query.search, mode: 'insensitive' } },
        { carrier: { contains: query.search, mode: 'insensitive' } },
        { order: { orderNumber: { contains: query.search, mode: 'insensitive' } } },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.shipment.findMany({
        skip,
        take,
        where,
        include: { order: { include: { customer: { include: { customerProfile: true } }, vendor: true } } },
        orderBy: { createdAt: query.sortOrder || 'desc' },
      }),
      this.prisma.shipment.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async adminGet(id: string) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id },
      include: { order: { include: { customer: { include: { customerProfile: true } }, vendor: true, items: { include: { product: true } } } } },
    });
    if (!shipment) throw new NotFoundException('Shipment not found');
    return { message: 'Data fetched successfully', data: shipment };
  }

  async adminUpdate(id: string, dto: UpdateShipmentStatusDto) {
    const shipment = await this.prisma.shipment.findUnique({ where: { id } });
    if (!shipment) throw new NotFoundException('Shipment not found');
    const data: any = { ...dto };
    if (dto.status === 'IN_TRANSIT') data.shippedAt = new Date();
    if (dto.status === 'DELIVERED') data.deliveredAt = new Date();
    if (dto.status === 'FAILED') data.failedAt = new Date();
    return this.prisma.shipment.update({ where: { id }, data });
  }
}
