import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Author {
  @Field((type) => Int)
  id: number;
  @Field((type) => String)
  name: string;
  @Field((type) => String)
  about: string;
}
