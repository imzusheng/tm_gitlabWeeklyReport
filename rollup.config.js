import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import banner from 'rollup-plugin-banner2';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';
import { generateUserscriptHeader } from './userscript.config.js';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.user.js',
    format: 'iife',
    name: 'GitLabWeeklyReport',
    sourcemap: !isProduction
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true
    }),
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: !isProduction
    }),
    postcss({
      extensions: ['.css'],
      inject: true,
      minimize: isProduction
    }),
    isProduction && terser(),
    banner(() => generateUserscriptHeader(pkg.version))
  ],
  external: [],
  onwarn(warning, warn) {
    // 忽略某些警告
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  }
};