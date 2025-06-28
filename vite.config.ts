import { defineConfig } from 'vite'
import type { OutputBundle, OutputChunk } from 'rollup'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// UserScript header
const userscriptHeader = `
// ==UserScript==
// @name         GitLab 周报生成器
// @namespace    https://github.com/imzusheng/tm_gitlabWeeklyReport
// @version      1.3.3
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
    generateBundle(_options: unknown, bundle: OutputBundle) {
      for (const fileName in bundle) {
        if (fileName.endsWith('.user.js')) {
          const chunk = bundle[fileName]
          if (chunk.type === 'chunk') {
            (chunk as OutputChunk).code = userscriptHeader + (chunk as OutputChunk).code
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
      rollupOptions: {
        input: isUserscript
          ? resolve(__dirname, 'src/userscript.ts')
          : resolve(__dirname, 'index.html'),
        output: isUserscript
          ? {
              format: 'iife',
              entryFileNames: 'gitlab-weekly-report.user.js',
              assetFileNames: '[name].[ext]',
              // 在油猴脚本模式下内联所有资源
              inlineDynamicImports: true,
            }
          : {
              entryFileNames: 'assets/[name]-[hash].js',
              chunkFileNames: 'assets/[name]-[hash].js',
              assetFileNames: 'assets/[name]-[hash].[ext]',
            },
      },
    },
    server: {
      port: 3000,
      open: true,
      proxy: {
        // 代理GitLab API请求
        '/proxy': {
          target: 'https://www.lejuhub.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/proxy/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err)
            })
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url)
            })
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
            })
          },
        },
      },
    },
  }
})
