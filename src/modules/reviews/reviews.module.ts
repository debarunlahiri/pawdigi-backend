import { Module } from '@nestjs/common';
import { AdminReviewsController } from './controllers/admin-reviews.controller';
import { ReviewsController } from './controllers/reviews.controller';
import { ReviewsService } from './services/reviews.service';

@Module({ controllers: [ReviewsController, AdminReviewsController], providers: [ReviewsService] })
export class ReviewsModule {}
