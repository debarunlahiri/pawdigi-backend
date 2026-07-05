import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersService } from '../services/orders.service';

@ApiBearerAuth()
@ApiTags('Orders')
@UseGuards(CustomerAuthGuard)
@Controller({ path: 'orders', version: '1' })
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateOrderDto) {
    return this.orders.create(req.user.id, dto);
  }

  @Get()
  list(@Req() req: any) {
    return this.orders.list(req.user.id);
  }

  @Get(':orderId')
  get(@Req() req: any, @Param('orderId') orderId: string) {
    return this.orders.get(req.user.id, orderId);
  }

  @Patch(':orderId/cancel')
  cancel(@Req() req: any, @Param('orderId') orderId: string) {
    return this.orders.cancel(req.user.id, orderId);
  }
}
