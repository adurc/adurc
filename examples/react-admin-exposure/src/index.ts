import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { BuilderStage } from '@adurc/core/dist/interfaces/builder.generator';
import { ReactAdminExposure } from '@adurc/exposure-react-admin';
import dotenv from 'dotenv';
dotenv.config();
import builder from './adurc-builder';

async function bootstrap() {
  const app = express();

  app.use(express.json());

  builder.use(
    ReactAdminExposure.use(
      ApolloServer,
      {
        playground: true,
      },
      (apollo) => apollo.applyMiddleware({ app, path: '/graphql' })
    )
  );

  builder.use(function* customGenerator(context) {
    context.logger.debug('[sample] customer generator: builder before init');

    context.addMiddleware({
      action: async (req, next) => {
        const startAt = new Date();
        await next();
        const endAt = new Date();
        const elapsed: number = endAt.getTime() - startAt.getTime();
        context.logger.info(`[sample] invoked model ${req.model.name}, method: ${req.method} - elapsed: ${elapsed}`);
      },
    });

    yield BuilderStage.OnInit;
    context.logger.debug('[sample] customer generator: models found ' + context.models.length);
  });

  const adurc = await builder.build();

  app.listen(3000);

  console.log('[sample] Serving the GraphQL Playground on http://localhost:3000/graphql');

  console.log('[sample] Example using adurc directly like prisma:');

  const users = await adurc.client.user.findMany({
    select: {
      name: true,
    },
  });

  for (const user of users) {
    console.log(`[sample] User ${JSON.stringify(user)}`);
  }

  return app;
}

bootstrap();
