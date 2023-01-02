import { AdurcModelBuilder } from '@adurc/core/dist/interfaces/context';

export const UserAdurcModel: AdurcModelBuilder = {
  source: 'adurc',
  name: 'User',
  directives: [],
  fields: [
    {
      name: 'id',
      type: 'int',
      collection: false,
      nonNull: true,
      directives: [],
    },
    {
      name: 'name',
      type: 'string',
      collection: false,
      nonNull: true,
      directives: [],
    },
    {
      name: 'email',
      type: 'string',
      collection: false,
      nonNull: true,
      directives: [],
    },
    {
      name: 'posts',
      type: { model: 'Post', source: 'adurc' },
      collection: true,
      nonNull: true,
      directives: [],
    },
  ],
};
