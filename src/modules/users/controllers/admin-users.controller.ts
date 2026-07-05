import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { BlockUserDto } from '../dto/block-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuditLogsService } from '../../audit-logs/services/audit-logs.service';
import { UsersService } from '../services/users.service';

@ApiBearerAuth()
@ApiTags('Admin Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller({ path: 'admin/users', version: '1' })
export class AdminUsersController {
  constructor(private readonly users: UsersService, private readonly auditLogs: AuditLogsService) {}
  @Get()
  list() {
    return this.users.list();
  }
  @Post()
  async create(@Req() req: any, @Body() dto: CreateUserDto) {
    const user = await this.users.create(dto);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'USER_CREATED', entityType: 'User', entityId: user.id, newValue: user });
    return user;
  }
  @Get(':userId')
  get(@Param('userId') userId: string) {
    return this.users.findById(userId);
  }
  @Patch(':userId')
  async update(@Req() req: any, @Param('userId') userId: string, @Body() dto: UpdateUserDto) {
    const user = await this.users.update(userId, dto);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'USER_UPDATED', entityType: 'User', entityId: user.id, newValue: user });
    return user;
  }
  @Patch(':userId/block')
  async block(@Req() req: any, @Param('userId') userId: string, @Body() _dto: BlockUserDto) {
    const user = await this.users.block(userId);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'USER_BLOCKED', entityType: 'User', entityId: user.id });
    return user;
  }
  @Patch(':userId/unblock')
  async unblock(@Req() req: any, @Param('userId') userId: string) {
    const user = await this.users.unblock(userId);
    await this.auditLogs.create({ actorUserId: req.user.id, actorRole: req.user.role, action: 'USER_UNBLOCKED', entityType: 'User', entityId: user.id });
    return user;
  }
}
