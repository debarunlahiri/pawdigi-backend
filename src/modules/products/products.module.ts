import { Module } from '@nestjs/common';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { AdminProductsController } from './controllers/admin-products.controller';
import { ProductsController } from './controllers/products.controller';
import { VendorProductsController } from './controllers/vendor-products.controller';
import { AdminProductsService } from './services/admin-products.service';
import { ProductSearchService } from './services/product-search.service';
import { ProductsService } from './services/products.service';
import { VendorProductsService } from './services/vendor-products.service';

@Module({
  imports: [AuditLogsModule],
  controllers: [ProductsController, VendorProductsController, AdminProductsController],
  providers: [ProductsService, VendorProductsService, AdminProductsService, ProductSearchService],
})
export class ProductsModule {}
