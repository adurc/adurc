
import { AdurcDeleteArgs } from '@adurc/core/dist/interfaces/client/delete.args';
import { MSSQLEntity } from '../interfaces/mssql-entity';
import { DeleteContextQueryBuilder } from './delete.context';
import { FindQueryBuilder } from './find.builder';
import { WhereBuilder } from './where.builder';

export class DeleteQueryBuilder {

  static build(entities: MSSQLEntity[], entity: MSSQLEntity, args: AdurcDeleteArgs): DeleteContextQueryBuilder {
    const context = new DeleteContextQueryBuilder();

    args.where && WhereBuilder.buildWhere(args.where, entity, context);

    context.entity = entity;

    if ('select' in args || 'include' in args) {
      context.tempTable = '@outputData';
      context.returning = FindQueryBuilder.build(entities, entity, { select: args.select, include: args.include });
      context.returning.from = { type: 'object', name: '@outputData', as: context.returning.from.as };
    }

    return context;
  }

}
