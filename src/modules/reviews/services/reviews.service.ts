import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getPagination, paginationMeta } from '../../../common/utils/pagination.util';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ModerateReviewDto } from '../dto/moderate-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  create(customerId: string, dto: CreateReviewDto) {
    return this.prisma.review.create({ data: { customerId, ...dto, status: 'PENDING', isVerifiedPurchase: false } });
  }

  update(customerId: string, reviewId: string, dto: UpdateReviewDto) {
    return this.prisma.review.update({ where: { id: reviewId, customerId }, data: dto });
  }

  productReviews(productId: string) {
    return this.prisma.review.findMany({ where: { productId }, include: { customer: { select: { id: true, customerProfile: true } } } });
  }

  async adminList(query: PaginationQueryDto) {
    const { page, limit, skip, take } = getPagination(query);
    const where: any = { deletedAt: null };
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { comment: { contains: query.search, mode: 'insensitive' } },
        { product: { name: { contains: query.search, mode: 'insensitive' } } },
        { customer: { customerProfile: { name: { contains: query.search, mode: 'insensitive' } } } },
      ];
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.review.findMany({
        skip,
        take,
        where,
        include: { product: true, customer: { include: { customerProfile: true } } },
        orderBy: { createdAt: query.sortOrder || 'desc' },
      }),
      this.prisma.review.count({ where }),
    ]);
    return { message: 'Data fetched successfully', data: { items: data, meta: paginationMeta(page, limit, total) } };
  }

  async moderate(reviewId: string, dto: ModerateReviewDto, adminUserId: string) {
    const review = await this.prisma.review.findUnique({ where: { id: reviewId, deletedAt: null } });
    if (!review) throw new NotFoundException('Review not found');
    return this.prisma.review.update({
      where: { id: reviewId },
      data: { status: dto.status, rejectionReason: dto.rejectionReason, moderatedAt: new Date(), moderatedBy: adminUserId },
    });
  }
}
