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
        output: isUserscript ? {
          format: 'iife',
          entryFileNames: 'gitlab-weekly-report.user.js',
          assetFileNames: '[name].[ext]',
        } : {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  }
}) 