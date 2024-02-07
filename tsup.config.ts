import fs from 'node:fs'
import path from 'node:path'
import { type Options, defineConfig } from 'tsup'

const fileSuffixPlugin: NonNullable<Options['esbuildPlugins']>[0] = {
  name: 'add-file-suffix',
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      if (args.kind === 'entry-point') return
      let importeePath = args.path

      // is external module?
      if (importeePath[0] !== '.' && !path.isAbsolute(importeePath)) {
        return {}
      }
      if (!importeePath.endsWith('.js')) {
        // is path dir?
        const filePath = path.join(args.resolveDir, importeePath)

        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
          // if path is dir, then append /index.js
          importeePath += '/index.js'
        } else {
          // else append .js
          importeePath += '.js'
        }
      }
      return { path: importeePath, external: true }
    })
  },
}

export const tsup = defineConfig((option) => ({
  entry: ['src/**/*.ts'],
  target: 'es6',
  dts: true,
  clean: !option.watch,
  format: ['cjs', 'esm'],
  platform: 'neutral',
  splitting: false,
  treeshake: true,
  legacyOutput: true,
  esbuildPlugins: [fileSuffixPlugin],
  minify: !option.watch,
  sourcemap: !!option.watch,
  tsconfig: option.watch ? 'tsconfig.dev.json' : 'tsconfig.json',
}))
