import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
// import replacement from "rollup-plugin-module-replacement";
// import searchAndReplace from 'rollup-plugin-search-and-replace';
import replace from '@rollup/plugin-replace';
const fs = require('fs')
const path = require('path')

function resolveThreeModule() {
  const threePath = require.resolve('three')
  const code = fs.readFileSync(path.resolve(threePath), 'utf8');
  return code
}

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: [
      {
        name: 'wisdom_applet',
        file: pkg.browser,
        format: 'umd',
        plugins: [uglify()],
      },
      {
        file: pkg.browserMin,
        format: 'umd',
        name: 'version',
        plugins: [uglify()],
      },
    ],
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          __INJECT_THREE__: resolveThreeModule()
        }
      }),
      resolve(),
      commonjs(),
      eslint({
        include: ['src/**'],
        exclude: ['node_modules/**'],
      }),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        extensions: ['.js', '.ts'],
      }),
      // searchAndReplace({
      //   entry: {
      //     files: path.resolve(__dirname, "./src/createThree/index.js"),
      //     from: /__INJECT_THREE__/g,
      //     to: resolveThreeModule()
      //   },
      //   hook: 'resolveId'
      // }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          __INJECT_THREE__: resolveThreeModule()
        }
      }),
    ],
  },
];