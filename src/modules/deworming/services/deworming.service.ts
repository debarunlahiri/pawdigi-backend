import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PetAccessService } from '../../pets/services/pet-access.service';
import { CreateDewormingDto } from '../dto/create-deworming.dto';
import { UpdateDewormingDto } from '../dto/update-deworming.dto';

@Injectable()
export class DewormingService {
  constructor(private readonly prisma: PrismaService, private readonly petAccess: PetAccessService) {}

  async list(petId: string, userId: string) {
    await this.petAccess.assertCanView(petId, userId);
    return this.prisma.dewormingRecord.findMany({ where: { petId, deletedAt: null }, orderBy: { givenDate: 'desc' } });
  }

  async create(petId: string, userId: string, dto: CreateDewormingDto) {
    await this.petAccess.assertCanManageHealth(petId, userId);
    return this.prisma.dewormingRecord.create({
      data: { ...dto, petId, createdBy: userId, givenDate: new Date(dto.givenDate), nextDueDate: dto.nextDueDate ? new Date(dto.nextDueDate) : undefined },
    });
  }

  update(dewormingId: string, dto: UpdateDewormingDto) {
    return this.prisma.dewormingRecord.update({
      where: { id: dewormingId },
      data: { ...dto, givenDate: dto.givenDate ? new Date(dto.givenDate) : undefined, nextDueDate: dto.nextDueDate ? new Date(dto.nextDueDate) : undefined },
    });
  }

  remove(dewormingId: string) {
    return this.prisma.dewormingRecord.update({ where: { id: dewormingId }, data: { deletedAt: new Date() } });
  }
}
