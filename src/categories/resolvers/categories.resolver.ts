import {
  Resolver,
  ResolveField,
  Parent,
  Query,
  Args,
  Int,
} from '@nestjs/graphql';
import { Author } from '../../authors/models/author.model';
import { AuthorsService } from 'src/authors/services/author.service';
import { Categorie } from '../models/categorie.model';
import { CategoriesService } from '../services/categories.service';

@Resolver((of) => Categorie)
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  @Query((returns) => [Categorie])
  async categories(): Promise<Categorie[]> {
    return this.categoriesService.searchAll();
  }
}