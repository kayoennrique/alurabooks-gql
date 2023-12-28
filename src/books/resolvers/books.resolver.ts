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
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';
import { Tag } from '../models/tag.model';
import { Highlights } from '../models/highlights.mode';

@Resolver((of) => Book)
export class BooksResolver {
  constructor(
    private authorsService: AuthorsService,
    private booksService: BooksService,
  ) {}

  @Query((returns) => [Book])
  async books(
    @Args('title', { type: () => String, nullable: true }) title: string,
    @Args('categorieId', { type: () => Int, nullable: true })
    categorieId: number,
  ): Promise<Book[]> {
    return this.booksService.searchAll(title, categorieId);
  }

  @Query((returns) => Book)
  async book(
    @Args('slug', { type: () => String, nullable: false }) slug: string,
  ): Promise<Book> {
    return this.booksService.searchBySlug(slug);
  }

  @Query((returns) => Highlights)
  async highlights(): Promise<Highlights> {
    return this.booksService.searchHighlights();
  }

  @ResolveField('autor', (returns) => Author)
  async autor(@Parent() book: Book): Promise<Author> {
    const { authorId } = book;
    return this.authorsService.searchById(authorId);
  }

  @ResolveField('tags', (returns) => [Tag])
  async tags(@Parent() book: Book): Promise<Tag[]> {
    return this.booksService.searchByTagsDo(book);
  }
}
