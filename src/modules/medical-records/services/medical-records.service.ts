import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PetAccessService } from '../../pets/services/pet-access.service';
import { CreateMedicalRecordDto } from '../dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from '../dto/update-medical-record.dto';

@Injectable()
export class MedicalRecordsService {
  constructor(private readonly prisma: PrismaService, private readonly petAccess: PetAccessService) {}

  async list(petId: string, userId: string) {
    await this.petAccess.assertCanView(petId, userId);
    return this.prisma.medicalRecord.findMany({ where: { petId, deletedAt: null }, orderBy: { recordDate: 'desc' } });
  }

  async create(petId: string, userId: string, dto: CreateMedicalRecordDto) {
    await this.petAccess.assertCanManageHealth(petId, userId);
    return this.prisma.medicalRecord.create({ data: { ...dto, petId, createdBy: userId, recordDate: new Date(dto.recordDate) } });
  }

  update(recordId: string, dto: UpdateMedicalRecordDto) {
    return this.prisma.medicalRecord.update({ where: { id: recordId }, data: { ...dto, recordDate: dto.recordDate ? new Date(dto.recordDate) : undefined } });
  }

  remove(recordId: string) {
    return this.prisma.medicalRecord.update({ where: { id: recordId }, data: { deletedAt: new Date() } });
  }
}
