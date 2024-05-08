import { moduleTools, defineConfig } from '@modern-js/module-tools';
import { testingPlugin } from '@modern-js/plugin-testing';

export default defineConfig({
  plugins: [moduleTools(), testingPlugin()],
  buildPreset: 'npm-library',
  tools: {
    jest: options => {
      return {
        ...options,
        moduleDirectories: ['node_modules', 'src/external-libs-sources'],
        moduleNameMapper: {
          ...(options.moduleNameMapper ?? {}),
          '.*/ionicPortals0.7': 'ionicPortals0.7/dist/index.js',
          '.*/capacitorCore4': 'capacitorCore4/dist/index.js',
        },
      };
    },
  },
});
