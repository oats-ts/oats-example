import {
  generate,
  nameProviders,
  pathProviders,
  presets,
  prettierStringify,
  reader,
  writer,
} from '@oats-ts/openapi'
import prettierConfig from './.prettierrc.json'

generate({
  configuration: {
    log: true,
    name: nameProviders.default(),
    path: pathProviders.singleFile('src/generated/bookStore.ts'),
  },
  reader: reader({
    path: 'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/book-store.json',
  }),
  generators: presets.fullStack(),
  writer: writer({
    stringify: prettierStringify(prettierConfig),
  }),
})
