const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const { default: dts } = require('rollup-plugin-dts');

const srcInput = ['src/index.ts', 'src/ionic-portals/index.ts']
const srcInputPlugins = [
  resolve(),
  commonjs(),
]

module.exports = [
  {
    input: srcInput,
    output: [
      {
        // Bundle into ESM for modern consumers.
        // Only ESM build can currently be tree-shaken.
        format: 'esm',
        sourcemap: true,
        dir: 'dist/mwa-utils/esm', // indicate not create a single-file
        preserveModules: true, // indicate not create a single-file
        preserveModulesRoot: 'src', // optional but useful to create a more plain folder structure
      },
    ],
    plugins: [
      ...srcInputPlugins,
      typescript({ tsconfig: './tsconfig.esm.json', sourceMap: true }),
    ]
  },
  {
    input: srcInput,
    output: [
      {
        // Bundle into CJS for other consumers.
        format: 'cjs',
        sourcemap: true,
        dir: 'dist/mwa-utils/cjs', // indicate not create a single-file
        preserveModules: true, // indicate not create a single-file
        preserveModulesRoot: 'src', // optional but useful to create a more plain folder structure
      },
    ],
    plugins: [
      ...srcInputPlugins,
      typescript({ tsconfig: './tsconfig.cjs.json', sourceMap: true }),
    ]
  },
  {
    input: 'dist/mwa-utils/esm/types/index.d.ts',
    output: [
      { file: 'dist/mwa-utils/index.d.ts', format: 'esm' }
    ],
    plugins: [dts()]
  }
]
