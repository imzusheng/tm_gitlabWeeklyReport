#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')

/**
 * 统一版本管理：从 package.json 读取版本号并同步到所有相关文件
 * 这是项目中唯一的版本号管理入口
 */
function syncVersionFromPackageJson() {
  try {
    // 读取 package.json 获取当前版本（唯一版本来源）
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    const version = packageJson.version

    console.log(`🔄 检查版本号配置: ${version}`)

    // 检查配置并更新构建文件
    checkViteConfig()
    updateBuiltUserscript(version)

    console.log(`✅ 版本同步完成: ${version}`)
  } catch (error) {
    console.error('❌ 版本同步失败:', error.message)
    process.exit(1)
  }
}

/**
 * 检查 vite.config.ts 版本号配置
 * 现在版本号通过动态读取 package.json 实现，无需手动更新
 */
function checkViteConfig() {
  const viteConfigPath = path.join(process.cwd(), 'vite.config.ts')

  if (!fs.existsSync(viteConfigPath)) {
    console.warn('⚠️  vite.config.ts 不存在')
    return
  }

  const content = fs.readFileSync(viteConfigPath, 'utf8')

  // 检查是否使用动态版本号
  if (
    content.includes('${version}') &&
    content.includes('packageJson.version')
  ) {
    console.log('  ✓ vite.config.ts 已配置动态版本号读取')
  } else {
    console.warn('  ⚠️  vite.config.ts 可能仍使用硬编码版本号')
  }
}

/**
 * 更新构建后的 userscript 文件中的版本号
 */
function updateBuiltUserscript(version) {
  const userscriptPath = path.join(
    process.cwd(),
    'dist/userscript/gitlab-weekly-report.user.js',
  )

  if (!fs.existsSync(userscriptPath)) {
    console.log('  ℹ️  构建文件不存在，跳过更新（正常情况）')
    return
  }

  let content = fs.readFileSync(userscriptPath, 'utf8')

  // 更新 @version 行
  const versionRegex = /(\s*\/\/\s*@version\s+)([\d.]+)/
  if (versionRegex.test(content)) {
    content = content.replace(versionRegex, `$1${version}`)
    fs.writeFileSync(userscriptPath, content, 'utf8')
    console.log(`  ✓ 已更新构建文件版本号`)
  } else {
    console.warn('  ⚠️  构建文件中未找到版本号模式')
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  syncVersionFromPackageJson()
}

module.exports = {
  syncVersionFromPackageJson,
  checkViteConfig,
  updateBuiltUserscript,
}
