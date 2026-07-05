import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { VendorApprovedGuard } from '../../../common/guards/vendor-approved.guard';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { VendorProductsService } from '../services/vendor-products.service';

@ApiBearerAuth()
@ApiTags('Vendor Products')
@UseGuards(JwtAuthGuard, RolesGuard, VendorApprovedGuard)
@Roles(Role.VENDOR)
@Controller({ path: 'vendor/products', version: '1' })
export class VendorProductsController {
  constructor(private readonly products: VendorProductsService) {}

  @Get()
  list(@Req() req: any) {
    return this.products.list(req.user.vendorId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateProductDto) {
    return this.products.create(req.user.vendorId, dto);
  }

  @Patch(':productId')
  update(@Req() req: any, @Param('productId') productId: string, @Body() dto: UpdateProductDto) {
    return this.products.update(req.user.vendorId, productId, dto);
  }

  @Delete(':productId')
  remove(@Req() req: any, @Param('productId') productId: string) {
    return this.products.remove(req.user.vendorId, productId);
  }
}
