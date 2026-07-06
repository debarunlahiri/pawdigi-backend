import { Body, Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ModerateReviewDto } from '../dto/moderate-review.dto';
import { AuditLogsService } from '../../audit-logs/services/audit-logs.service';
import { ReviewsService } from '../services/reviews.service';

@ApiBearerAuth()
@ApiTags('Admin Reviews')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/reviews', version: '1' })
export class AdminReviewsController {
  constructor(private readonly reviews: ReviewsService, private readonly auditLogs: AuditLogsService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.reviews.adminList(query);
  }

  @Patch(':reviewId/moderate')
  async moderate(@Req() req: any, @Param('reviewId') reviewId: string, @Body() dto: ModerateReviewDto) {
    const review = await this.reviews.moderate(reviewId, dto, req.user.id);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'REVIEW_MODERATED', entityType: 'Review', entityId: review.id, newValue: review });
    return { message: 'Review moderated successfully', data: review };
  }
}
