/**
 * 油猴脚本配置文件
 * 包含脚本元数据和头部生成函数
 */

/**
 * 油猴脚本配置
 */
export const userscriptConfig = {
  name: "GitLab 周报生成器 R",
  namespace: "http://tampermonkey.net/",
  description: "GitLab 周报生成器 - 使用 React + TypeScript + Rollup 的现代化 Tampermonkey 脚本",
  author: "Zusheng & Trae AI & Cursor AI",
  match: "https://www.lejuhub.com/*",
  grants: [
    "GM_xmlhttpRequest",
    "GM_setValue",
    "GM_getValue",
    "GM_deleteValue"
  ],
  requires: [],
  icon: "",
  homepage: "",
  supportURL: "",
  updateURL: "",
  downloadURL: "",
  connect: [],
  noframes: false,
  unwrap: false,
  "run-at": "document-end"
};

/**
 * 生成油猴脚本头部
 * @param {string} version 版本号
 * @returns {string} 油猴脚本头部
 */
export function generateUserscriptHeader(version) {
  const grants = userscriptConfig.grants.map(grant => `// @grant        ${grant}`).join('\n');
  const requires = userscriptConfig.requires.map(req => `// @require      ${req}`).join('\n');
  const connect = userscriptConfig.connect.map(conn => `// @connect      ${conn}`).join('\n');
  
  let header = `// ==UserScript==
// @name         ${userscriptConfig.name}
// @namespace    ${userscriptConfig.namespace}
// @version      ${version}
// @description  ${userscriptConfig.description}
// @author       ${userscriptConfig.author}
// @match        ${userscriptConfig.match}
${grants}`;
  
  if (requires) header += `\n${requires}`;
  if (connect) header += `\n${connect}`;
  if (userscriptConfig.icon) header += `\n// @icon         ${userscriptConfig.icon}`;
  if (userscriptConfig.homepage) header += `\n// @homepage     ${userscriptConfig.homepage}`;
  if (userscriptConfig.supportURL) header += `\n// @supportURL   ${userscriptConfig.supportURL}`;
  if (userscriptConfig.updateURL) header += `\n// @updateURL    ${userscriptConfig.updateURL}`;
  if (userscriptConfig.downloadURL) header += `\n// @downloadURL  ${userscriptConfig.downloadURL}`;
  if (userscriptConfig.noframes) header += `\n// @noframes`;
  if (userscriptConfig.unwrap) header += `\n// @unwrap`;
  if (userscriptConfig['run-at']) header += `\n// @run-at       ${userscriptConfig['run-at']}`;
  
  header += `\n// ==/UserScript==\n`;
  return header;
}