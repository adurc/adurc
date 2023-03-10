import { AdurcModel } from '../../interfaces/model';

export interface UserWithDirectiveModel {
    id: number;
    email: string;
    name?: string;
    age: number;
}

export const adurcUserWithDirectiveModel: AdurcModel = {
  accessorName: 'user',
  name: 'User',
  source: 'mock',
  directives: [{
    provider: 'adurc',
    name: 'model',
    args: { name: 'User' },
  }],
  fields: [
    { name: 'id', accessorName: 'id', type: 'int', nonNull: true, directives: [{ provider: 'adurc', name: 'field', args: { name: 'id' } }], collection: false, },
    { name: 'name', accessorName: 'name', type: 'string', nonNull: true, directives: [], collection: false, },
    { name: 'email', accessorName: 'email', type: 'string', nonNull: true, directives: [], collection: false, },
    { name: 'age', accessorName: 'age', type: 'int', nonNull: true, directives: [], collection: false, },
  ],
};