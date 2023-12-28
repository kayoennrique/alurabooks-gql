import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class OptionPurchase {
  @Field((type) => Int)
  id: number;
  @Field((type) => String)
  title: string;
  @Field((type) => [String], { nullable: true })
  formats?: string[];
  @Field((type) => Number)
  price: number;
}
