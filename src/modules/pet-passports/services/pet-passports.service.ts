import { Injectable } from '@nestjs/common';
import { randomToken } from '../../../common/utils/token.util';
import { PrismaService } from '../../../core/database/prisma.service';
import { PetAccessService } from '../../pets/services/pet-access.service';

@Injectable()
export class PetPassportsService {
  constructor(private readonly prisma: PrismaService, private readonly petAccess: PetAccessService) {}

  async get(petId: string, userId: string) {
    await this.petAccess.assertCanView(petId, userId);
    return this.prisma.pet.findUnique({ where: { id: petId }, include: { owner: true, passport: true, vaccinations: true, deworming: true } });
  }

  async generate(petId: string, userId: string) {
    await this.petAccess.assertCanView(petId, userId);
    return this.prisma.petPassport.upsert({
      where: { petId },
      update: { status: 'ACTIVE', version: { increment: 1 } },
      create: { petId, passportNo: `PD-${Date.now()}`, status: 'ACTIVE', issuedAt: new Date(), issuedBy: userId },
    });
  }

  async share(petId: string, userId: string, expiresInDays = 7) {
    await this.petAccess.assertCanView(petId, userId);
    await this.generate(petId, userId);
    return this.prisma.petPassport.update({ where: { petId }, data: { shareToken: randomToken(24), shareExpires: new Date(Date.now() + expiresInDays * 86400000), shareRevoked: false, shareRevokedAt: null, lastSharedAt: new Date() } });
  }

  revoke(shareId: string) {
    return this.prisma.petPassport.update({ where: { id: shareId }, data: { shareRevoked: true, shareRevokedAt: new Date(), shareRevokedReason: 'MANUAL_REVOKE' } });
  }

  async publicByToken(shareToken: string) {
    const passport = await this.prisma.petPassport.findFirst({
      where: { shareToken, shareRevoked: false, shareExpires: { gt: new Date() } },
      include: { pet: { select: { name: true, species: true, breed: true, microchipNumber: true, vaccinations: true, deworming: true } } },
    });
    if (passport) await this.prisma.petPassport.update({ where: { id: passport.id }, data: { viewCount: { increment: 1 }, lastViewedAt: new Date() } });
    return passport;
  }
}
