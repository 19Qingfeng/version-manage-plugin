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

export { generatorPackageJson };
