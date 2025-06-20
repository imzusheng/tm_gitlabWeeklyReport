import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// UserScript header
const userscriptHeader = `// ==UserScript==
// @name         GitLab 周报生成器
// @namespace    https://github.com/your-username/gitlab-weekly-report
// @version      1.0.0
// @description  基于 DeepSeek AI 的 GitLab 工作周报自动生成工具
// @author       Your Name
// @match        *://*/*gitlab*/*
// @match        *://gitlab.*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @require      https://unpkg.com/react@18/umd/react.production.min.js
// @require      https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
// @updateURL    https://github.com/your-username/gitlab-weekly-report/raw/main/dist/gitlab-weekly-report.user.js
// @downloadURL  https://github.com/your-username/gitlab-weekly-report/raw/main/dist/gitlab-weekly-report.user.js
// ==/UserScript==

`

// Custom plugin to add UserScript header
function userscriptPlugin() {
  return {
    name: 'userscript-header',
    generateBundle(options: any, bundle: any) {
      for (const fileName in bundle) {
        if (fileName.endsWith('.user.js')) {
          const chunk = bundle[fileName]
          if (chunk.type === 'chunk') {
            chunk.code = userscriptHeader + chunk.code
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
    plugins: isUserscript ? [react(), userscriptPlugin()] : [react()],
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
    },
    build: {
      outDir: isUserscript ? 'dist/userscript' : 'dist/web',
      rollupOptions: {
        input: isUserscript
          ? resolve(__dirname, 'src/userscript.ts')
          : resolve(__dirname, 'index.html'),
        output: isUserscript
          ? {
              format: 'iife',
              entryFileNames: 'gitlab-weekly-report.user.js',
              assetFileNames: '[name].[ext]',
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
          configure: (proxy, options) => {
            proxy.on('error', (err, req, res) => {
              console.log('proxy error', err)
            })
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('Sending Request to the Target:', req.method, req.url)
            })
            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
            })
          },
        },
      },
    },
  }
})
