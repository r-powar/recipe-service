import mongoose from 'mongoose';
import { config } from 'dotenv';
import { ApolloServer, addResolveFunctionsToSchema } from 'apollo-server-express';
import { buildFederatedSchema } from '@apollo/federation';
import { pickBy, mapValues } from 'lodash/fp';
import express from 'express';
import resolvers from './resolvers';
import errorHandler from './middleware/errorHandler';
import typeDefs from './schema/schema';
import connectDB from './config/db';

config();

const apolloServer = ({
  app, path,
}: {
  app: any, path?: string,
}): any => {
  // const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
  // const resolversOnly = pickBy(((r: any) => r.__resolveReference), resolvers);
  // const referenceResolvers = mapValues(
  //   (rs: any) => ({ __resolveReference: rs.__resolveReference }),
  //   resolversOnly,
  // );
  // addResolveFunctionsToSchema({
  //   schema,
  //   resolvers: referenceResolvers,
  //   resolverValidationOptions: {
  //     requireResolversForResolveType: false,
  //   },
  // });

  const server = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error(error);
      return {
        message: error.message,
        statusCode: error.extensions?.code,
      };
    },
  });

  server.applyMiddleware({ app, path });

  return server;
};

connectDB();

const port = process.env.PORT;
const app = express();

apolloServer({
  app,
  path: '/graphql',
});

app.use(errorHandler);

const expressServer = app.listen({ port }, () => {
  console.log({ message: `Code Challenge service ready at localhost:${port}/graphql` });
});

process.on('SIGINT', () => {
  console.log({ message: `[PID ${process.pid}] Received SIGINT...` });
  process.kill(process.pid, 'SIGTERM');
});

process.on('SIGTERM', async () => {
  console.log({ message: `[PID ${process.pid}] Received SIGTERM...` });
  console.log({ message: `[PID ${process.pid}] Shutting down gracefully...` });

  expressServer.close();
  console.log({ message: `[PID ${process.pid}] HTTP server closed...` });

  await mongoose.disconnect();
  console.log({ message: `[PID ${process.pid}] MongoDB connection closed...` });

  console.log({ message: `[PID ${process.pid}] exiting...` });
  process.exit(0);
});
