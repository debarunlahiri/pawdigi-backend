import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { AcceptGuardianInviteDto } from '../dto/accept-guardian-invite.dto';
import { InviteGuardianDto } from '../dto/invite-guardian.dto';
import { UpdateGuardianPermissionDto } from '../dto/update-guardian-permission.dto';
import { GuardiansService } from '../services/guardians.service';

@ApiBearerAuth()
@ApiTags('Guardians')
@UseGuards(CustomerAuthGuard)
@Controller({ version: '1' })
export class GuardiansController {
  constructor(private readonly guardians: GuardiansService) {}

  @Post('pets/:petId/guardians/invite')
  invite(@Req() req: any, @Param('petId') petId: string, @Body() dto: InviteGuardianDto) {
    return this.guardians.invite(req.user.id, petId, dto);
  }

  @Get('guardian/invitations')
  invitations(@Req() req: any) {
    return this.guardians.invitations(req.user);
  }

  @Post('guardian/invitations/:inviteId/accept')
  accept(@Req() req: any, @Param('inviteId') inviteId: string, @Body() dto: AcceptGuardianInviteDto) {
    return this.guardians.accept(req.user.id, dto.inviteToken || inviteId);
  }

  @Patch('pets/:petId/guardians/:guardianId')
  update(@Req() req: any, @Param('petId') petId: string, @Param('guardianId') guardianId: string, @Body() dto: UpdateGuardianPermissionDto) {
    return this.guardians.update(req.user.id, petId, guardianId, dto);
  }

  @Delete('pets/:petId/guardians/:guardianId')
  revoke(@Req() req: any, @Param('petId') petId: string, @Param('guardianId') guardianId: string) {
    return this.guardians.revoke(req.user.id, petId, guardianId);
  }
}
