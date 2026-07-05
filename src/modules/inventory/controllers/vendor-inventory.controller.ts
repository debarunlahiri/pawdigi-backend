import { Body, Controller, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { VendorApprovedGuard } from '../../../common/guards/vendor-approved.guard';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';
import { InventoryService } from '../services/inventory.service';

@ApiBearerAuth()
@ApiTags('Vendor Inventory')
@UseGuards(JwtAuthGuard, RolesGuard, VendorApprovedGuard)
@Roles(Role.VENDOR)
@Controller({ path: 'vendor/inventory', version: '1' })
export class VendorInventoryController {
  constructor(private readonly inventory: InventoryService) {}
  @Patch(':productId')
  update(@Req() req: any, @Param('productId') productId: string, @Body() dto: UpdateInventoryDto) {
    return this.inventory.update(req.user.vendorId, productId, dto);
  }
}
