import { AdurcBuilder } from '@adurc/core';
import { SqlServerDriver } from '@adurc/driver-mssql';
import { GraphQLIntrospector } from '@adurc/introspector-graphql';

import dotenv from 'dotenv';
dotenv.config();

const builder = new AdurcBuilder();

builder.use(
  SqlServerDriver.use('adurc', {
    database: process.env.DB_DATABASE,
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT ?? '1433', 10),
    options: {
      instanceName: process.env.DB_INSTANCE,
    },
  })
);

builder.use(
  GraphQLIntrospector.use({
    path: process.cwd() + '/models/*.graphql',
    encoding: 'utf8',
    defaultSourceName: 'adurc',
  })
);

export default builder;
