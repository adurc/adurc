#!/usr/bin/env node

import fs from 'fs';
import { AdurcBuilder } from '@adurc/core';
import { BuilderStage } from '@adurc/core/dist/interfaces/builder.generator';
import { Command } from 'commander';
import { generateTypes } from './generate-types';
import { AdurcSchemaBuilder } from '@adurc/core/dist/schema.builder';

const program = new Command();
program.version('0.1.1');

program
  .command('generate-types [adurc-builder] [output]')
  .description('generate types from models importe into adurc builder')
  .action(async function (path, output) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const builder: AdurcBuilder = require(process.cwd() + '/' + path).default;
    if (builder && 'build' in builder) {
      let controlledError = false;
      let adurcContext: AdurcSchemaBuilder;
      builder.use(function* (context) {
        adurcContext = context;
        yield BuilderStage.OnInit;
        controlledError = true;
        throw new Error('controller error to break pipeline');
      });

      try {
        await builder.build();
        console.log('An error ocurred building types');
      } catch (e) {
        if (controlledError) {
          const content = generateTypes(adurcContext);
          fs.writeFileSync(process.cwd() + '/' + output, content);
          console.log('generated types and saved output into "%s"', output);
        } else {
          console.log('An error ocurred building adurc instance: ' + e.toString());
        }
      }
    } else {
      console.log('file "%s" not export adurc builder', path);
    }
  });

program.parse(process.argv);
