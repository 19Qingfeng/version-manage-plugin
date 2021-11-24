import { ENV_LIST, ENV_VARIABLE, pluginName } from './constant';

function generatorPackageJson(
  targetName: string,
  version: string = '1.0.0',
  registry: string = 'http://registry.npmjs.org/'
) {
  return `
{
  "name": "${targetName}",
  "version": "${version}",
  "description": "Tea app style",
  "main": "index.css",
  "keywords": [
    "tea",
    "qcloud",
    "style"
  ],
  "publishConfig": {
    "registry": "${registry}"
  },
  "license": "UNLICENSED"
}
`;
}

function invalidValue(value: string) {
  const result = ENV_LIST.includes(value);
  if (!result) {
    throw new Error(
      `${pluginName}: ${ENV_VARIABLE} must be one of the${ENV_LIST.toString()},but got ${value}.`
    );
  }
  return true;
}

export { generatorPackageJson, invalidValue };
