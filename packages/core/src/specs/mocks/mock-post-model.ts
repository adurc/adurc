import { AdurcModel } from '../../interfaces/model';
import { TagModel } from './mock-tags-model';
import { UserModel } from './mock-user-model';

export interface PostModel {
    id: number;
    title: string;
    content?: string;
    published: boolean;
    authorId?: number;
    author?: UserModel;
    someTagId?: number;
    tags: TagModel[];
    someTag: TagModel;
}

export const adurcPostModel: AdurcModel = {
  accessorName: 'post',
  name: 'Post',
  source: 'mock',
  directives: [],
  fields: [
    { name: 'id', accessorName: 'id', type: 'int', nonNull: true, directives: [], collection: false, },
    { name: 'title', accessorName: 'title', type: 'string', nonNull: true, directives: [], collection: false, },
    { name: 'content', accessorName: 'content', type: 'string', nonNull: false, directives: [], collection: false, },
    { name: 'published', accessorName: 'published', type: 'boolean', nonNull: true, directives: [], collection: false, },
    { name: 'authorId', accessorName: 'authorId', type: 'int', nonNull: false, directives: [], collection: false, },
    { name: 'someTagId', accessorName: 'someTagId', type: 'int', nonNull: false, directives: [], collection: false, },
    { name: 'author', accessorName: 'author', type: { model: 'User', source: 'mock' }, nonNull: false, directives: [], collection: false, },
    { name: 'tags', accessorName: 'tags', type: { model: 'Tag', source: 'mock2', relation: { parentField: 'id', childField: 'userId' } }, nonNull: false, directives: [], collection: true, },
    { name: 'someTag', accessorName: 'someTag', type: { model: 'Tag', source: 'mock2', relation: { parentField: 'someTagId', childField: 'id' } }, nonNull: false, directives: [], collection: false, },
  ],
};