import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';
import { AdminUpdatePetDto } from '../dto/admin-update-pet.dto';

@Injectable()
export class AdminPetsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = { deletedAt: null };
    if (query.status === 'ACTIVE') where.isActive = true;
    if (query.status === 'INACTIVE') where.isActive = false;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { breed: { contains: query.search, mode: 'insensitive' } },
        { owner: { phoneNumber: { contains: query.search } } },
        { owner: { customerProfile: { name: { contains: query.search, mode: 'insensitive' } } } },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.pet.findMany({
        skip,
        take,
        where,
        include: { owner: { include: { customerProfile: true } } },
        orderBy: { createdAt: query.sortOrder || 'desc' },
      }),
      this.prisma.pet.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async get(id: string) {
    const pet = await this.prisma.pet.findUnique({
      where: { id, deletedAt: null },
      include: {
        owner: { include: { customerProfile: true } },
        guardians: { include: { guardianUser: true } },
        passport: true,
        vaccinations: { where: { deletedAt: null } },
        deworming: { where: { deletedAt: null } },
        medicalRecords: { where: { deletedAt: null } },
      },
    });
    if (!pet) throw new NotFoundException('Pet not found');
    return { message: 'Data fetched successfully', data: pet };
  }

  async update(id: string, dto: AdminUpdatePetDto) {
    const pet = await this.prisma.pet.findUnique({ where: { id, deletedAt: null } });
    if (!pet) throw new NotFoundException('Pet not found');
    const { dateOfBirth, ...rest } = dto;
    const updated = await this.prisma.pet.update({
      where: { id },
      data: { ...rest, dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined },
    });
    return { message: 'Pet updated successfully', data: updated };
  }

  async remove(id: string) {
    const pet = await this.prisma.pet.findUnique({ where: { id, deletedAt: null } });
    if (!pet) throw new NotFoundException('Pet not found');
    const updated = await this.prisma.pet.update({ where: { id }, data: { deletedAt: new Date(), isActive: false } });
    return { message: 'Pet deleted successfully', data: updated };
  }
}
