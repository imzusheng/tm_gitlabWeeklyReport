import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import banner from 'rollup-plugin-banner2';
import del from 'rollup-plugin-delete';
import serve from 'rollup-plugin-serve';
import { readFileSync } from 'fs';
import { join } from 'path';

// 读取package.json获取版本信息
const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));

// 油猴脚本头部信息
const userscriptHeader = `// ==UserScript==
// @name         GitLab周报生成器
// @namespace    http://tampermonkey.net/
// @version      ${pkg.version}
// @description  通过GitLab API获取事件数据，使用Deepseek API生成周报
// @author       ${pkg.author}
// @match        https://www.lejuhub.com/*
// @match        http://localhost:*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        unsafeWindow
// @connect      *
// ==/UserScript==

`;

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/gitlab-weekly-report.user.js',
    format: 'iife',
    name: 'GitLabWeeklyReport'
  },
  plugins: [
    // 清理输出目录
    del({ targets: 'dist/*' }),
    
    // 环境变量替换
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true
    }),
    
    // 解析node_modules中的模块
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    
    // 转换CommonJS模块
    commonjs(),
    
    // CSS处理
    postcss({
      extract: false,
      inject: true,
      minimize: process.env.NODE_ENV === 'production'
    }),
    
    // 生产环境压缩代码
    process.env.NODE_ENV === 'production' && terser({
      format: {
        comments: false
      }
    }),
    
    // 添加油猴脚本头部
    banner(() => userscriptHeader),
    
    // 开发服务器插件 - 仅在监听模式下启用
    process.env.ROLLUP_WATCH && serve({
      open: true,
      openPage: '/preview.html',
      contentBase: ['dist', '.'],
      host: 'localhost',
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      verbose: true,
      onListening: function (server) {
        const address = server.address();
        const host = address.address === '::' ? 'localhost' : address.address;
        const protocol = this.https ? 'https' : 'http';
        console.log(`\n🚀 GitLab 周报生成器预览服务器已启动`);
        console.log(`📍 地址: ${protocol}://${host}:${address.port}`);
        console.log(`📁 预览页面: ${protocol}://${host}:${address.port}/preview.html`);
        console.log(`📄 脚本文件: ${protocol}://${host}:${address.port}/dist/gitlab-weekly-report.user.js`);
        console.log(`\n💡 使用说明: 访问预览页面测试脚本功能\n`);
      }
    })
  ].filter(Boolean)
};