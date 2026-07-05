import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ReviewsService } from '../services/reviews.service';

@ApiBearerAuth()
@ApiTags('Admin Reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/reviews', version: '1' })
export class AdminReviewsController {
  constructor(private readonly reviews: ReviewsService) {}
  @Get()
  list() {
    return this.reviews.adminList();
  }
}
