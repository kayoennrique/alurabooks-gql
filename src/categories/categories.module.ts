import { Module } from '@nestjs/common';
import { CategoriesResolver } from './resolvers/categories.resolver';
import { CategoriesService } from './services/categories.service';

@Module({
  providers: [CategoriesService, CategoriesResolver],
})
export class CategoriesModule {}
