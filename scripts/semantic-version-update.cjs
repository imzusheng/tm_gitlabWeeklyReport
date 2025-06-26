#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

/**
 * 更新 vite.config.ts 中的版本号
 * @param {string} newVersion - 新版本号
 */
function updateViteConfig(newVersion) {
  const viteConfigPath = path.join(process.cwd(), 'vite.config.ts');
  
  if (!fs.existsSync(viteConfigPath)) {
    console.warn('vite.config.ts not found, skipping...');
    return;
  }
  
  let content = fs.readFileSync(viteConfigPath, 'utf8');
  
  // 更新 userscriptHeader 中的版本号
  const versionRegex = /(\s*\/\/\s*@version\s+)([\d.]+)/;
  if (versionRegex.test(content)) {
    content = content.replace(versionRegex, `$1${newVersion}`);
    fs.writeFileSync(viteConfigPath, content, 'utf8');
    console.log(`✅ Updated vite.config.ts version to ${newVersion}`);
  } else {
    console.warn('⚠️  Version pattern not found in vite.config.ts');
  }
}

/**
 * 更新构建后的 userscript 文件中的版本号
 * @param {string} newVersion - 新版本号
 */
function updateBuiltUserscript(newVersion) {
  const userscriptPath = path.join(process.cwd(), 'dist/userscript/gitlab-weekly-report.user.js');
  
  if (!fs.existsSync(userscriptPath)) {
    console.warn('Built userscript not found, skipping...');
    return;
  }
  
  let content = fs.readFileSync(userscriptPath, 'utf8');
  
  // 更新 @version 行
  const versionRegex = /(\s*\/\/\s*@version\s+)([\d.]+)/;
  if (versionRegex.test(content)) {
    content = content.replace(versionRegex, `$1${newVersion}`);
    fs.writeFileSync(userscriptPath, content, 'utf8');
    console.log(`✅ Updated built userscript version to ${newVersion}`);
  } else {
    console.warn('⚠️  Version pattern not found in built userscript');
  }
}

/**
 * 主函数：从 package.json 读取版本号并更新相关文件
 */
function main() {
  try {
    // 读取 package.json 获取当前版本
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const currentVersion = packageJson.version;
    
    console.log(`🔄 Updating version references to ${currentVersion}...`);
    
    // 更新 vite.config.ts
    updateViteConfig(currentVersion);
    
    // 更新构建后的文件（如果存在）
    updateBuiltUserscript(currentVersion);
    
    console.log(`✅ Version update completed: ${currentVersion}`);
  } catch (error) {
    console.error('❌ Error updating version:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { updateViteConfig, updateBuiltUserscript };