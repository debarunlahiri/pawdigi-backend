import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { CreateReminderDto } from '../dto/create-reminder.dto';
import { UpdateReminderDto } from '../dto/update-reminder.dto';
import { RemindersService } from '../services/reminders.service';

@ApiBearerAuth()
@ApiTags('Reminders')
@UseGuards(CustomerAuthGuard)
@Controller({ path: 'reminders', version: '1' })
export class RemindersController {
  constructor(private readonly reminders: RemindersService) {}
  @Get()
  list(@Req() req: any) {
    return this.reminders.list(req.user.id);
  }
  @Post()
  create(@Req() req: any, @Body() dto: CreateReminderDto) {
    return this.reminders.create(req.user.id, dto);
  }
  @Patch(':reminderId')
  update(@Req() req: any, @Param('reminderId') reminderId: string, @Body() dto: UpdateReminderDto) {
    return this.reminders.update(req.user.id, reminderId, dto);
  }
  @Patch(':reminderId/complete')
  complete(@Req() req: any, @Param('reminderId') reminderId: string) {
    return this.reminders.complete(req.user.id, reminderId);
  }
  @Delete(':reminderId')
  cancel(@Req() req: any, @Param('reminderId') reminderId: string) {
    return this.reminders.cancel(req.user.id, reminderId);
  }
}
