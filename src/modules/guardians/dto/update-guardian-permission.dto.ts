import { GuardianPermission } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateGuardianPermissionDto {
  @IsEnum(GuardianPermission)
  permission: GuardianPermission;
}
