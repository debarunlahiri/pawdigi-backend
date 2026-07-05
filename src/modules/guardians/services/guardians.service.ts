import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { randomToken } from '../../../common/utils/token.util';
import { PrismaService } from '../../../core/database/prisma.service';
import { InviteGuardianDto } from '../dto/invite-guardian.dto';
import { UpdateGuardianPermissionDto } from '../dto/update-guardian-permission.dto';

@Injectable()
export class GuardiansService {
  constructor(private readonly prisma: PrismaService) {}

  async invite(ownerId: string, petId: string, dto: InviteGuardianDto) {
    const pet = await this.prisma.pet.findFirst({ where: { id: petId, ownerId, deletedAt: null } });
    if (!pet) throw new ForbiddenException('Only pet owner can invite guardians');
    return this.prisma.petGuardian.create({
      data: {
        petId,
        inviteEmail: dto.email,
        invitePhone: dto.phoneNumber,
        permission: dto.permission,
        inviteToken: randomToken(24),
      },
    });
  }

  invitations(user: { id: string; email?: string | null; phoneNumber?: string | null }) {
    return this.prisma.petGuardian.findMany({
      where: {
        acceptedAt: null,
        revokedAt: null,
        OR: [{ inviteEmail: user.email ?? undefined }, { invitePhone: user.phoneNumber ?? undefined }],
      },
      include: { pet: true },
    });
  }

  async accept(userId: string, inviteToken: string) {
    const invite = await this.prisma.petGuardian.findUnique({ where: { inviteToken } });
    if (!invite || invite.revokedAt) throw new NotFoundException('Guardian invitation not found');
    return this.prisma.petGuardian.update({ where: { id: invite.id }, data: { guardianUserId: userId, acceptedAt: new Date() } });
  }

  async update(ownerId: string, petId: string, guardianId: string, dto: UpdateGuardianPermissionDto) {
    const pet = await this.prisma.pet.findFirst({ where: { id: petId, ownerId, deletedAt: null } });
    if (!pet) throw new ForbiddenException('Only pet owner can update guardian access');
    return this.prisma.petGuardian.update({ where: { id: guardianId }, data: { permission: dto.permission } });
  }

  async revoke(ownerId: string, petId: string, guardianId: string) {
    const pet = await this.prisma.pet.findFirst({ where: { id: petId, ownerId, deletedAt: null } });
    if (!pet) throw new ForbiddenException('Only pet owner can revoke guardian access');
    return this.prisma.petGuardian.update({ where: { id: guardianId }, data: { revokedAt: new Date() } });
  }
}
