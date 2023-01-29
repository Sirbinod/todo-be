import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { TodoResolver } from "./resolvers/todo.resolvers";

const main = async () => {
  // graphql configuration
  const schema = await buildSchema({
    resolvers: [TodoResolver],
    emitSchemaFile: true,
    validate: false,
  });
  const port = process.env.PORT;
  const url = process.env.MANGO_URL || ""; // " mongodb url";

  // create mongoose connection
  const mongoose = await connect(url);
  await mongoose.connection;

  // apollo server configuration
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
  });

  const app = Express();

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: port }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:${port}${server.graphqlPath}`
    )
  );
};

main().catch((error) => {
  console.log(error, "error");
});
