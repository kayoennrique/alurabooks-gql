import { Field, Int, ObjectType } from '@nestjs/graphql';
import { OptionPurchase } from './purchase-option.model';
import { Tag } from './tag.model';
@ObjectType()
export class Book {
  @Field((type) => Int)
  id: number;
  @Field((type) => Int)
  authorId: number;
  @Field((type) => Int)
  categorieId: number;
  @Field((type) => String)
  title: string;
  @Field((type) => String)
  slug: string;
  @Field((type) => String)
  description: string;
  @Field((type) => String)
  isbn: string;
  @Field((type) => Number)
  numberPages: number;
  @Field((type) => String)
  publication: string;
  @Field((type) => String)
  imageCover: string;
  @Field((type) => String)
  about: string;
  @Field((type) => [OptionPurchase])
  optionPurchase: OptionPurchase[];
  tagIds: number[];
  @Field((type) => [Tag])
  tags: Tag[];
}
