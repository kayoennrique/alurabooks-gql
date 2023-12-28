import {
  Resolver,
  Query,
  Mutation,
  Args,
  InputType,
  Field,
} from '@nestjs/graphql';
import { Cart } from '../models/cart.model';
import { CartService } from '../services/cart.service';

@InputType()
export class ItemCartInput {
  @Field()
  bookId: number;
  @Field()
  optionPurchaseId: number;
  @Field({ nullable: true })
  amount?: number;
}

@Resolver((of) => Cart)
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query((returns) => Cart)
  async cart(): Promise<Cart> {
    return this.cartService.search();
  }

  @Mutation((returns) => Boolean)
  async addItem(@Args('item') item: ItemCartInput) {
    await this.cartService.add(item);
    return true;
  }

  @Mutation((returns) => Boolean)
  async toRemoveItem(@Args('item') item: ItemCartInput) {
    await this.cartService.toRemove(item);
    return true;
  }
}
