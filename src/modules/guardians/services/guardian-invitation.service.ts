import { Injectable } from '@nestjs/common';
import { GuardiansService } from './guardians.service';

@Injectable()
export class GuardianInvitationService extends GuardiansService {}
