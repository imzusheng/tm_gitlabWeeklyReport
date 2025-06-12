import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import del from 'rollup-plugin-delete';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import { readFileSync } from 'fs';
import { join } from 'path';

// 读取package.json获取版本信息
const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'));

// Web版本构建配置

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/gitlab-weekly-report.web.js',
    format: 'iife',
    name: 'GitLabWeeklyReport'
  },
  plugins: [
    // 清理输出目录（仅清理web相关文件）
    del({ targets: ['dist/*.web.*'] }),
    
    // 环境变量替换
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.BUILD_MODE': JSON.stringify('web'),
      preventAssignment: true
    }),
    
    // 解析node_modules中的模块
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    
    // 转换CommonJS模块
    commonjs(),
    
    // Babel转换JSX
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx']
    }),
    
    // CSS处理
    postcss({
      extract: false,
      inject: true,
      minimize: process.env.NODE_ENV === 'production',
      extensions: ['.css', '.less'],
      use: ['less']
    }),
    
    // 生产环境压缩代码
    process.env.NODE_ENV === 'production' && terser({
      format: {
        comments: false
      }
    }),
    

    
    // 开发服务器插件 - 仅在监听模式下启用
    process.env.ROLLUP_WATCH && serve({
      open: true,
      openPage: '/index.html',
      contentBase: ['dist', '.'],
      host: 'localhost',
      port: 3004,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      verbose: true,
      onListening: function(server) {
        const address = server.address();
        const host = address.address === '::' ? 'localhost' : address.address;
        const port = address.port;
        console.log(`\n🌐 Web版本开发服务器启动成功!`);
        console.log(`📱 访问地址: http://${host}:${port}/index.html`);
        console.log(`🔧 模式: Web 网页模式 (热更新已启用)`);
        console.log(`📦 版本: ${pkg.version}\n`);
      }
    }),
    
    // 热更新插件 - 仅在监听模式下启用
    process.env.ROLLUP_WATCH && livereload({
      watch: ['src', 'dist'], // 监听源码目录和输出目录
      verbose: false,
      port: 35729,
      exts: ['js', 'jsx', 'less', 'css', 'html'] // 监听的文件扩展名
    })
  ].filter(Boolean)
};