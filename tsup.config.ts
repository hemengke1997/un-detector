import { defineConfig } from 'tsup'

export const tsup = defineConfig((option) => ({
  entry: ['src/index.ts'],
  target: 'es2015',
  dts: true,
  clean: !option.watch,
  format: ['cjs', 'esm'],
  platform: 'neutral',
  splitting: false,
  treeshake: true,
  minify: false,
  sourcemap: !!option.watch,
  tsconfig: option.watch ? 'tsconfig.dev.json' : 'tsconfig.json',
}))
