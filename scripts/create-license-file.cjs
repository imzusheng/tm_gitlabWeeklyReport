// #!/usr/bin/env node
/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

function generateMITLicense(author, year) {
  return `MIT License

Copyright (c) ${year} ${author}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`
}

// 配置项
const PROJECT_ROOT = path.resolve(__dirname, '..')
const PACKAGE_JSON_PATH = path.resolve(PROJECT_ROOT, 'package.json')
const OUTPUT_PATH = path.resolve(PROJECT_ROOT, 'LICENSE')

// 从 package.json 获取作者信息
function getAuthorFromPackageJson() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'))

    // 支持多种格式的作者信息
    if (typeof packageJson.author === 'string') {
      // "author": "Zusheng <email@example.com>"
      return packageJson.author.split('<')[0].trim()
    } else if (
      typeof packageJson.author === 'object' &&
      packageJson.author.name
    ) {
      // "author": { "name": "Zusheng", "email": "email@example.com" }
      return packageJson.author.name
    } else if (
      Array.isArray(packageJson.contributors) &&
      packageJson.contributors.length > 0
    ) {
      // 如果没有 author 但有 contributors，使用第一个贡献者
      const firstContributor = packageJson.contributors[0]
      if (typeof firstContributor === 'string') {
        return firstContributor.split('<')[0].trim()
      } else if (
        typeof firstContributor === 'object' &&
        firstContributor.name
      ) {
        return firstContributor.name
      }
    }

    // 兜底使用默认值
    return 'Unknown Author'
  } catch (error) {
    console.warn('⚠️  无法从 package.json 读取作者信息，使用默认值')
    return 'Unknown Author'
  }
}

const AUTHOR = getAuthorFromPackageJson()
const YEAR = new Date().getFullYear()

function updateLicenseIfNeeded() {
  const expectedLicense = generateMITLicense(AUTHOR, YEAR)

  if (!fs.existsSync(OUTPUT_PATH)) {
    // LICENSE 文件不存在，创建新文件
    fs.writeFileSync(OUTPUT_PATH, expectedLicense, 'utf-8')
    console.log(`✅ LICENSE 文件已生成: ${OUTPUT_PATH}`)
    return
  }

  // LICENSE 文件已存在，检查内容是否需要更新
  const currentLicense = fs.readFileSync(OUTPUT_PATH, 'utf-8')

  if (currentLicense.trim() !== expectedLicense.trim()) {
    // 内容不匹配，更新文件
    fs.writeFileSync(OUTPUT_PATH, expectedLicense, 'utf-8')
    console.log(`🔄 LICENSE 文件已更新 (年份: ${YEAR}, 作者: ${AUTHOR})`)
  } else {
    console.log('📄 LICENSE 文件已是最新，无需更新')
  }
}

// 执行主函数
updateLicenseIfNeeded()
