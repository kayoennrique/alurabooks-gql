import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ItemCart } from './item-cart.model';
@ObjectType()
export class Cart {
  @Field((type) => Number)
  total: number;
  @Field((type) => [ItemCart])
  itens: ItemCart[];
}
