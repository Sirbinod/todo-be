import { InputType, Field, ObjectType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class TodoInput {
  @Field()
  @Length(1, 100)
  name: String;

  @Field()
  @Length(1, 1000)
  description: String;
}

@InputType()
export class TodoUpdate {
  @Field()
  id: String;

  @Field()
  @Length(1, 100)
  name: String;

  @Field()
  @Length(1, 1000)
  description: String;
}

@ObjectType()
export class Item {
  @Field()
  id: String;

  @Field()
  name: String;

  @Field()
  description: String;
}

@ObjectType()
export class TodoRes {
  @Field()
  status: String;

  @Field()
  message: String;

  @Field({ nullable: true })
  data: Item;
}

@ObjectType()
export class TodosRes {
  @Field()
  status: String;

  @Field()
  message: String;

  @Field(() => [Item])
  data: Item;
}
