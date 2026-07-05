import { Module } from '@nestjs/common';
import { GuardiansController } from './controllers/guardians.controller';
import { GuardianInvitationService } from './services/guardian-invitation.service';
import { GuardiansService } from './services/guardians.service';

@Module({ controllers: [GuardiansController], providers: [GuardiansService, GuardianInvitationService], exports: [GuardiansService] })
export class GuardiansModule {}
