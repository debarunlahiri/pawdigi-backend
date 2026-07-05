import { Injectable } from '@nestjs/common';
import { ReminderStatus } from '@prisma/client';
import { PrismaService } from '../../../core/database/prisma.service';
import { PetAccessService } from '../../pets/services/pet-access.service';
import { CreateReminderDto } from '../dto/create-reminder.dto';
import { UpdateReminderDto } from '../dto/update-reminder.dto';

@Injectable()
export class RemindersService {
  constructor(private readonly prisma: PrismaService, private readonly petAccess: PetAccessService) {}

  list(userId: string) {
    return this.prisma.reminder.findMany({ where: { userId }, orderBy: { dueDate: 'asc' } });
  }

  async create(userId: string, dto: CreateReminderDto) {
    await this.petAccess.assertCanView(dto.petId, userId);
    return this.prisma.reminder.create({ data: { ...dto, userId, dueDate: new Date(dto.dueDate) } });
  }

  update(userId: string, reminderId: string, dto: UpdateReminderDto) {
    return this.prisma.reminder.update({ where: { id: reminderId, userId }, data: { ...dto, dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined } });
  }

  complete(userId: string, reminderId: string) {
    return this.prisma.reminder.update({ where: { id: reminderId, userId }, data: { status: ReminderStatus.COMPLETED, completedAt: new Date() } });
  }

  cancel(userId: string, reminderId: string) {
    return this.prisma.reminder.update({ where: { id: reminderId, userId }, data: { status: ReminderStatus.CANCELLED } });
  }

  dueBetween(from: Date, to: Date) {
    return this.prisma.reminder.findMany({ where: { dueDate: { gte: from, lte: to }, status: { in: [ReminderStatus.PENDING, ReminderStatus.SENT] } } });
  }

  overdue(now = new Date()) {
    return this.prisma.reminder.findMany({ where: { dueDate: { lt: now }, status: { in: [ReminderStatus.PENDING, ReminderStatus.SENT] } } });
  }

  markSent(reminderId: string) {
    return this.prisma.reminder.update({ where: { id: reminderId }, data: { status: ReminderStatus.SENT, lastSentAt: new Date() } });
  }

  markOverdue(reminderId: string) {
    return this.prisma.reminder.update({ where: { id: reminderId }, data: { status: ReminderStatus.OVERDUE } });
  }
}
