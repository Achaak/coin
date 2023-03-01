import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  minify: !options.watch,
  entry: ['src'],
  sourcemap: true,
  dts: true,
  format: ['cjs', 'esm'],
  clean: true,
}));
