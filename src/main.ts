// ==UserScript==
// @name         GitLab Weekly Report Generator
// @namespace    https://github.com/your-username/gitlab-weekly-report
// @version      1.0.0
// @description  Generate weekly reports from GitLab activities using AI
// @author       Your Name
// @match        https://gitlab.com/*
// @match        https://gitlab.example.com/*
// @match        https://*.gitlab.io/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM_notification
// @run-at       document-end
// @updateURL    https://github.com/your-username/gitlab-weekly-report/raw/main/dist/main.js
// @downloadURL  https://github.com/your-username/gitlab-weekly-report/raw/main/dist/main.js
// ==/UserScript==

import { main } from './index';

/**
 * 油猴脚本入口点
 * 检查环境并启动应用
 */
(function() {
  'use strict';
  
  // 检查是否在支持的页面上
  const supportedDomains = [
    'gitlab.com',
    'gitlab.io',
    // 可以添加更多支持的域名
  ];
  
  const currentDomain = window.location.hostname;
  const isSupported = supportedDomains.some(domain => 
    currentDomain.includes(domain)
  ) || currentDomain.includes('gitlab');
  
  if (isSupported) {
    console.log('GitLab Weekly Report Generator: Starting on', currentDomain);
    main();
  } else {
    console.log('GitLab Weekly Report Generator: Not supported on', currentDomain);
  }
})();