import { Injectable } from '@nestjs/common';
import { UserStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { hashPassword } from '../../../common/utils/password.util';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  list() {
    return this.prisma.user.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } });
  }

  async create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        role: dto.role,
        passwordHash: dto.password ? await hashPassword(dto.password) : undefined,
      },
    });
  }

  update(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  block(id: string) {
    return this.prisma.user.update({ where: { id }, data: { status: UserStatus.BLOCKED } });
  }

  unblock(id: string) {
    return this.prisma.user.update({ where: { id }, data: { status: UserStatus.ACTIVE } });
  }
}
