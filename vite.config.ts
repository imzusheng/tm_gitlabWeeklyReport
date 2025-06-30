import { defineConfig } from 'vite'
import type { OutputBundle, OutputChunk } from 'rollup'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

// 从 package.json 读取版本号
const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8'))
const version = packageJson.version

// UserScript header
const userscriptHeader = `
// ==UserScript==
// @name         GitLab 周报生成器
// @namespace    https://github.com/imzusheng/tm_gitlabWeeklyReport
// @version      ${version}
// @description  基于 DeepSeek AI 的 GitLab 工作周报自动生成工具
// @author       lizusheng
// @match        *://www.lejuhub.com/dashboard/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @require      https://unpkg.com/react@18/umd/react.production.min.js
// @require      https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
// @updateURL    https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js
// @downloadURL  https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js
// ==/UserScript==

`

// Custom plugin to add UserScript header
function userscriptPlugin() {
  return {
    name: 'userscript-header',
    writeBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.endsWith('.user.js')) {
          const filePath = join(options.dir || 'dist', fileName)
          if (existsSync(filePath)) {
            const content = readFileSync(filePath, 'utf-8')
            const newContent = userscriptHeader + content
            writeFileSync(filePath, newContent)
          }
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isUserscript = mode === 'userscript'

  return {
    plugins: isUserscript ? [react(), cssInjectedByJsPlugin(), userscriptPlugin()] : [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
      modules: {
        // 启用CSS模块化，为所有.less和.css文件添加hash
        localsConvention: 'camelCase',
        generateScopedName: '[name]__[local]__[hash:base64:5]',
        hashPrefix: 'gitlab-weekly-report',
      },
    },
    build: {
      outDir: isUserscript ? 'dist/userscript' : 'dist/web',
      cssCodeSplit: !isUserscript, // 在油猴脚本模式下不分割CSS
      minify: 'terser',
      terserOptions: {
        compress: {
          // 移除console语句（仅在生产环境）
          drop_console: mode === 'production' || isUserscript,
          drop_debugger: true,
          pure_funcs: mode === 'production' || isUserscript ? ['console.log', 'console.warn', 'console.error'] : [],
        },
        mangle: {
          // 保留函数名以便调试
          keep_fnames: mode === 'development',
        },
        format: {
          // 在油猴脚本模式下保留所有注释，确保头部不被删除
          comments: isUserscript ? 'all' : false,
        },
      },
      rollupOptions: {
        input: isUserscript
          ? resolve(__dirname, 'src/userscript.ts')
          : resolve(__dirname, 'index.html'),

        // 根据是否为油猴脚本来决定是否外部化
        external: isUserscript
          ? (id) => {
              // 只对真正的外部依赖进行外部化，避免警告
              return ['react', 'react-dom'].includes(id)
            }
          : [],
        output: {
          // 为外部模块提供全局变量名，避免警告
          globals: isUserscript
            ? {
                react: 'React',
                'react-dom': 'ReactDOM',
              }
            : {},
          ...(isUserscript
            ? {
                format: 'iife',
                name: 'GitLabWeeklyReport',
                entryFileNames: 'gitlab-weekly-report.user.js',
                assetFileNames: '[name].[ext]',
                inlineDynamicImports: true,
              }
            : {
                format: 'es',
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
                manualChunks: {
                  vendor: ['react', 'react-dom'],
                  utils: ['@/utils/index', '@/constants/index'],
                },
              }),
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      cors: true,
      proxy: {
        // 代理GitLab API请求
        '/proxy': {
          target: 'https://www.lejuhub.com',
          changeOrigin: true,
          secure: true,
          rewrite: path => path.replace(/^\/proxy/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('GitLab Proxy Error:', err)
            })
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('GitLab Request:', req.method, req.url)
              // 添加必要的请求头
              proxyReq.setHeader('User-Agent', 'GitLab-Weekly-Report/1.0')
            })
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('GitLab Response:', proxyRes.statusCode, req.url)
              // 添加CORS头
              proxyRes.headers['Access-Control-Allow-Origin'] = '*'
              proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
              proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, PRIVATE-TOKEN'
            })
          },
        },
        // 代理DeepSeek API请求
        '/api/deepseek': {
          target: 'https://api.deepseek.com',
          changeOrigin: true,
          secure: true,
          rewrite: path => path.replace(/^\/api\/deepseek/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('DeepSeek Proxy Error:', err)
            })
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('DeepSeek Request:', req.method, req.url)
              // 添加必要的请求头
              proxyReq.setHeader('User-Agent', 'GitLab-Weekly-Report/1.0')
            })
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('DeepSeek Response:', proxyRes.statusCode, req.url)
              // 添加CORS头
              proxyRes.headers['Access-Control-Allow-Origin'] = '*'
              proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
              proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
            })
          },
        },
        // 代理GitHub Raw请求
        '/api/github': {
          target: 'https://raw.githubusercontent.com',
          changeOrigin: true,
          secure: true,
          rewrite: path => path.replace(/^\/api\/github/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('GitHub Proxy Error:', err)
            })
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('GitHub Request:', req.method, req.url)
              // 添加必要的请求头
              proxyReq.setHeader('User-Agent', 'GitLab-Weekly-Report/1.0')
            })
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('GitHub Response:', proxyRes.statusCode, req.url)
              // 添加CORS头
              proxyRes.headers['Access-Control-Allow-Origin'] = '*'
              proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
              proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, Accept'
            })
          },
        },
      },
    },
  }
})
