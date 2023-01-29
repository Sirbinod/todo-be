import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The todo model" })
export class Todo {
  [x: string]: any;
  @Field(() => ID)
  id: number;

  @Field()
  @Property({ required: true })
  name: String;

  @Field()
  @Property({ required: true })
  description: String;
}

export const TodoModel = getModelForClass(Todo);
