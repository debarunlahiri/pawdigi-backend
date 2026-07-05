import { ReminderType, RepeatType } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateReminderDto {
  @IsUUID()
  petId: string;
  @IsEnum(ReminderType)
  type: ReminderType;
  @IsString()
  title: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsDateString()
  dueDate: string;
  @IsOptional()
  @IsEnum(RepeatType)
  repeatType?: RepeatType;
}
