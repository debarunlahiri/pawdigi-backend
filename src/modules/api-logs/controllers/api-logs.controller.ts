import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { ApiLogsService } from '../services/api-logs.service';

@ApiBearerAuth()
@ApiTags('API Logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/api-logs', version: '1' })
export class ApiLogsController {
  constructor(private readonly apiLogs: ApiLogsService) {}

  @Get()
  list(@Query() query: PaginationQueryDto) {
    return this.apiLogs.list(query);
  }
}
