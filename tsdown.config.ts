import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  deps: {
    neverBundle: ['@capacitor/core', '@egym/mwa-logger', '@ionic/portals'],
  },
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  platform: 'browser',
  sourcemap: false,
  target: 'es2018',
  tsconfig: 'tsconfig.build.json',
});
