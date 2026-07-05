import { Injectable } from '@nestjs/common';
import { slugify } from '../../../common/utils/slug.util';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  list() {
    return this.prisma.category.findMany({ where: { isActive: true, deletedAt: null } });
  }

  adminList() {
    return this.prisma.category.findMany({ include: { parent: true, children: true }, orderBy: { createdAt: 'desc' } });
  }

  create(dto: CreateCategoryDto) {
    return this.prisma.category.create({ data: { name: dto.name, slug: dto.slug ?? slugify(dto.name), parentId: dto.parentId } });
  }

  update(categoryId: string, dto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id: categoryId },
      data: { ...dto, slug: dto.slug ?? (dto.name ? slugify(dto.name) : undefined) },
    });
  }

  remove(categoryId: string) {
    return this.prisma.category.update({ where: { id: categoryId }, data: { deletedAt: new Date(), isActive: false } });
  }
}
