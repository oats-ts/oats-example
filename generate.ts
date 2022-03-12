import { rm } from 'fs/promises'

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

const OUTPUT_PATH = 'src/generated'

async function clearAndGenerate() {
  await rm(OUTPUT_PATH, { force: true, recursive: true })
  return generate({
    configuration: {
      log: true,
      name: nameProviders.default(),
      path: pathProviders.byTarget(OUTPUT_PATH, {
        'json-schema/type': 'myTypes.ts',
      }),
    },
    reader: reader({
      path: 'https://raw.githubusercontent.com/oats-ts/oats-schemas/master/schemas/ignored-schemas.json',
    }),
    generators: [
      generators.types(),
      generators.typeGuards({
        ignore: (schema: any) => {
          return Boolean(schema['x-ignore'])
        },
      }),
    ],
    writer: writer({
      stringify: prettierStringify(prettierConfig),
    }),
  })
}

clearAndGenerate()
