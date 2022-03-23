import { rm } from 'fs/promises'

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

const OUTPUT_PATH = 'src/generated'

async function clearAndGenerate() {
  await rm(OUTPUT_PATH, { force: true, recursive: true })
  return generate({
    configuration: {
      log: true,
      name: nameProviders.default(),
      path: pathProviders.default(OUTPUT_PATH),
    },
    reader: reader({ path: 'openapi/book-store.json' }),
    generators: presets.server(),
    writer: writer({
      stringify: prettierStringify(prettierConfig),
    }),
  })
}

clearAndGenerate()
