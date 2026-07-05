import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { SchedulerRunLogsService } from '../services/scheduler-run-logs.service';

@ApiBearerAuth()
@ApiTags('Scheduler Logs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/scheduler-logs', version: '1' })
export class SchedulerRunLogsController {
  constructor(private readonly schedulerLogs: SchedulerRunLogsService) {}

  @Get()
  list() {
    return this.schedulerLogs.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.schedulerLogs.get(id);
  }
}
