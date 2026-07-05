import { Module } from '@nestjs/common';
import { DocumentsController } from './controllers/documents.controller';
import { DocumentAccessService } from './services/document-access.service';
import { DocumentsService } from './services/documents.service';

@Module({ controllers: [DocumentsController], providers: [DocumentsService, DocumentAccessService] })
export class DocumentsModule {}
