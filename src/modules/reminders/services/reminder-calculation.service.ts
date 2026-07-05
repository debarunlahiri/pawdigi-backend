import { Injectable } from '@nestjs/common';
import { RepeatType } from '@prisma/client';

@Injectable()
export class ReminderCalculationService {
  nextDueDate(from: Date, repeatType: RepeatType) {
    const next = new Date(from);
    if (repeatType === RepeatType.DAILY) next.setDate(next.getDate() + 1);
    if (repeatType === RepeatType.WEEKLY) next.setDate(next.getDate() + 7);
    if (repeatType === RepeatType.MONTHLY) next.setMonth(next.getMonth() + 1);
    if (repeatType === RepeatType.YEARLY) next.setFullYear(next.getFullYear() + 1);
    return repeatType === RepeatType.NONE ? null : next;
  }

  isDueToday(date: Date, now = new Date()) {
    return date.toDateString() === now.toDateString();
  }
}
