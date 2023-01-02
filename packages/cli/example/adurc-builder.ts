import { AdurcBuilder } from '@adurc/core';
import { PostAdurcModel } from './post-model';
import { UserAdurcModel } from './user-model';

const builder = new AdurcBuilder();

builder.use(function (context) {
  context.addSource({ name: 'adurc', driver: null as any });
  context.addModel(UserAdurcModel);
  context.addModel(PostAdurcModel);
});

export default builder;
