#!/usr/bin/env node

/**
 * 版本更新脚本
 * 自动更新 package.json、package-lock.json 和 CHANGELOG.md 中的版本号
 * 使用方法: node scripts/update-version.js [patch|minor|major]
 */

const fs = require('fs');
const path = require('path');

// 获取当前时间
function getCurrentDate() {
  const now = new Date();
  return now.toISOString().split('T')[0]; // YYYY-MM-DD 格式
}

// 解析版本号
function parseVersion(version) {
  const parts = version.split('.').map(Number);
  return {
    major: parts[0] || 0,
    minor: parts[1] || 0,
    patch: parts[2] || 0
  };
}

// 生成新版本号
function generateNewVersion(currentVersion, type = 'patch') {
  const version = parseVersion(currentVersion);
  
  switch (type) {
    case 'major':
      version.major += 1;
      version.minor = 0;
      version.patch = 0;
      break;
    case 'minor':
      version.minor += 1;
      version.patch = 0;
      break;
    case 'patch':
    default:
      version.patch += 1;
      break;
  }
  
  return `${version.major}.${version.minor}.${version.patch}`;
}

// 更新 package.json
function updatePackageJson(newVersion) {
  const packagePath = path.join(__dirname, '../package.json');
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const oldVersion = packageContent.version;
  packageContent.version = newVersion;
  
  fs.writeFileSync(packagePath, JSON.stringify(packageContent, null, 2) + '\n');
  console.log(`✅ package.json: ${oldVersion} → ${newVersion}`);
  
  return oldVersion;
}

// 更新 package-lock.json
function updatePackageLockJson(newVersion) {
  const lockPath = path.join(__dirname, '../package-lock.json');
  
  if (!fs.existsSync(lockPath)) {
    console.log('⚠️  package-lock.json 不存在，跳过更新');
    return;
  }
  
  const lockContent = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
  
  // 更新根级别的版本号
  lockContent.version = newVersion;
  
  // 更新 packages[""] 中的版本号
  if (lockContent.packages && lockContent.packages[""]) {
    lockContent.packages[""].version = newVersion;
  }
  
  fs.writeFileSync(lockPath, JSON.stringify(lockContent, null, 2) + '\n');
  console.log(`✅ package-lock.json: 版本号已更新为 ${newVersion}`);
}

// 更新 CHANGELOG.md
function updateChangelog(newVersion, oldVersion, type) {
  const changelogPath = path.join(__dirname, '../CHANGELOG.md');
  
  if (!fs.existsSync(changelogPath)) {
    console.log('⚠️  CHANGELOG.md 不存在，跳过更新');
    return;
  }
  
  const changelogContent = fs.readFileSync(changelogPath, 'utf8');
  const currentDate = getCurrentDate();
  
  // 根据版本类型生成更新说明
  let changeDescription = '';
  switch (type) {
    case 'major':
      changeDescription = '- 重大版本更新\n- 可能包含破坏性变更';
      break;
    case 'minor':
      changeDescription = '- 新增功能\n- 功能优化和改进';
      break;
    case 'patch':
    default:
      changeDescription = '- Bug修复\n- 小幅优化和改进';
      break;
  }
  
  // 在第一个 ## 之前插入新版本信息
  const newEntry = `## [${newVersion}] - ${currentDate}\n### Changed\n${changeDescription}\n\n`;
  
  // 找到第一个 ## 的位置
  const firstHeaderIndex = changelogContent.indexOf('\n## ');
  if (firstHeaderIndex !== -1) {
    const beforeFirstHeader = changelogContent.substring(0, firstHeaderIndex + 1);
    const afterFirstHeader = changelogContent.substring(firstHeaderIndex + 1);
    const updatedContent = beforeFirstHeader + newEntry + afterFirstHeader;
    
    fs.writeFileSync(changelogPath, updatedContent);
    console.log(`✅ CHANGELOG.md: 已添加版本 ${newVersion} 的更新记录`);
  } else {
    console.log('⚠️  CHANGELOG.md 格式不正确，无法自动更新');
  }
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const versionType = args[0] || 'patch';
  
  // 验证版本类型
  if (!['patch', 'minor', 'major'].includes(versionType)) {
    console.error('❌ 错误: 版本类型必须是 patch、minor 或 major 之一');
    console.log('使用方法: node scripts/update-version.js [patch|minor|major]');
    process.exit(1);
  }
  
  try {
    // 读取当前版本
    const packagePath = path.join(__dirname, '../package.json');
    const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const currentVersion = packageContent.version;
    
    // 生成新版本号
    const newVersion = generateNewVersion(currentVersion, versionType);
    
    console.log(`🚀 开始更新版本: ${currentVersion} → ${newVersion} (${versionType})`);
    console.log('---');
    
    // 更新各个文件
    const oldVersion = updatePackageJson(newVersion);
    updatePackageLockJson(newVersion);
    updateChangelog(newVersion, oldVersion, versionType);
    
    console.log('---');
    console.log(`🎉 版本更新完成! 当前版本: ${newVersion}`);
    console.log('💡 提示: 记得运行 npm run build 来构建新版本');
    
  } catch (error) {
    console.error('❌ 更新版本时发生错误:', error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  parseVersion,
  generateNewVersion,
  updatePackageJson,
  updatePackageLockJson,
  updateChangelog
};