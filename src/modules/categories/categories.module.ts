import { Module } from '@nestjs/common';
import { AdminCategoriesController } from './controllers/admin-categories.controller';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';

@Module({ controllers: [CategoriesController, AdminCategoriesController], providers: [CategoriesService] })
export class CategoriesModule {}
