import { Module } from '@nestjs/common';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { AdminUsersController } from './controllers/admin-users.controller';
import { AdminUsersService } from './services/admin-users.service';
import { UsersService } from './services/users.service';

@Module({ imports: [AuditLogsModule], controllers: [AdminUsersController], providers: [UsersService, AdminUsersService], exports: [UsersService] })
export class UsersModule {}
