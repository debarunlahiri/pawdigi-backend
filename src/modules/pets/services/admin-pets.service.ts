import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';

@Injectable()
export class AdminPetsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const [data, total] = await this.prisma.$transaction([
      this.prisma.pet.findMany({ skip, take, include: { owner: true }, orderBy: { createdAt: 'desc' } }),
      this.prisma.pet.count(),
    ]);
    return { message: 'Data fetched successfully', data, meta: paginationMeta(page, limit, total) };
  }

  get(id: string) {
    return this.prisma.pet.findUnique({ where: { id }, include: { owner: true, guardians: true } });
  }
}
