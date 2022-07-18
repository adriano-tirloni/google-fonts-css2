import dts from 'rollup-plugin-dts'
import copy from 'rollup-plugin-copy'

import { writeFile, mkdir } from 'fs/promises'

function createCommonJsPackage() {
  const pkg = { type: 'commonjs' }
  return {
    name: 'cjs-package',
    buildEnd: async () => {
      await mkdir('./dist/cjs', { recursive: true })
      await writeFile('./dist/cjs/package.json', JSON.stringify(pkg, null, 2))
    }
  }
}

export default [
  {
    input: './src/my-lib.js',
    plugins: [
      copy({
        targets: [
          { src: './package.json', dest: 'dist' }
        ]
      }),
      createCommonJsPackage()
    ],
    output: [
      { format: 'es', file: './dist/esm/my-lib.js' },
      { format: 'cjs', file: './dist/cjs/my-lib.js' }
    ]
  },
  {
    input: './src/my-lib.js',
    plugins: [ dts() ],
    output: {
      format: 'es',
      file: './dist/my-lib.d.ts'
    }
  }
]