import {
  generate,
  generators,
  nameProviders,
  pathProviders,
  prettierStringify,
  reader,
  writer,
} from '@oats-ts/openapi'
import prettierConfig from './.prettierrc.json'

generate({
  configuration: {
    log: true,
    name: nameProviders.default(),
    path: pathProviders.singleFile('src/generated/types.ts'),
  },
  reader: reader({
    path: 'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/union-type-schemas.json',
  }),
  generators: [generators.types()],
  writer: writer({
    stringify: prettierStringify(prettierConfig),
  }),
})
