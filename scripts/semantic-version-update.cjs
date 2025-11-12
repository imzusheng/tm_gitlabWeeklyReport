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

    // 检查配置（Vite 可能不再内嵌版本，优先检查前端常量实现）
    checkVersionIntegration()

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
function checkVersionIntegration() {
  const constantsPath = path.join(process.cwd(), 'src/constants/index.ts')
  if (fs.existsSync(constantsPath)) {
    const c = fs.readFileSync(constantsPath, 'utf8')
    const hasEnv = c.includes('VITE_APP_VERSION')
    const hasPkg = c.includes('packageJson.version')
    if (hasEnv && hasPkg) {
      console.log(
        '  ✓ 前端常量使用 VITE_APP_VERSION，并回退 package.json.version',
      )
      return
    }
  }

  const viteConfigPath = path.join(process.cwd(), 'vite.config.ts')
  if (fs.existsSync(viteConfigPath)) {
    const content = fs.readFileSync(viteConfigPath, 'utf8')
    if (
      content.includes('${version}') &&
      content.includes('packageJson.version')
    ) {
      console.log('  ✓ vite.config.ts 已配置动态版本号读取')
      return
    }
  }

  console.warn(
    '  ⚠️  未检测到版本注入实现（使用 VITE_APP_VERSION 或动态读取 package.json）',
  )
}

// 如果直接运行此脚本
if (require.main === module) {
  syncVersionFromPackageJson()
}

module.exports = {
  syncVersionFromPackageJson,
  checkVersionIntegration,
}
