import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';
import { CreatePetDto } from '../dto/create-pet.dto';
import { UpdatePetDto } from '../dto/update-pet.dto';
import { PetAccessService } from './pet-access.service';

@Injectable()
export class PetsService {
  constructor(private readonly prisma: PrismaService, private readonly access: PetAccessService) {}

  async list(ownerId: string, query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where = { ownerId, deletedAt: null };
    const [data, total] = await this.prisma.$transaction([
      this.prisma.pet.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      this.prisma.pet.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data, meta: paginationMeta(page, limit, total) };
  }

  create(ownerId: string, dto: CreatePetDto) {
    return this.prisma.pet.create({ data: { ...dto, ownerId, dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined } });
  }

  async get(petId: string, userId: string) {
    return this.access.assertCanView(petId, userId);
  }

  async update(petId: string, userId: string, dto: UpdatePetDto) {
    const pet = await this.access.assertCanView(petId, userId);
    if (pet.ownerId !== userId) throw new ForbiddenException('Only owner can update pet profile');
    return this.prisma.pet.update({ where: { id: petId }, data: { ...dto, dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined } });
  }

  async remove(petId: string, userId: string) {
    const pet = await this.prisma.pet.findFirst({ where: { id: petId, deletedAt: null } });
    if (!pet) throw new NotFoundException('Pet not found');
    if (pet.ownerId !== userId) throw new ForbiddenException('Only owner can delete pet');
    return this.prisma.pet.update({ where: { id: petId }, data: { deletedAt: new Date(), isActive: false } });
  }
}
