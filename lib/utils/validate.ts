import { validate } from 'schema-utils';
import { ValidationErrorConfiguration } from 'schema-utils/declarations/validate';
import { JSONSchema7 } from 'json-schema';
import { Options } from '../core';
import path from 'path';
import { pluginName } from './constant';

const schema: JSONSchema7 = {
  type: 'object',
  properties: {
    name: {
      description: 'Please enter the release package name.',
      type: 'string',
    },
    output: {
      description: 'Please output a folder path after packaging.',
      type: 'string',
    },
    rootDir: {
      description: 'Please enter the project root directory path',
      type: 'string',
    },
    registry: {
      description: 'please enter the npm registered address.',
      type: 'string',
    },
  },
  required: ['name', 'output', 'rootDir'],
  additionalProperties: false,
};

function validateParams(
  options: Options,
  configuration: ValidationErrorConfiguration
) {
  validate(schema, options, configuration);
  const output = options.output;
  if (!path.isAbsolute(output)) {
    throw new Error(`${pluginName}: Options.output must be a absolute path.`);
  }
  const rootDir = options.rootDir;
  if (!path.isAbsolute(rootDir)) {
    throw new Error(`${pluginName}: Options.rootDir must be a absolute path.`);
  }
}

export { validateParams };
