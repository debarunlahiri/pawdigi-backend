import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { hashPassword } from '../../../common/utils/password.util';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.adminProfile.findMany({ include: { user: true } });
  }

  async create(dto: CreateAdminDto) {
    if (dto.role && dto.role !== Role.ADMIN && dto.role !== Role.SUPER_ADMIN) throw new BadRequestException('Invalid admin role');
    return this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: await hashPassword(dto.password),
        role: dto.role ?? Role.ADMIN,
        adminProfile: { create: { name: dto.name } },
      },
      include: { adminProfile: true },
    });
  }

  update(userId: string, dto: UpdateAdminDto) {
    return this.prisma.adminProfile.update({ where: { userId }, data: dto });
  }
}
