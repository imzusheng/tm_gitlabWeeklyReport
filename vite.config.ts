import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: './',
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
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: '[name]-[local]-[hash:5]',
      },
    },
    build: {
      outDir: 'dist/web',
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true,
          pure_funcs:
            mode === 'production'
              ? ['console.log', 'console.warn', 'console.error']
              : [],
        },
        mangle: {
          keep_fnames: mode === 'development',
        },
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        input: resolve(__dirname, 'index.html'),
        output: {
          format: 'es',
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['@/utils/index', '@/constants'],
          },
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
              proxyRes.headers['Access-Control-Allow-Methods'] =
                'GET, POST, PUT, DELETE, OPTIONS'
              proxyRes.headers['Access-Control-Allow-Headers'] =
                'Content-Type, Authorization, PRIVATE-TOKEN'
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
              proxyRes.headers['Access-Control-Allow-Methods'] =
                'GET, POST, PUT, DELETE, OPTIONS'
              proxyRes.headers['Access-Control-Allow-Headers'] =
                'Content-Type, Authorization'
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
              proxyRes.headers['Access-Control-Allow-Methods'] =
                'GET, POST, PUT, DELETE, OPTIONS'
              proxyRes.headers['Access-Control-Allow-Headers'] =
                'Content-Type, Authorization, Accept'
            })
          },
        },
      },
    },
  }
})
