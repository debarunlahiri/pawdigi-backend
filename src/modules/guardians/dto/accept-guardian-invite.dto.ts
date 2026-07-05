import { IsString } from 'class-validator';

export class AcceptGuardianInviteDto {
  @IsString()
  inviteToken: string;
}
