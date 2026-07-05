import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerAuthGuard } from '../../../common/guards/customer-auth.guard';
import { AddCartItemDto } from '../dto/add-cart-item.dto';
import { UpdateCartItemDto } from '../dto/update-cart-item.dto';
import { CartsService } from '../services/carts.service';

@ApiBearerAuth()
@ApiTags('Cart')
@UseGuards(CustomerAuthGuard)
@Controller({ path: 'cart', version: '1' })
export class CartsController {
  constructor(private readonly carts: CartsService) {}
  @Get()
  get(@Req() req: any) {
    return this.carts.get(req.user.id);
  }
  @Post('items')
  addItem(@Req() req: any, @Body() dto: AddCartItemDto) {
    return this.carts.addItem(req.user.id, dto);
  }
  @Patch('items/:cartItemId')
  updateItem(@Param('cartItemId') cartItemId: string, @Body() dto: UpdateCartItemDto) {
    return this.carts.updateItem(cartItemId, dto);
  }
  @Delete('items/:cartItemId')
  removeItem(@Param('cartItemId') cartItemId: string) {
    return this.carts.removeItem(cartItemId);
  }
  @Delete()
  clear(@Req() req: any) {
    return this.carts.clear(req.user.id);
  }
}
