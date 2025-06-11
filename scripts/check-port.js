#!/usr/bin/env node

/**
 * 检查端口是否被占用的脚本
 * 如果端口已被占用，则跳过启动；否则启动开发服务器
 */

import { createServer } from 'net';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// 配置
const PORT = 3002;
const HOST = 'localhost';

/**
 * 检查端口是否被占用
 * @param {number} port - 要检查的端口号
 * @param {string} host - 主机地址
 * @returns {Promise<boolean>} - 如果端口被占用返回true，否则返回false
 */
function checkPortInUse(port, host = 'localhost') {
  return new Promise((resolve) => {
    const server = createServer();
    
    server.listen(port, host, () => {
      // 端口可用，关闭测试服务器
      server.close(() => {
        resolve(false);
      });
    });
    
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // 端口被占用
        resolve(true);
      } else {
        // 其他错误，假设端口不可用
        resolve(true);
      }
    });
  });
}

/**
 * 启动开发服务器
 */
function startDevServer() {
  console.log('🚀 启动开发服务器...');
  
  const rollupProcess = spawn('npx', ['rollup', '-c', '-w', '--environment', 'NODE_ENV:development'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: true
  });
  
  // 处理进程退出
  rollupProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ 开发服务器退出，退出码: ${code}`);
      process.exit(code);
    }
  });
  
  // 处理进程错误
  rollupProcess.on('error', (err) => {
    console.error('❌ 启动开发服务器时发生错误:', err.message);
    process.exit(1);
  });
  
  // 处理进程信号
  process.on('SIGINT', () => {
    console.log('\n⏹️  正在停止开发服务器...');
    rollupProcess.kill('SIGINT');
  });
  
  process.on('SIGTERM', () => {
    console.log('\n⏹️  正在停止开发服务器...');
    rollupProcess.kill('SIGTERM');
  });
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log(`🔍 检查端口 ${PORT} 是否被占用...`);
    
    const isPortInUse = await checkPortInUse(PORT, HOST);
    
    if (isPortInUse) {
      console.log(`✅ 端口 ${PORT} 已被占用，开发服务器可能正在运行`);
      console.log(`📍 预览地址: http://${HOST}:${PORT}/preview.html`);
      console.log(`📄 脚本地址: http://${HOST}:${PORT}/dist/gitlab-weekly-report.user.js`);
      console.log('💡 如需重启服务器，请先停止当前进程');
      process.exit(0);
    } else {
      console.log(`🆓 端口 ${PORT} 可用，启动开发服务器...`);
      startDevServer();
    }
  } catch (error) {
    console.error('❌ 检查端口时发生错误:', error.message);
    process.exit(1);
  }
}

// 运行主函数
main();