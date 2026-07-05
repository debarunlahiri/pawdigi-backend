import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  create(customerId: string, dto: CreateReviewDto) {
    return this.prisma.review.create({ data: { customerId, ...dto } });
  }

  update(customerId: string, reviewId: string, dto: UpdateReviewDto) {
    return this.prisma.review.update({ where: { id: reviewId, customerId }, data: dto });
  }

  productReviews(productId: string) {
    return this.prisma.review.findMany({ where: { productId }, include: { customer: { select: { id: true, customerProfile: true } } } });
  }

  adminList() {
    return this.prisma.review.findMany({ include: { product: true, customer: true } });
  }
}
