import { Module } from '@nestjs/common';
import { CartsController } from './controllers/carts.controller';
import { CartsService } from './services/carts.service';

@Module({ controllers: [CartsController], providers: [CartsService] })
export class CartsModule {}
