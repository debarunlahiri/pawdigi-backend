import { IsOptional, IsString } from 'class-validator';

export class CompleteReminderDto {
  @IsOptional()
  @IsString()
  note?: string;
}
