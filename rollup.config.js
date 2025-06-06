import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import banner from 'rollup-plugin-banner2';
import postcss from 'rollup-plugin-postcss';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const isProduction = process.env.NODE_ENV === 'production';

// 油猴脚本头部
const userscriptHeader = `// ==UserScript==
// @name         GitLab 周报生成器
// @namespace    http://tampermonkey.net/
// @version      ${pkg.version}
// @description  ${pkg.description}
// @author       ${pkg.author}
// @match        https://*/
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @require      none
// ==/UserScript==

(function() {
    'use strict';
`;

const userscriptFooter = `
})();`;

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
    banner(() => userscriptHeader),
    {
      name: 'userscript-footer',
      generateBundle(options, bundle) {
        for (const fileName in bundle) {
          const chunk = bundle[fileName];
          if (chunk.type === 'chunk') {
            chunk.code += userscriptFooter;
          }
        }
      }
    }
  ],
  external: [],
  onwarn(warning, warn) {
    // 忽略某些警告
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  }
};