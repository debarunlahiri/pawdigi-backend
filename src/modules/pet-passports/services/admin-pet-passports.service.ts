import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';

@Injectable()
export class AdminPetPassportsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { passportNo: { contains: query.search, mode: 'insensitive' } },
        { pet: { name: { contains: query.search, mode: 'insensitive' } } },
        { pet: { owner: { phoneNumber: { contains: query.search } } } },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.petPassport.findMany({
        skip,
        take,
        where,
        include: { pet: { include: { owner: { include: { customerProfile: true } } } } },
        orderBy: { createdAt: query.sortOrder || 'desc' },
      }),
      this.prisma.petPassport.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async get(id: string) {
    const passport = await this.prisma.petPassport.findUnique({
      where: { id },
      include: { pet: { include: { owner: { include: { customerProfile: true } }, vaccinations: true, deworming: true } } },
    });
    if (!passport) throw new NotFoundException('Passport not found');
    return { message: 'Data fetched successfully', data: passport };
  }

  async generate(petId: string) {
    const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) throw new NotFoundException('Pet not found');
    const passport = await this.prisma.petPassport.upsert({
      where: { petId },
      update: { status: 'ACTIVE', version: { increment: 1 } },
      create: { petId, passportNo: `PD-${Date.now()}`, status: 'ACTIVE', issuedAt: new Date() },
    });
    return { message: 'Passport generated successfully', data: passport };
  }

  async revoke(id: string) {
    const passport = await this.prisma.petPassport.findUnique({ where: { id } });
    if (!passport) throw new NotFoundException('Passport not found');
    const updated = await this.prisma.petPassport.update({
      where: { id },
      data: { shareRevoked: true, shareRevokedAt: new Date(), shareRevokedReason: 'ADMIN_REVOKE' },
    });
    return { message: 'Passport share revoked successfully', data: updated };
  }
}
