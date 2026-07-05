import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PetAccessService } from '../../pets/services/pet-access.service';
import { CreateVaccinationDto } from '../dto/create-vaccination.dto';
import { UpdateVaccinationDto } from '../dto/update-vaccination.dto';

@Injectable()
export class VaccinationsService {
  constructor(private readonly prisma: PrismaService, private readonly petAccess: PetAccessService) {}

  async list(petId: string, userId: string) {
    await this.petAccess.assertCanView(petId, userId);
    return this.prisma.vaccinationRecord.findMany({ where: { petId, deletedAt: null }, orderBy: { vaccinationDate: 'desc' } });
  }

  async create(petId: string, userId: string, dto: CreateVaccinationDto) {
    await this.petAccess.assertCanManageHealth(petId, userId);
    return this.prisma.vaccinationRecord.create({
      data: {
        ...dto,
        petId,
        createdBy: userId,
        vaccinationDate: new Date(dto.vaccinationDate),
        nextDueDate: dto.nextDueDate ? new Date(dto.nextDueDate) : undefined,
      },
    });
  }

  update(vaccinationId: string, dto: UpdateVaccinationDto) {
    return this.prisma.vaccinationRecord.update({
      where: { id: vaccinationId },
      data: {
        ...dto,
        vaccinationDate: dto.vaccinationDate ? new Date(dto.vaccinationDate) : undefined,
        nextDueDate: dto.nextDueDate ? new Date(dto.nextDueDate) : undefined,
      },
    });
  }

  remove(vaccinationId: string) {
    return this.prisma.vaccinationRecord.update({ where: { id: vaccinationId }, data: { deletedAt: new Date() } });
  }
}
