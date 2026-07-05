import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { ConfirmUploadDto } from '../dto/confirm-upload.dto';
import { SignedUploadUrlDto } from '../dto/signed-upload-url.dto';
import { DocumentsService } from '../services/documents.service';

@ApiBearerAuth()
@ApiTags('Documents')
@UseGuards(CustomerAuthGuard)
@Controller({ path: 'documents', version: '1' })
export class DocumentsController {
  constructor(private readonly documents: DocumentsService) {}
  @Post('signed-upload-url')
  signedUploadUrl(@Req() req: any, @Body() dto: SignedUploadUrlDto) {
    return this.documents.signedUploadUrl(req.user.id, dto);
  }

  @Post('confirm-upload')
  confirmUpload(@Req() req: any, @Body() dto: ConfirmUploadDto) {
    return this.documents.confirmUpload(req.user.id, dto);
  }

  @Get(':documentId/signed-view-url')
  signedViewUrl(@Req() req: any, @Param('documentId') documentId: string) {
    return this.documents.signedViewUrl(req.user.id, documentId);
  }

  @Delete(':documentId')
  remove(@Req() req: any, @Param('documentId') documentId: string) {
    return this.documents.remove(req.user.id, documentId);
  }
}
