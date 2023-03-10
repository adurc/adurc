import { BuilderGeneratorFunction, BuilderStage } from '@adurc/core/dist/interfaces/builder.generator';
import { Config } from 'apollo-server-core';
import { GraphqlDocumentBuilder } from './graphql-document-builder';
import { ReactAdminModelBuilder } from './react-admin-model-builder';
import { ReactAdminResolverBuilder } from './react-admin-resolver-builder';

export class ReactAdminExposure {
  static use<T>(
    ApolloServer: { new (config: Config): T },
    config: Omit<Config, 'typeDefs' | 'resolvers'>,
    onApolloServerCreated: (apolloServer: T) => void
  ): BuilderGeneratorFunction {
    return async function* SourceGenerator(context) {
      ReactAdminResolverBuilder.logger = context.logger;

      context.addDirective({
        provider: 'ra',
        name: 'pk',
        composition: 'field',
      });

      context.addDirective({
        provider: 'ra',
        name: 'has_default',
        composition: 'field',
      });

      context.addDirective({
        provider: 'ra',
        name: 'computed',
        composition: 'field',
      });

      yield BuilderStage.OnAfterInit;

      if (!context.adurc) {
        throw new Error('[exposure-react-admin] expected adurc at context in stage OnAfterInit');
      }

      const models = ReactAdminModelBuilder.build(context.logger, context.models);

      const server = new ApolloServer({
        ...config,
        typeDefs: GraphqlDocumentBuilder.build(models),
        resolvers: ReactAdminResolverBuilder.build(context.adurc, models),
      });

      onApolloServerCreated(server);
    };
  }
}
