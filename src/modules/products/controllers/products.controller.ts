import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductFilterDto } from '../dto/product-filter.dto';
import { ProductsService } from '../services/products.service';

@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list(@Query() query: ProductFilterDto) {
    return this.products.list(query);
  }

  @Get(':productId')
  get(@Param('productId') productId: string) {
    return this.products.get(productId);
  }
}
