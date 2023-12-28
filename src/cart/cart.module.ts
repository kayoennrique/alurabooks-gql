import { Module } from '@nestjs/common';
import { BooksModule } from '../books/books.module';
import { CartResolver } from './resolvers/cart.resolver';
import { CartService } from './services/cart.service';

@Module({
  providers: [CartService, CartResolver],
  imports: [BooksModule],
})
export class CartModule {}
