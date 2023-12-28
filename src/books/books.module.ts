import { Module } from '@nestjs/common';
import { AuthorsModule } from 'src/authors/authors.module';
import { BooksResolver } from './resolvers/books.resolver';
import { BooksService } from './services/books.service';

@Module({
  providers: [BooksService, BooksResolver],
  exports: [BooksService],
  imports: [AuthorsModule],
})
export class BooksModule {}
