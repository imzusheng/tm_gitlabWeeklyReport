#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const path = require('path');

/**
 * 版本号更新脚本
 * 支持语义化版本控制 (Semantic Versioning)
 * 格式: MAJOR.MINOR.PATCH
 */

function updateVersion(type = 'patch') {
  const validTypes = ['major', 'minor', 'patch'];
  
  if (!validTypes.includes(type)) {
    console.error('❌ 无效的版本类型。请使用: major, minor, patch');
    process.exit(1);
  }

  try {
    // 读取 package.json
    const packageJsonPath = path.resolve(__dirname, '../package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // 解析当前版本号
    const currentVersion = packageJson.version;
    const versionParts = currentVersion.split('.').map(Number);
    
    if (versionParts.length !== 3 || versionParts.some(isNaN)) {
      throw new Error(`无效的版本号格式: ${currentVersion}`);
    }
    
    let [major, minor, patch] = versionParts;
    
    // 根据类型更新版本号
    switch (type) {
      case 'major':
        major += 1;
        minor = 0;
        patch = 0;
        break;
      case 'minor':
        minor += 1;
        patch = 0;
        break;
      case 'patch':
        patch += 1;
        break;
    }
    
    const newVersion = `${major}.${minor}.${patch}`;
    
    console.log(`🔄 版本更新: ${currentVersion} → ${newVersion}`);
    
    // 更新 package.json
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log('✅ 已更新 package.json');
    
    // 更新 vite.config.ts 中的 userscript 版本
    const viteConfigPath = path.resolve(__dirname, '../vite.config.ts');
    let viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
    
    // 使用正则表达式替换版本号
    const versionRegex = /(\/\/\s*@version\s+)(\d+\.\d+\.\d+)/;
    if (versionRegex.test(viteConfig)) {
      viteConfig = viteConfig.replace(versionRegex, `$1${newVersion}`);
      fs.writeFileSync(viteConfigPath, viteConfig);
      console.log('✅ 已更新 vite.config.ts 中的 userscript 版本');
    } else {
      console.warn('⚠️  未找到 vite.config.ts 中的版本号模式');
    }
    
    // 更新已构建的 userscript 文件（如果存在）
    const userscriptPath = path.resolve(__dirname, '../dist/userscript/gitlab-weekly-report.user.js');
    if (fs.existsSync(userscriptPath)) {
      let userscript = fs.readFileSync(userscriptPath, 'utf8');
      if (versionRegex.test(userscript)) {
        userscript = userscript.replace(versionRegex, `$1${newVersion}`);
        fs.writeFileSync(userscriptPath, userscript);
        console.log('✅ 已更新构建后的 userscript 文件');
      }
    }
    
    console.log(`\n🎉 版本更新完成！新版本: ${newVersion}`);
    console.log('💡 提示: 请运行 npm run build 重新构建项目');
    
  } catch (error) {
    console.error('❌ 版本更新失败:', error.message);
    process.exit(1);
  }
}

// 获取命令行参数
const args = process.argv.slice(2);
const versionType = args[0] || 'patch';

// 显示帮助信息
if (args.includes('--help') || args.includes('-h')) {
  console.log(`\n📦 版本更新脚本\n\n用法:\n  node scripts/update-version.cjs [type]\n\n参数:\n  type    版本更新类型 (默认: patch)\n          - major: 主版本号 (1.0.0 → 2.0.0)\n          - minor: 次版本号 (1.0.0 → 1.1.0)\n          - patch: 修订版本号 (1.0.0 → 1.0.1)\n\n示例:\n  node scripts/update-version.cjs patch   # 更新修订版本\n  node scripts/update-version.cjs minor   # 更新次版本\n  node scripts/update-version.cjs major   # 更新主版本\n`);
  process.exit(0);
}

updateVersion(versionType);