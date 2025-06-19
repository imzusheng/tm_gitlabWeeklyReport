import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isUserscript = mode === 'userscript'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
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
              console.log(
                'Received Response from the Target:',
                proxyRes.statusCode,
                req.url,
              )
            })
          },
        },
      },
    },
  }
})
