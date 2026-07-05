import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewsService } from '../services/reviews.service';

@ApiTags('Reviews')
@Controller({ path: 'reviews', version: '1' })
export class ReviewsController {
  constructor(private readonly reviews: ReviewsService) {}
  @Get('products/:productId')
  productReviews(@Param('productId') productId: string) {
    return this.reviews.productReviews(productId);
  }
  @ApiBearerAuth()
  @UseGuards(CustomerAuthGuard)
  @Post()
  create(@Req() req: any, @Body() dto: CreateReviewDto) {
    return this.reviews.create(req.user.id, dto);
  }
  @ApiBearerAuth()
  @UseGuards(CustomerAuthGuard)
  @Patch(':reviewId')
  update(@Req() req: any, @Param('reviewId') reviewId: string, @Body() dto: UpdateReviewDto) {
    return this.reviews.update(req.user.id, reviewId, dto);
  }
}
