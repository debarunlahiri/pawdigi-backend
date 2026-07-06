import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';
import { AdminUpdateCustomerDto } from '../dto/admin-update-customer.dto';

@Injectable()
export class AdminCustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = { role: 'CUSTOMER', deletedAt: null };
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { phoneNumber: { contains: query.search } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { customerProfile: { name: { contains: query.search, mode: 'insensitive' } } },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take,
        where,
        include: { customerProfile: true },
        orderBy: { createdAt: query.sortOrder || 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async get(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId, role: 'CUSTOMER', deletedAt: null },
      include: {
        customerProfile: true,
        ownedPets: { where: { deletedAt: null } },
        orders: { take: 10, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!user) throw new NotFoundException('Customer not found');
    return { message: 'Data fetched successfully', data: user };
  }

  async update(userId: string, dto: AdminUpdateCustomerDto) {
    const user = await this.prisma.user.findFirst({ where: { id: userId, role: 'CUSTOMER', deletedAt: null } });
    if (!user) throw new NotFoundException('Customer not found');
    const { name, ...userData } = dto;
    const updated = await this.prisma.$transaction(async (tx) => {
      if (name) {
        await tx.customerProfile.upsert({ where: { userId }, update: { name }, create: { userId, name } });
      }
      return tx.user.update({ where: { id: userId }, data: userData, include: { customerProfile: true } });
    });
    return { message: 'Customer updated successfully', data: updated };
  }
}
