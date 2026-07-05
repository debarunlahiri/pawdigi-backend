import { Module } from '@nestjs/common';
import { ApiLogsController } from './controllers/api-logs.controller';
import { ApiLogsService } from './services/api-logs.service';

@Module({ controllers: [ApiLogsController], providers: [ApiLogsService] })
export class ApiLogsModule {}
