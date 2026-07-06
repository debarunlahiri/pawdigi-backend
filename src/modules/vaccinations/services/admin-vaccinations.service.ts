import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';
import { AdminCreateVaccinationDto } from '../dto/admin-create-vaccination.dto';
import { UpdateVaccinationDto } from '../dto/update-vaccination.dto';

@Injectable()
export class AdminVaccinationsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = { deletedAt: null };
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { vaccineName: { contains: query.search, mode: 'insensitive' } },
        { pet: { name: { contains: query.search, mode: 'insensitive' } } },
        { pet: { owner: { phoneNumber: { contains: query.search } } } },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.vaccinationRecord.findMany({
        skip,
        take,
        where,
        include: { pet: { include: { owner: { include: { customerProfile: true } } } }, document: true },
        orderBy: { vaccinationDate: query.sortOrder || 'desc' },
      }),
      this.prisma.vaccinationRecord.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async get(id: string) {
    const record = await this.prisma.vaccinationRecord.findUnique({
      where: { id, deletedAt: null },
      include: { pet: { include: { owner: { include: { customerProfile: true } } } }, document: true },
    });
    if (!record) throw new NotFoundException('Vaccination record not found');
    return { message: 'Data fetched successfully', data: record };
  }

  async create(dto: AdminCreateVaccinationDto) {
    const pet = await this.prisma.pet.findUnique({ where: { id: dto.petId } });
    if (!pet) throw new NotFoundException('Pet not found');
    const record = await this.prisma.vaccinationRecord.create({
      data: {
        ...dto,
        vaccinationDate: new Date(dto.vaccinationDate),
        nextDueDate: dto.nextDueDate ? new Date(dto.nextDueDate) : undefined,
        createdBy: 'ADMIN',
      },
    });
    return { message: 'Vaccination record created successfully', data: record };
  }

  async update(id: string, dto: UpdateVaccinationDto) {
    const record = await this.prisma.vaccinationRecord.findUnique({ where: { id, deletedAt: null } });
    if (!record) throw new NotFoundException('Vaccination record not found');
    const updated = await this.prisma.vaccinationRecord.update({
      where: { id },
      data: {
        ...dto,
        vaccinationDate: dto.vaccinationDate ? new Date(dto.vaccinationDate) : undefined,
        nextDueDate: dto.nextDueDate ? new Date(dto.nextDueDate) : undefined,
      },
    });
    return { message: 'Vaccination record updated successfully', data: updated };
  }

  async remove(id: string) {
    const record = await this.prisma.vaccinationRecord.findUnique({ where: { id, deletedAt: null } });
    if (!record) throw new NotFoundException('Vaccination record not found');
    const updated = await this.prisma.vaccinationRecord.update({ where: { id }, data: { deletedAt: new Date() } });
    return { message: 'Vaccination record deleted successfully', data: updated };
  }
}
