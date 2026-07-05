import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { GuardianPermission } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class PetAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async assertCanView(petId: string, userId: string) {
    const pet = await this.prisma.pet.findFirst({ where: { id: petId, deletedAt: null }, include: { guardians: true } });
    if (!pet) throw new NotFoundException('Pet not found');
    if (pet.ownerId === userId || pet.guardians.some((g) => g.guardianUserId === userId && !g.revokedAt)) return pet;
    throw new ForbiddenException('Pet access denied');
  }

  async assertCanManageHealth(petId: string, userId: string) {
    const pet = await this.assertCanView(petId, userId);
    if (pet.ownerId === userId) return pet;
    const guardian = pet.guardians.find((g) => g.guardianUserId === userId && !g.revokedAt);
    if (guardian?.permission === GuardianPermission.FULL_ACCESS || guardian?.permission === GuardianPermission.MANAGE_HEALTH_RECORDS) return pet;
    throw new ForbiddenException('Health record access denied');
  }
}
