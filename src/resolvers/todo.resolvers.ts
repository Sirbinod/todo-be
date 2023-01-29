import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Todo, TodoModel } from "../entities/todo.entities";
import { TodoInput, TodosRes, TodoUpdate } from "./types/todo.input";
import { CommonResult } from "../common/common.interface";
import { TodoRes } from "./types/todo.input";
import { Response } from "../common/common.response";
import { HttpCode } from "../common/common.response";

@Resolver((_of) => Todo)
export class TodoResolver {
  constructor() {}

  // todo create
  @Mutation(() => TodoRes)
  async CreateTodo(@Arg("data") input: TodoInput): Promise<CommonResult<Todo>> {
    try {
      const todo = (await TodoModel.create(input)).save();
      return Response(HttpCode.CREATE, "Todo created successfully.", todo);
    } catch (error) {
      return Response(
        HttpCode.INTERNAL_SERVER_ERROR,
        "Internal server error",
        null
      );
    }
  }

  // get all todo
  @Query(() => TodosRes)
  async FindTodos(): Promise<CommonResult<Todo>> {
    try {
      const todo = await await TodoModel.find();
      return Response(HttpCode.OK, "Todo fatch successfully.", todo);
    } catch (error) {
      return Response(
        HttpCode.INTERNAL_SERVER_ERROR,
        "Internal server error",
        null
      );
    }
  }

  // get one todo
  @Query(() => TodoRes)
  async FindOneTodo(@Arg("id") id: string): Promise<CommonResult<Todo>> {
    try {
      const todo = await await TodoModel.findById({ _id: id });
      return Response(HttpCode.OK, "Todo fatch successfully.", todo);
    } catch (error) {
      return Response(
        HttpCode.INTERNAL_SERVER_ERROR,
        "Internal server error",
        null
      );
    }
  }

  // update todo
  @Mutation(() => TodoRes)
  async UpdateTodo(
    @Arg("data") input: TodoUpdate
  ): Promise<CommonResult<Todo>> {
    try {
      const getTodo = await await TodoModel.findById({ _id: input.id });
      if (getTodo) {
        const body = {
          name: input.name,
          description: input.description,
        };
        const todo = await TodoModel.findByIdAndUpdate(input.id, body, {
          new: true,
        });
        return Response(HttpCode.OK, "Todo Updated successfully.", todo);
      } else {
        return Response(HttpCode.BAD_REQUEST, "Todo input invalid.", null);
      }
    } catch (error) {
      return Response(
        HttpCode.INTERNAL_SERVER_ERROR,
        "Internal server error",
        null
      );
    }
  }

  // delete todo
  @Mutation(() => TodoRes)
  async DeleteTodo(@Arg("id") id: string): Promise<CommonResult<Todo>> {
    try {
      await await TodoModel.deleteOne({ _id: id });
      return Response(HttpCode.OK, "Todo Deleted successfully.", null);
    } catch (error) {
      return Response(
        HttpCode.INTERNAL_SERVER_ERROR,
        "Internal server error",
        null
      );
    }
  }
}
