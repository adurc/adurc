import { AdurcPrimitiveDefinition } from '@adurc/core/dist/interfaces/common';
import { AdurcSchemaBuilder } from '@adurc/core/dist/schema.builder';
import pascalcase from 'pascalcase';
import { Project } from 'ts-morph';

export interface test {
  pepe: boolean;
}

function adurcFieldTypeToTsMorph(type: AdurcPrimitiveDefinition) {
  switch (type) {
    case 'buffer':
      return 'Buffer';
    case 'date':
      return 'Date';
    case 'string':
    case 'uuid':
      return 'string';
    case 'float':
    case 'int':
      return 'number';
    case 'boolean':
      return 'boolean';
  }
}

export function generateTypes(schema: AdurcSchemaBuilder): string {
  const project = new Project();
  const file = project.createSourceFile('types.ts');

  const modelNames: Record<string, string> = {};

  schema.models.forEach((x) => (modelNames[x.name] = 'I' + pascalcase(x.name) + 'Model'));

  for (const model of schema.models) {
    const astModel = file.addInterface({
      name: modelNames[model.name],
      isExported: true,
    });

    for (const field of model.fields) {
      astModel.addProperty({
        name: field.accessorName,
        type:
          (typeof field.type === 'string' ? adurcFieldTypeToTsMorph(field.type) : modelNames[field.type.model]) +
          (field.collection ? '[]' : ''),
        hasQuestionToken: field.nonNull !== true,
      });
    }
  }

  const astAdurcModels = file.addInterface({ name: 'AdurcModels', isExported: true });

  for (const model of schema.models) {
    astAdurcModels.addProperty({
      name: model.accessorName,
      type: modelNames[model.name],
    });
  }

  return file.print();
}
