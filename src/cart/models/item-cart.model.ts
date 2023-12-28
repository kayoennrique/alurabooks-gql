import { Field, ObjectType } from '@nestjs/graphql';
import { OptionPurchase } from 'src/books/models/purchase-option.model';
import { Book } from '../../books/models/book.model';
@ObjectType()
export class ItemCart {
  @Field((type) => Number)
  amount: number;
  @Field((type) => Number)
  bookId: number;
  @Field((type) => Number)
  optionPurchaseId: number;
  @Field((type) => OptionPurchase)
  optionPurchase?: OptionPurchase;
  @Field((type) => Book)
  book?: Book;
}
