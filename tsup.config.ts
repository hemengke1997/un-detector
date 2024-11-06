import { defineConfig, type Options } from 'tsup'
import { bundleless } from 'tsup-plugin-bundleless'

const tsupConfig = (option: Options): Options => ({
  target: 'es6',
  dts: true,
  clean: !option.watch,
  platform: 'neutral',
  splitting: false,
  treeshake: true,
  minify: false,
  sourcemap: !!option.watch,
  tsconfig: option.watch ? 'tsconfig.dev.json' : 'tsconfig.json',
})

export const tsup = defineConfig((option) => [
  {
    ...tsupConfig(option),
    entry: ['src/**/*.ts'],
    format: ['esm'],
    outDir: 'dist/es',
    ...bundleless(),
  },
  {
    ...tsupConfig(option),
    entry: ['src/index.ts'],
    format: ['cjs'],
    outDir: 'dist/lib',
  },
])
