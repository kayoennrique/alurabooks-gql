import { Field, ObjectType } from '@nestjs/graphql';
import { Book } from './book.model';

@ObjectType()
export class Highlights {
  @Field((type) => [Book])
  releases: Book[];
  @Field((type) => [Book])
  bestSellers: Book[];
}
