import fs from 'node:fs'
import path from 'node:path'
import { type Options, defineConfig } from 'tsup'

const fileSuffixPlugin = (format: 'esm' | 'cjs'): NonNullable<Options['esbuildPlugins']>[0] => ({
  name: 'add-file-suffix',
  setup(build) {
    build.onResolve({ filter: /.*/ }, (args) => {
      if (args.kind === 'entry-point') return
      let importeePath = args.path

      // is external module
      if (importeePath[0] !== '.' && !path.isAbsolute(importeePath)) {
        return {}
      }

      const suffix = format === 'cjs' ? '.cjs' : '.js'

      if (!importeePath.endsWith('.js')) {
        // is path dir?
        const filePath = path.join(args.resolveDir, importeePath)

        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
          // if path is dir, then append /index.js
          importeePath += `/index${suffix}`
        } else {
          // else append .js
          importeePath += suffix
        }
        return { path: importeePath, external: true }
      }
      return {}
    })
  },
})

const tsupConfig = (option: Options): Options => ({
  entry: ['src/**/*.ts'],
  target: 'es6',
  dts: true,
  clean: !option.watch,
  platform: 'neutral',
  splitting: false,
  treeshake: true,
  minify: !option.watch,
  sourcemap: !!option.watch,
  tsconfig: option.watch ? 'tsconfig.dev.json' : 'tsconfig.json',
})

export const tsup = defineConfig((option) => [
  {
    ...tsupConfig(option),
    format: ['esm'],
    outDir: 'dist/es',
    outExtension: () => ({ js: '.js' }),
    esbuildPlugins: [fileSuffixPlugin('esm')],
  },
  {
    ...tsupConfig(option),
    format: ['cjs'],
    outDir: 'dist/lib',
    outExtension: () => ({ js: '.cjs' }),
    esbuildPlugins: [fileSuffixPlugin('cjs')],
  },
])
