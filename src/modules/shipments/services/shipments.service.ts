import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { UpdateShipmentStatusDto } from '../dto/update-shipment-status.dto';

@Injectable()
export class ShipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateShipmentDto) {
    return this.prisma.shipment.upsert({
      where: { orderId: dto.orderId },
      update: dto,
      create: dto,
    });
  }

  update(orderId: string, dto: UpdateShipmentStatusDto) {
    return this.prisma.shipment.update({ where: { orderId }, data: dto });
  }

  adminList() {
    return this.prisma.shipment.findMany({ include: { order: true } });
  }
}
