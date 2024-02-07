import path from 'node:path'
import resolve from 'resolve'
import { type Options, defineConfig } from 'tsup'

const nodeResolve = (id: string, opts: resolve.Opts) => {
  return resolve.sync(id, {
    extensions: ['.ts'],
    ...opts,
  })
}

const fileSuffixPlugin: NonNullable<Options['esbuildPlugins']>[0] = {
  name: 'add-file-suffix',
  setup(build) {
    build.onResolve({ filter: /.*/ }, async (args) => {
      if (args.kind === 'entry-point') return
      const importeePath = args.path

      // is external module
      if (importeePath[0] !== '.' && !path.isAbsolute(importeePath)) {
        return {}
      }

      if (!importeePath.endsWith('.js')) {
        try {
          const resolvedPath = nodeResolve(importeePath, {
            basedir: args.resolveDir,
          })
          if (resolvedPath) {
            // convert ts path to js path
            return { path: resolvedPath.replace(/\.ts$/, '.js'), external: true }
          }
        } catch {
          return {}
        }
      }
      return { path: importeePath }
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
