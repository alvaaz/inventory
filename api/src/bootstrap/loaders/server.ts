import { createBrandLoader } from '../../utils/createBrandLoader';
import { createCategoryLoader } from '../../utils/createCategoryLoader';
import { buildSchema } from "../../utils";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import session from 'express-session';
import connectRedis from 'connect-redis';
import { MyContext } from '../../utils'
import Redis from "ioredis";

export default async () => {
  const app = express();

  const RedisStore = connectRedis(session)
  const redis = new Redis('127.0.0.1:6379');

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redis,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: process.env.NODE_ENV === "production" // cookie only works in https
      },
      saveUninitialized: false,
      secret: 'dsfsfs',
      resave: false
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema(),
    context: ({ req, res }: MyContext) => ({
      req,
      res,
      categoryLoader: createCategoryLoader(),
      brandLoader: createBrandLoader()
    }),
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: '/graphql'
  })

  app.listen(4000, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000`
    )
  );
}
