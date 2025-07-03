// ==UserScript==
// @name         GitLab 周报生成器
// @namespace    https://github.com/imzusheng/tm_gitlabWeeklyReport
// @version      1.10.3
// @description  基于 DeepSeek AI 的 GitLab 工作周报自动生成工具
// @author       lizusheng
// @match        *://www.lejuhub.com/dashboard/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_xmlhttpRequest
// @require      https://unpkg.com/react@18/umd/react.production.min.js
// @require      https://unpkg.com/react-dom@18/umd/react-dom.production.min.js
// @updateURL    https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js
// @downloadURL  https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js
// ==/UserScript==

!(function () {
  'use strict'
  try {
    if ('undefined' != typeof document) {
      var e = document.createElement('style')
      e.appendChild(
        document.createTextNode(
          ".index-module__filter-section-content__y5rEz .index-module__filter-group__5B49Z{margin-bottom:16px}.index-module__filter-section-content__y5rEz .index-module__filter-group__5B49Z:last-child{margin-bottom:0}.index-module__filter-section-content__y5rEz .index-module__filter-group__5B49Z .index-module__filter-label__kgsrz{display:block;font-size:14px;font-weight:500;color:var(--text-primary);margin-bottom:8px}.index-module__filter-section-content__y5rEz .index-module__filter-group__5B49Z .index-module__filter-options__83wOv{display:flex;flex-wrap:wrap;gap:8px}.index-module__filter-section-content__y5rEz .index-module__filter-group__5B49Z .index-module__filter-options__83wOv .index-module__filter-option__SG0B9{padding:6px 12px;border:1px solid var(--btn-border);border-radius:8px;background:var(--input-bg);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:var(--text-primary);font-size:13px;font-weight:500;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);outline:none}.index-module__filter-section-content__y5rEz .index-module__filter-group__5B49Z .index-module__filter-options__83wOv .index-module__filter-option__SG0B9:hover{border-color:#007aff80;background:var(--color-primary-light);transform:translateY(-1px);box-shadow:0 4px 12px #007aff26}.index-module__filter-section-content__y5rEz .index-module__filter-group__5B49Z .index-module__filter-options__83wOv .index-module__filter-option__SG0B9.index-module__active__IQgMz{border-color:var(--color-primary);background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-info) 100%);color:#fff;box-shadow:0 4px 12px #007aff4d}.index-module__pagination__5dauU{display:flex;justify-content:space-between;align-items:center;gap:16px;position:relative;z-index:1;isolation:isolate;contain:layout style;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;padding:16px 20px;background:var(--bg-secondary);border-radius:12px;border:1px solid var(--border-light);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}.index-module__pagination__5dauU .index-module__pagination-info__xbUbw{font-size:14px;color:var(--text-secondary);font-weight:500;box-sizing:border-box;margin:0;padding:0;display:flex;align-items:center;gap:8px}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL{display:flex;align-items:center;gap:6px;box-sizing:border-box;margin:0;padding:0}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-btn__P1OCG{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border:1px solid var(--border-primary);background:var(--bg-primary);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-radius:10px;font-size:14px;font-weight:600;color:var(--text-primary);cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);box-sizing:border-box;margin:0;padding:0;outline:none;text-decoration:none;font-family:inherit;position:relative}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-btn__P1OCG:hover:not(.index-module__disabled__BywdX){border-color:var(--color-primary);background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));color:#fff;transform:translateY(-2px);box-shadow:var(--shadow-md)}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-btn__P1OCG.index-module__active__lSJu-{border-color:var(--color-primary);background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));color:#fff;box-shadow:var(--shadow-md);font-weight:700}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-btn__P1OCG.index-module__disabled__BywdX{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-btn__P1OCG.index-module__disabled__BywdX:hover{border-color:var(--border-primary);background:var(--bg-primary);color:var(--text-primary)}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-btn__P1OCG span{font-size:16px;line-height:1}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-ellipsis__gQnax{display:flex;align-items:center;justify-content:center;width:36px;height:36px;color:var(--text-secondary);font-size:14px;font-weight:600}.index-module__pagination__5dauU .index-module__pagination-size-changer__SufyI{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--text-secondary);font-weight:500}.index-module__pagination__5dauU .index-module__pagination-size-changer__SufyI .index-module__pagination-select__JwvbH{padding:8px 32px 8px 12px;border:1px solid var(--border-primary);border-radius:8px;background:var(--bg-primary);color:var(--text-primary);font-size:14px;font-weight:500;cursor:pointer;transition:all .3s ease;min-width:80px}.index-module__pagination__5dauU .index-module__pagination-size-changer__SufyI .index-module__pagination-select__JwvbH:hover{border-color:var(--color-primary);box-shadow:0 2px 8px rgba(var(--primary-rgb),.2)}.index-module__pagination__5dauU .index-module__pagination-size-changer__SufyI .index-module__pagination-select__JwvbH:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 3px rgba(var(--primary-rgb),.2)}.index-module__selectionManager__BVUt4{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:var(--bg-secondary);gap:20px}.index-module__selectionManager__BVUt4 .index-module__selectionInfo__xzOCm{display:flex;align-items:center;min-width:140px}.index-module__selectionManager__BVUt4 .index-module__selectionInfo__xzOCm .index-module__selectionCount__C1Iwo{font-size:14px;font-weight:600;color:var(--text-primary);padding:6px 16px;background:var(--bg-primary);border:1px solid var(--border-primary);border-radius:20px;box-shadow:var(--shadow-xs)}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf{display:flex;align-items:center;gap:24px;flex:1;justify-content:flex-end}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__actionGroup__E-C1y{display:flex;align-items:center;gap:8px}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__actionGroup__E-C1y .index-module__groupLabel__x-jJZ{font-size:13px;color:var(--text-secondary);font-weight:500;white-space:nowrap}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__actionBtn__421Xy{padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;transition:all .2s ease;white-space:nowrap;letter-spacing:.02em;border:1px solid var(--border-primary);background:var(--btn-bg);color:var(--btn-text);box-shadow:var(--shadow-xs)}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__actionBtn__421Xy:disabled{opacity:.4;cursor:not-allowed}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__actionBtn__421Xy:not(:disabled):hover{background:var(--btn-hover-bg);border-color:var(--border-secondary);box-shadow:var(--shadow-sm)}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__actionBtn__421Xy:not(:disabled):active{background:var(--bg-hover);box-shadow:var(--shadow-xs);transform:translateY(1px)}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__actionBtn__421Xy .index-module__btnIcon__fWDmC{display:inline-block;margin-right:6px;font-size:14px}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__selectAllBtn__bMAjm{background:var(--btn-bg);color:var(--text-primary);border:1px solid var(--border-primary);box-shadow:var(--shadow-xs)}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__selectAllBtn__bMAjm:not(:disabled):hover{background:var(--bg-tertiary);border-color:var(--border-secondary)}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__selectAllBtn__bMAjm:not(:disabled):active{background:var(--bg-quaternary);opacity:.8}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__clearBtn__atjK2{background:var(--btn-bg);color:var(--text-primary);border:1px solid var(--border-primary);box-shadow:var(--shadow-xs)}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__clearBtn__atjK2:not(:disabled):hover{background:var(--bg-tertiary);border-color:var(--border-secondary)}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__clearBtn__atjK2:not(:disabled):active{background:var(--bg-quaternary);opacity:.8}@media (width <= 768px){.index-module__selectionManager__BVUt4{flex-direction:column;align-items:stretch;gap:12px}.index-module__selectionManager__BVUt4 .index-module__selectionInfo__xzOCm{justify-content:center;min-width:auto}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf{flex-direction:column;gap:12px}.index-module__selectionManager__BVUt4 .index-module__selectionActions__Apagf .index-module__actionGroup__E-C1y{justify-content:center;flex-wrap:wrap}}.index-module__events-list__-m-9O{display:flex;flex-direction:column;height:100%;background:var(--bg-quaternary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-radius:12px;overflow:hidden;box-shadow:var(--shadow-sm)}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr{display:flex;align-items:center;padding:16px 20px;background:var(--bg-tertiary);border-bottom:1px solid var(--border-secondary);font-weight:600;font-size:13px;color:var(--text-primary);letter-spacing:-.08px}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV{display:flex;align-items:center;gap:4px;cursor:pointer;transition:all .2s ease;padding:4px 0;border-radius:6px}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV:hover{color:var(--color-primary)}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV.index-module__checkbox-cell__fFp2c{width:40px;justify-content:center;cursor:default}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV.index-module__checkbox-cell__fFp2c:hover{color:var(--text-primary)}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV.index-module__content-cell__XX9h3{flex:1;min-width:0}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV.index-module__action-cell__cQC45,.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV.index-module__time-cell__MQe22{width:120px;justify-content:center}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV.index-module__detail-cell__zq1IN{width:80px;justify-content:center;cursor:default}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV.index-module__detail-cell__zq1IN:hover{color:var(--text-primary)}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV .index-module__sort-icon__tSSwt{font-size:12px;color:var(--color-primary);opacity:.8}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ{flex:1;overflow-y:auto}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz{display:flex;align-items:center;padding:12px 20px;border-bottom:1px solid var(--border-secondary);transition:all .15s ease;cursor:default}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz:hover,.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz.index-module__selected__QNHpl{background:var(--color-primary-lighter)}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz.index-module__selected__QNHpl:hover{background:var(--color-primary-light)}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz:last-child{border-bottom:none}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts{display:flex;align-items:center}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__checkbox-cell__fFp2c{width:40px;justify-content:center}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__content-cell__XX9h3{flex:1;min-width:0;display:flex;align-items:center;gap:12px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__content-cell__XX9h3 .index-module__event-icon__9UCQ3{font-size:18px;flex-shrink:0;width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:6px;background:var(--color-primary-lighter)}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__content-cell__XX9h3 .index-module__event-content__YCPED{flex:1;min-width:0}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__content-cell__XX9h3 .index-module__event-content__YCPED .index-module__event-title__530MV{font-size:14px;font-weight:500;color:var(--text-primary);line-height:1.3;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__content-cell__XX9h3 .index-module__event-content__YCPED .index-module__event-description__C3Fjc{font-size:12px;color:var(--text-secondary);line-height:1.3;overflow:hidden;text-overflow:ellipsis}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__action-cell__cQC45{width:120px;justify-content:center}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__action-cell__cQC45 .index-module__action-tag__GZU05{padding:4px 8px;border-radius:6px;font-size:11px;font-weight:500;background:var(--color-success-lighter);color:var(--color-success);text-align:center;white-space:nowrap}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__time-cell__MQe22{width:120px;justify-content:center}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__time-cell__MQe22 .index-module__event-time__1VIXa{font-size:12px;color:var(--text-secondary);font-weight:500;text-align:center}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN{width:80px;justify-content:center;gap:8px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN .index-module__detail-btn__Q5YpF,.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN .index-module__source-btn__CcFSW{width:28px;height:28px;border:none;border-radius:6px;background:var(--color-primary-lighter);cursor:pointer;transition:all .15s ease;display:flex;align-items:center;justify-content:center;text-decoration:none}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN .index-module__detail-btn__Q5YpF:hover,.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN .index-module__source-btn__CcFSW:hover{background:var(--color-primary-light);transform:scale(1.05)}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN .index-module__detail-btn__Q5YpF .index-module__detail-icon__E5Shy,.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN .index-module__source-btn__CcFSW .index-module__detail-icon__E5Shy,.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN .index-module__detail-btn__Q5YpF .index-module__source-icon__J3bUV,.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN .index-module__source-btn__CcFSW .index-module__source-icon__J3bUV{font-size:12px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN .index-module__source-btn__CcFSW{background:var(--color-warning-lighter)}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN .index-module__source-btn__CcFSW:hover{background:var(--color-warning-light)}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__empty-state__ohnRa{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;text-align:center}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__empty-state__ohnRa .index-module__empty-icon__OXdkI{font-size:48px;margin-bottom:16px;opacity:.6}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__empty-state__ohnRa p{font-size:16px;font-weight:500;color:var(--text-primary);margin-bottom:8px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__empty-state__ohnRa span{font-size:14px;color:var(--text-secondary)}.index-module__events-list-loading__e6mCh{display:flex;flex-direction:column;align-items:center;justify-content:center;height:300px;background:var(--bg-quaternary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-radius:12px}.index-module__events-list-loading__e6mCh .index-module__loading-spinner__C04N8{width:32px;height:32px;border:3px solid var(--color-primary-lighter);border-top:3px solid var(--color-primary);border-radius:50%;animation:index-module__spin__n2ASe 1s linear infinite;margin-bottom:16px}.index-module__events-list-loading__e6mCh p{font-size:14px;color:var(--text-secondary);font-weight:500}@keyframes index-module__spin__n2ASe{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@media (width <= 768px){.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr,.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz{padding:12px 16px}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV{font-size:12px}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV.index-module__time-cell__MQe22{width:100px}.index-module__events-list__-m-9O .index-module__events-list-header__IFdcr .index-module__header-cell__Q50BV.index-module__detail-cell__zq1IN{width:60px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__content-cell__XX9h3{gap:8px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__content-cell__XX9h3 .index-module__event-icon__9UCQ3{font-size:16px;width:20px;height:20px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__content-cell__XX9h3 .index-module__event-content__YCPED .index-module__event-title__530MV{font-size:13px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__content-cell__XX9h3 .index-module__event-content__YCPED .index-module__event-description__C3Fjc{font-size:11px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__action-cell__cQC45{width:80px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__action-cell__cQC45 .index-module__action-tag__GZU05{font-size:10px;padding:3px 6px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__time-cell__MQe22{width:100px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__time-cell__MQe22 .index-module__event-time__1VIXa{font-size:11px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN{width:60px;gap:4px}.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN .index-module__detail-btn__Q5YpF,.index-module__events-list__-m-9O .index-module__events-list-body__QknuZ .index-module__event-row__nD7Rz .index-module__cell__KsOts.index-module__detail-cell__zq1IN .index-module__source-btn__CcFSW{width:24px;height:24px}}.index-module__checkbox-container__UxYEH{position:relative;display:inline-block;cursor:pointer;-webkit-user-select:none;user-select:none;margin:0}.index-module__checkbox-container__UxYEH input[type=checkbox]{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.index-module__checkbox-container__UxYEH .index-module__checkmark__-Dj1c{position:relative;display:inline-block;width:16px;height:16px;background-color:var(--bg-primary);border:1.5px solid var(--border-primary);border-radius:3px;transition:all .2s ease}.index-module__checkbox-container__UxYEH .index-module__checkmark__-Dj1c:after{content:\"\";position:absolute;display:none;left:4px;top:1px;width:4px;height:8px;border:solid var(--bg-primary);border-width:0 2px 2px 0;transform:rotate(45deg)}.index-module__checkbox-container__UxYEH:hover .index-module__checkmark__-Dj1c{border-color:var(--color-primary);background-color:var(--color-primary-lighter)}.index-module__checkbox-container__UxYEH input:checked~.index-module__checkmark__-Dj1c{background-color:var(--color-primary);border-color:var(--color-primary)}.index-module__checkbox-container__UxYEH input:checked~.index-module__checkmark__-Dj1c:after{display:block}.index-module__checkbox-container__UxYEH input:indeterminate~.index-module__checkmark__-Dj1c{background-color:var(--color-primary);border-color:var(--color-primary)}.index-module__checkbox-container__UxYEH input:indeterminate~.index-module__checkmark__-Dj1c:after{display:block;left:2px;top:6px;width:8px;height:2px;border:none;background-color:var(--bg-primary);transform:none;border-radius:1px}.index-module__project-selector__1-CU4{position:relative;width:100%}.index-module__selector-trigger__p6K8D{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-primary);border:1px solid var(--border-primary);border-radius:6px;cursor:pointer;transition:all .2s ease;min-height:40px}.index-module__selector-trigger__p6K8D:hover{border-color:var(--color-primary);box-shadow:0 0 0 3px var(--color-primary-light)}.index-module__selector-trigger__p6K8D.index-module__open__eBdQd{border-color:var(--color-primary);box-shadow:0 0 0 3px var(--color-primary-light);border-bottom-left-radius:0;border-bottom-right-radius:0}.index-module__selector-trigger__p6K8D.index-module__disabled__wVRd6{background:#f9fafb;color:#9ca3af;cursor:not-allowed}.index-module__selector-trigger__p6K8D.index-module__disabled__wVRd6:hover{border-color:var(--border-primary)}.index-module__selected-project__yNHIT{flex:1;display:flex;flex-direction:column;align-items:flex-start;gap:1px}.index-module__project-name__zeNO2{font-size:14px;font-weight:500;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.index-module__project-path__c0VnB{font-size:12px;color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.index-module__placeholder__rtMMX{font-size:14px;color:var(--text-secondary)}.index-module__arrow__SO96I{display:flex;align-items:center;justify-content:center;width:20px;height:20px;color:var(--text-secondary);transition:transform .2s ease;flex-shrink:0}.index-module__arrow__SO96I.index-module__down__fc2yF{transform:rotate(0)}.index-module__arrow__SO96I.index-module__up__X13CX{transform:rotate(180deg)}.index-module__dropdown__yr22p{position:absolute;top:100%;left:0;right:0;background:var(--bg-primary);border:1px solid var(--color-primary);border-top:none;box-shadow:var(--shadow-md);z-index:1000;max-height:480px;display:flex;flex-direction:column}.index-module__search-section__EHsZZ{padding:12px;border-bottom:1px solid var(--border-primary);background:var(--bg-secondary)}.index-module__filters-section__yQbV5{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:8px}@media (width <= 768px){.index-module__filters-section__yQbV5{flex-direction:column;align-items:flex-start;gap:8px}}.index-module__search-input__G0qdM{position:relative;margin-bottom:8px}.index-module__search-input__G0qdM .index-module__search-icon__6sNjM{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-secondary);pointer-events:none}.index-module__search-input__G0qdM input{width:100%;padding:8px 10px 8px 32px;border:1px solid var(--border-primary);border-radius:4px;background:var(--bg-primary);color:var(--text-primary);font-size:13px;transition:border-color .2s ease}.index-module__search-input__G0qdM input:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 2px var(--color-primary-light)}.index-module__search-input__G0qdM input::placeholder{color:var(--text-secondary)}.index-module__filter-options__DtiKx{display:flex;gap:12px;margin-bottom:8px}.index-module__filter-option__-schj{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-primary);cursor:pointer;-webkit-user-select:none;user-select:none}.index-module__filter-option__-schj input[type=checkbox]{width:16px;height:16px;accent-color:var(--color-primary)}.index-module__filter-option__-schj:hover{color:var(--color-primary)}.index-module__sort-options__drMrx{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-primary)}.index-module__sort-options__drMrx label{color:var(--text-secondary);white-space:nowrap;flex-shrink:0}.index-module__sort-options__drMrx select{padding:4px 8px;border:1px solid var(--border-primary);border-radius:4px;background:var(--bg-primary);color:var(--text-primary);font-size:13px;cursor:pointer}.index-module__sort-options__drMrx select:focus{outline:none;border-color:var(--color-primary)}.index-module__project-list__wMLbm{flex:1;overflow-y:auto;max-height:300px}.index-module__loading__Jo9tk{display:flex;align-items:center;justify-content:center;gap:8px;padding:32px;color:var(--text-secondary);font-size:14px}.index-module__error__xjbeu{padding:20px;text-align:center;color:#f56565;font-size:14px}.index-module__spinner__tkI8a{width:16px;height:16px;border:2px solid var(--border-primary);border-top:2px solid var(--color-primary);border-radius:50%;animation:index-module__spin__C2hVb 1s linear infinite}@keyframes index-module__spin__C2hVb{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.index-module__project-item__UY9Nn{display:flex;align-items:center;padding:8px 12px;border-bottom:1px solid var(--border-primary);cursor:pointer;transition:all .2s ease;position:relative}.index-module__project-item__UY9Nn:last-child{border-bottom:none}.index-module__project-item__UY9Nn:hover{background:var(--bg-hover)}.index-module__project-item__UY9Nn.index-module__selected__LX5fz{background:var(--color-primary-light);border-left:3px solid var(--color-primary)}.index-module__project-info__lH-Bx{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}.index-module__project-info__lH-Bx .index-module__project-name__zeNO2{font-size:13px;font-weight:500;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.2}.index-module__project-info__lH-Bx .index-module__project-path__c0VnB{font-size:11px;color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.2}.index-module__project-info__lH-Bx .index-module__project-description__lwCNx{font-size:10px;color:var(--text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.2}.index-module__star-icon__KOGRH{color:var(--color-warning);margin-left:8px;flex-shrink:0}.index-module__check-icon__eEeX-{color:var(--color-primary);margin-left:8px;flex-shrink:0}.index-module__empty-state__BkXac{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 24px;text-align:center}.index-module__empty-icon__W0Opg{color:var(--text-secondary);margin-bottom:16px;opacity:.5}.index-module__empty-text__-QIhF{font-size:16px;font-weight:500;color:var(--text-secondary);margin-bottom:8px}.index-module__empty-hint__pdwSU{font-size:14px;color:var(--text-secondary)}.index-module__pagination__AFW-U{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-top:1px solid var(--border-primary);background:var(--bg-secondary)}.index-module__page-button__dDr90{padding:4px 8px;border:1px solid var(--border-primary);border-radius:3px;background:var(--bg-primary);color:var(--text-primary);font-size:12px;cursor:pointer;transition:all .2s ease;white-space:nowrap;min-width:fit-content;flex-shrink:0}.index-module__page-button__dDr90:hover:not(:disabled){border-color:var(--color-primary);color:var(--color-primary)}.index-module__page-button__dDr90:disabled{opacity:.5;cursor:not-allowed}.index-module__page-info__81boc{display:flex;flex-direction:column;align-items:center;gap:1px;font-size:12px;color:var(--text-secondary);text-align:center}.index-module__total-count__ix0Nf{font-size:11px;color:var(--text-secondary)}@media (width <= 768px){.index-module__dropdown__yr22p{max-height:60vh}.index-module__search-section__EHsZZ{padding:12px}.index-module__filter-options__DtiKx{flex-direction:column;gap:8px}.index-module__sort-options__drMrx{flex-direction:column;align-items:flex-start;gap:4px}.index-module__pagination__AFW-U{flex-direction:column;gap:8px}.index-module__page-info__81boc{order:-1}}.index-module__changelogPanel__bsoH5{display:flex;flex-direction:column;height:100%;min-height:0}.index-module__projectSelectorContainer__DVUJQ{flex-shrink:0;padding:10px;border-bottom:1px solid var(--border-primary)}.index-module__eventsListContainer__JlSig{flex:1;min-height:0;display:flex;flex-direction:column}.index-module__projectSelector__YJcIm{width:100%;padding:8px 12px;border-radius:6px;border:1px solid var(--border-primary);background-color:var(--bg-primary);color:var(--text-primary);font-size:14px;cursor:pointer;transition:border-color .2s}.index-module__projectSelector__YJcIm:hover{border-color:var(--color-primary)}.index-module__projectSelector__YJcIm:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 2px #1890ff33}.index-module__container__INDLo{padding:20px;background:var(--bg-primary);border-radius:8px;box-shadow:0 2px 8px #0000001a}.index-module__header__JYZFC{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border-primary)}.index-module__title__IT1c-{font-size:18px;font-weight:600;color:var(--text-primary);margin:0}.index-module__controls__fFq10{display:flex;gap:12px;align-items:center}.index-module__sort-select__mgjbf{padding:6px 12px;border:1px solid var(--border-primary);border-radius:4px;background:var(--bg-primary);color:var(--text-primary);font-size:14px;cursor:pointer;transition:border-color .2s}.index-module__sort-select__mgjbf:hover{border-color:var(--color-primary)}.index-module__sort-select__mgjbf:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 2px #1890ff33}.index-module__generate-btn__pAu5M{padding:8px 16px;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:background-color .2s;white-space:nowrap;min-width:fit-content}.index-module__generate-btn__pAu5M:hover{background:linear-gradient(135deg,var(--color-primary-hover),var(--color-primary-dark))}.index-module__generate-btn__pAu5M:disabled{background:var(--border-primary);cursor:not-allowed}.index-module__content__l-gxL{min-height:400px}.index-module__loading__fVGQk{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;color:var(--text-secondary)}.index-module__loading-spinner__a0Sj1{width:32px;height:32px;border:3px solid var(--border-primary);border-top:3px solid var(--color-primary);border-radius:50%;animation:index-module__spin__oX-s8 1s linear infinite;margin-bottom:12px}@keyframes index-module__spin__oX-s8{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.index-module__loading-text__H7hcV{font-size:14px;margin:0}.index-module__events-list__Hp5e3{display:flex;flex-direction:column;gap:16px}.index-module__select-all__LAlCe{display:flex;align-items:center;gap:8px;padding:12px;background:var(--bg-secondary);border-radius:6px;margin-bottom:16px}.index-module__select-all-checkbox__Do2G-{width:16px;height:16px;cursor:pointer}.index-module__select-all-label__RFt8J{font-size:14px;color:var(--text-primary);cursor:pointer;-webkit-user-select:none;user-select:none;flex-shrink:0}.index-module__event-item__-I7HP{display:flex;align-items:flex-start;gap:12px;padding:16px;background:var(--bg-primary);border:1px solid var(--border-primary);border-radius:8px;transition:all .2s}.index-module__event-item__-I7HP:hover{border-color:var(--color-primary);box-shadow:var(--shadow-xs)}.index-module__event-item__-I7HP.index-module__selected__d0l7V{border-color:var(--color-primary);background:var(--color-primary-lighter)}.index-module__event-checkbox__ydY13{width:16px;height:16px;margin-top:2px;cursor:pointer;flex-shrink:0}.index-module__event-content__HXx0J{flex:1;min-width:0}.index-module__event-header__8Dyo4{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:8px}.index-module__event-title__7sWt5{font-size:14px;font-weight:500;color:var(--text-primary);margin:0;line-height:1.4;flex:1;min-width:0}.index-module__event-time__7v1hW{font-size:12px;color:var(--text-secondary);white-space:nowrap;flex-shrink:0}.index-module__event-description__H04EJ{font-size:13px;color:var(--text-secondary);line-height:1.4;margin:0;word-break:break-word}.index-module__event-actions__uTtO6{display:flex;gap:8px;margin-top:8px}.index-module__event-action-btn__WLTL6{padding:4px 8px;font-size:12px;border:1px solid var(--border-primary);border-radius:4px;background:var(--bg-primary);color:var(--text-secondary);cursor:pointer;transition:all .2s;white-space:nowrap;min-width:fit-content}.index-module__event-action-btn__WLTL6:hover{border-color:var(--color-primary);color:var(--color-primary)}.index-module__empty-state__TJ6Ei{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;color:var(--text-secondary);text-align:center}.index-module__empty-icon__eKW0H{font-size:48px;margin-bottom:16px;opacity:.5}.index-module__empty-title__PngrC{font-size:16px;font-weight:500;margin:0 0 8px;color:var(--text-primary)}.index-module__empty-description__axZpE{font-size:14px;margin:0;max-width:300px;line-height:1.5}.index-module__pagination-wrapper__cQGg7{margin-top:24px;display:flex;justify-content:center}.index-module__error-state__SjWDO{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;color:var(--color-error);text-align:center}.index-module__error-icon__f0H5g{font-size:48px;margin-bottom:16px;opacity:.7}.index-module__error-title__luOa4{font-size:16px;font-weight:500;margin:0 0 8px}.index-module__error-description__aTnxA{font-size:14px;margin:0 0 16px;max-width:400px;line-height:1.5}.index-module__retry-btn__oOrQy{padding:8px 16px;background:var(--error-color);color:#fff;border:none;border-radius:6px;font-size:14px;cursor:pointer;transition:background-color .2s;white-space:nowrap;min-width:fit-content}.index-module__retry-btn__oOrQy:hover{background:var(--error-hover-color)}.index-module__events-list-header__Pe-0x{display:flex;background:var(--bg-secondary-color);border-radius:6px 6px 0 0;border:1px solid var(--border-color);border-bottom:none;font-weight:500;font-size:14px;color:var(--text-color)}.index-module__header-cell__7z2Xh{padding:12px 16px;display:flex;align-items:center;gap:8px;border-right:1px solid var(--border-color);cursor:pointer;transition:background-color .2s}.index-module__header-cell__7z2Xh:last-child{border-right:none}.index-module__header-cell__7z2Xh:hover{background:var(--color-primary-lighter)}.index-module__checkbox-cell__KCF7Z{width:60px;justify-content:center;cursor:default}.index-module__checkbox-cell__KCF7Z:hover{background:transparent}.index-module__content-cell__ok-8L{flex:1;min-width:200px}.index-module__action-cell__ga0QX{width:100px;justify-content:center}.index-module__time-cell__yN6u3{width:150px;justify-content:center}.index-module__detail-cell__5iSuX{width:80px;justify-content:center;cursor:default}.index-module__detail-cell__5iSuX:hover{background:transparent}.index-module__sort-icon__Vjz3Y{font-size:12px;color:var(--text-secondary-color);transition:color .2s}.index-module__events-list-body__fMHeJ{border:1px solid var(--border-color);border-radius:0 0 6px 6px;background:var(--bg-color)}.index-module__event-row__--jCz{display:flex;border-bottom:1px solid var(--border-color);transition:all .2s}.index-module__event-row__--jCz:last-child{border-bottom:none}.index-module__event-row__--jCz:hover{background:var(--bg-hover-color)}.index-module__event-row__--jCz.index-module__selected__d0l7V{background:var(--color-primary-lighter);border-color:var(--color-primary)}.index-module__cell__AhvRU{padding:12px 16px;display:flex;align-items:center;border-right:1px solid var(--border-color);min-height:60px}.index-module__cell__AhvRU:last-child{border-right:none}.index-module__checkbox-container__4mZI1{position:relative;display:inline-block;cursor:pointer;-webkit-user-select:none;user-select:none}.index-module__checkbox-container__4mZI1 input[type=checkbox]{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.index-module__checkmark__wdKe2{position:relative;display:inline-block;width:16px;height:16px;background:var(--bg-color);border:2px solid var(--border-color);border-radius:3px;transition:all .2s}.index-module__checkmark__wdKe2:after{content:\"\";position:absolute;display:none;left:4px;top:1px;width:4px;height:8px;border:solid white;border-width:0 2px 2px 0;transform:rotate(45deg)}.index-module__checkbox-container__4mZI1 input:checked~.index-module__checkmark__wdKe2{background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));border-color:var(--color-primary)}.index-module__checkbox-container__4mZI1 input:checked~.index-module__checkmark__wdKe2:after{display:block}.index-module__checkbox-container__4mZI1 input:indeterminate~.index-module__checkmark__wdKe2{background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));border-color:var(--color-primary)}.index-module__checkbox-container__4mZI1 input:indeterminate~.index-module__checkmark__wdKe2:after{display:block;left:2px;top:6px;width:8px;height:2px;border:none;background:#fff;transform:none}.index-module__event-icon__yaS3k{font-size:16px;margin-right:8px;flex-shrink:0}.index-module__action-tag__Qw0CC{padding:4px 8px;background:var(--bg-secondary-color);color:var(--text-secondary-color);border-radius:4px;font-size:12px;font-weight:500;white-space:nowrap}.index-module__detail-btn__Ee0wE{padding:6px 8px;background:transparent;border:1px solid var(--border-color);border-radius:4px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center}.index-module__detail-btn__Ee0wE:hover{border-color:var(--color-primary);background:var(--color-primary-lighter)}.index-module__detail-icon__77fiD{font-size:14px}.index-module__action-btn__To7Ms{display:flex;align-items:center;gap:6px;padding:8px 12px;background:var(--color-primary-lighter);color:var(--color-primary);border:none;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s ease;white-space:nowrap;outline:none}.index-module__action-btn__To7Ms:hover{background:var(--color-primary-light)}.index-module__action-btn__To7Ms:disabled{cursor:not-allowed;opacity:.6;transform:none}.index-module__action-btn__To7Ms.index-module__version-btn__8d3di{background:var(--color-warning-light);color:var(--color-warning)}.index-module__action-btn__To7Ms.index-module__version-btn__8d3di:hover{background:var(--color-warning-light)}.index-module__action-btn__To7Ms.index-module__version-btn__8d3di.index-module__has-update__tNkZZ{background:var(--color-error-light);color:var(--color-error)}.index-module__action-btn__To7Ms.index-module__version-btn__8d3di.index-module__has-update__tNkZZ:hover{background:var(--color-error-light)}.index-module__icon__EhhVu{font-size:14px;line-height:1}.index-module__text__4iX-h{font-weight:500}.index-module__error__AUGjJ{font-size:12px;color:var(--color-danger);cursor:help}.index-module__notification-overlay__E4dh-{position:fixed;top:0;right:0;bottom:0;left:0;background:var(--overlay);display:flex;align-items:center;justify-content:center;z-index:10000;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.index-module__notification__ckX1l{background:var(--bg-primary);border-radius:12px;box-shadow:var(--shadow-xl);max-width:480px;width:90vw;max-height:80vh;overflow:hidden;animation:index-module__slide-in__qJkKL .3s ease-out;border:1px solid var(--border-primary);position:relative}.index-module__notification-header__nJZ3Q{display:flex;align-items:center;justify-content:space-between;padding:20px 24px 16px;border-bottom:1px solid var(--border-primary)}.index-module__notification-header__nJZ3Q h3{margin:0;font-size:18px;font-weight:600;color:var(--text-primary)}.index-module__close-btn__9uULv{background:none;border:none;font-size:24px;color:var(--text-secondary);cursor:pointer;padding:4px;border-radius:4px;transition:all .2s ease}.index-module__close-btn__9uULv:hover{background:var(--btn-hover-bg);color:var(--text-primary)}.index-module__notification-body__nnab7{padding:20px 24px}.index-module__version-info__-pyIP{margin-bottom:16px}.index-module__version-info__-pyIP p{margin:8px 0;font-size:14px;color:var(--text-primary)}.index-module__version-info__-pyIP p strong{font-weight:600}.index-module__release-notes__iU2jG h4{margin:0 0 12px;font-size:14px;font-weight:600;color:var(--text-primary)}.index-module__notes-content__ZpxxA{background:var(--bg-secondary);border:1px solid var(--border-primary);border-radius:6px;padding:12px;font-size:13px;line-height:1.5;color:var(--text-secondary);max-height:200px;overflow-y:auto;white-space:pre-wrap}.index-module__notification-footer__La-ia{display:flex;gap:12px;padding:16px 24px 20px;border-top:1px solid var(--border-primary);justify-content:flex-end}.index-module__later-btn__Q40Lc,.index-module__update-btn__lD1V2{padding:8px 16px;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s ease;border:1px solid}.index-module__later-btn__Q40Lc{background:var(--bg-primary);border-color:var(--border-primary);color:var(--text-primary)}.index-module__later-btn__Q40Lc:hover{background:var(--btn-hover-bg);border-color:var(--border-secondary)}.index-module__update-btn__lD1V2{background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));border-color:var(--color-primary);color:var(--btn-primary-text)}.index-module__update-btn__lD1V2:hover{background:var(--color-primary-hover);border-color:var(--color-primary-hover)}@keyframes index-module__slide-in__qJkKL{0%{opacity:0;transform:translateY(-20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}@media (width <= 768px){.index-module__notification__ckX1l{margin:20px;width:calc(100vw - 40px)}.index-module__notification-header__nJZ3Q,.index-module__notification-body__nnab7,.index-module__notification-footer__La-ia{padding-left:16px;padding-right:16px}.index-module__action-btn__To7Ms .index-module__text__4iX-h{display:none}}.index-module__main-panel__82FLm{display:flex;flex-direction:column;height:100vh;background:var(--bg-primary);color:var(--text-primary)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;background:var(--bg-secondary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-bottom:1px solid var(--border-primary);box-shadow:0 2px 20px #0000001a;position:static;z-index:10}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5{display:flex;align-items:center;gap:16px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 h1{margin:0;font-size:28px;font-weight:700;color:var(--text-primary)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo{display:flex;align-items:center;gap:16px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG{display:flex;align-items:center;background:var(--bg-secondary);border-radius:12px;border:1px solid var(--border-primary);position:relative;height:40px;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);box-shadow:0 2px 8px #0000001a;transition:all .2s ease-in-out}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG:hover,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG:hover{border-color:var(--color-primary);box-shadow:0 4px 12px #667eea26}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-track__82VKI,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-track__82VKI{display:flex;position:relative;width:100%;height:100%;border-radius:8px;overflow:hidden}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-slider__tkY4o,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-slider__tkY4o{top:0;left:0;width:50%;height:100%;background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-info) 100%);border-radius:8px;transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:0 4px 20px #667eea80,0 0 0 2px #667eea33;position:relative;overflow:hidden;z-index:1}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-slider__tkY4o:before,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-slider__tkY4o:before{content:\"\";position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);transition:left .5s}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-slider__tkY4o:after,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-slider__tkY4o:after{content:\"\";position:absolute;background:linear-gradient(135deg,var(--color-primary),var(--color-info));border-radius:10px;z-index:-1;opacity:.3;filter:blur(4px)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-slider__tkY4o:hover:before,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-slider__tkY4o:hover:before{left:100%}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-slider__tkY4o.index-module__slide-right__qPOZu,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-slider__tkY4o.index-module__slide-right__qPOZu{transform:translate(100%)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU{flex:1 1 0%;display:flex;align-items:center;justify-content:center;height:100%;padding:0 12px;font-size:13px;font-weight:600;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;white-space:nowrap;border-radius:8px;border:none;background:transparent}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU.index-module__active__Mr5KU,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU.index-module__active__Mr5KU{color:var(--btn-primary-text);font-weight:700;transform:scale(1.02);text-shadow:0 1px 2px rgba(0,0,0,.3);background:linear-gradient(135deg,var(--color-primary),var(--color-info))}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU:not(.index-module__active__Mr5KU),.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU:not(.index-module__active__Mr5KU){color:var(--text-secondary)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU:not(.index-module__active__Mr5KU):hover,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU:not(.index-module__active__Mr5KU):hover{color:var(--text-primary);background:#ffffff0d}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU .index-module__toggle-icon__AI6K7,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU .index-module__toggle-icon__AI6K7{margin-right:8px;font-size:16px;transition:transform .2s ease}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU .index-module__toggle-label__1qZLz,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU .index-module__toggle-label__1qZLz{font-weight:500;flex-shrink:0}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU:active,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__mode-toggle__9yafG .index-module__toggle-option__ZhXXU:active{transform:scale(.98)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__divider__QXSgp,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__divider__QXSgp{width:1px;height:24px;background:var(--border-secondary);margin:0 8px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl{display:flex;align-items:center;gap:12px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP{display:flex;align-items:center;justify-content:center;gap:8px;height:40px;padding:0 16px;border-radius:12px;background:var(--bg-secondary);border:1px solid var(--border-primary);color:var(--text-primary);cursor:pointer;transition:all .2s ease-in-out;white-space:nowrap}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP:hover,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP:hover{background:var(--color-primary-light);color:var(--color-primary);border-color:var(--color-primary);box-shadow:0 4px 12px #0000001a}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP .index-module__btn-icon__ZaYHk,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP .index-module__btn-icon__ZaYHk{display:flex;align-items:center;justify-content:center;width:18px;height:18px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP .index-module__btn-icon__ZaYHk svg,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP .index-module__btn-icon__ZaYHk svg{width:100%;height:100%}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP .index-module__btn-label__tM2Rz,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP .index-module__btn-label__tM2Rz{font-size:14px;font-weight:500;line-height:1}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3{background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-info) 100%);border:none;color:#fff;position:relative;overflow:hidden}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3:before,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3:before{content:\"\";position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);transition:left .5s}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3:hover,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3:hover{background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-primary-dark) 100%);box-shadow:var(--shadow-lg);color:#fff}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3:hover:before,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3:hover:before{left:100%}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3 .index-module__btn-icon__ZaYHk,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3 .index-module__btn-icon__ZaYHk{filter:drop-shadow(0 1px 2px rgba(0,0,0,.1))}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3 .index-module__btn-label__tM2Rz,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3 .index-module__btn-label__tM2Rz{font-weight:600;text-shadow:0 1px 2px rgba(0,0,0,.1)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__config-incomplete__bLEHk,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__config-incomplete__bLEHk{border-color:var(--color-warning);background:var(--color-warning-light);color:var(--color-warning);position:relative}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__config-incomplete__bLEHk:before,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__config-incomplete__bLEHk:before{content:\"\";position:absolute;top:-2px;right:-2px;width:8px;height:8px;background:linear-gradient(135deg,var(--color-warning),var(--warning-color));border-radius:50%;animation:index-module__pulse__O-BV4 2s infinite}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__config-incomplete__bLEHk:hover,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__config-incomplete__bLEHk:hover{border-color:var(--color-warning);background:linear-gradient(135deg,var(--color-warning),var(--warning-color));color:#fff;box-shadow:var(--shadow-md)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__config-incomplete__bLEHk .index-module__btn-label__tM2Rz,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__config-incomplete__bLEHk .index-module__btn-label__tM2Rz{display:flex;align-items:center;gap:6px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__config-incomplete__bLEHk .index-module__config-badge__0znDE,.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-buttons__xGRHl .index-module__action-btn__x4IAP.index-module__config-incomplete__bLEHk .index-module__config-badge__0znDE{background:linear-gradient(135deg,var(--color-warning),var(--warning-color));color:#fff;font-size:10px;font-weight:600;padding:2px 4px;border-radius:8px;line-height:1;min-width:20px;text-align:center}.index-module__changelog-section__afcqm{flex:1;min-height:0;display:flex;flex-direction:column}.index-module__changelog-section__afcqm .index-module__projects-section__eNkKP{margin-bottom:20px}.index-module__changelog-section__afcqm .index-module__commits-section__EixBG{margin-top:20px}.index-module__changelog-section__afcqm .index-module__section-header__jdQWo{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid var(--border-primary)}.index-module__changelog-section__afcqm .index-module__section-header__jdQWo h3{margin:0;font-size:16px;font-weight:600;color:var(--text-primary)}.index-module__changelog-section__afcqm .index-module__projects-list__5CGy6{max-height:300px;overflow-y:auto;border:1px solid var(--border-primary);border-radius:6px}.index-module__changelog-section__afcqm .index-module__project-item__U-6AJ{padding:12px 16px;border-bottom:1px solid var(--border-primary);cursor:pointer;transition:all .2s ease}.index-module__changelog-section__afcqm .index-module__project-item__U-6AJ:last-child{border-bottom:none}.index-module__changelog-section__afcqm .index-module__project-item__U-6AJ:hover{background:var(--bg-hover)}.index-module__changelog-section__afcqm .index-module__project-item__U-6AJ.index-module__selected__hxeGU{background:var(--color-primary-light);border-left:3px solid var(--color-primary)}.index-module__changelog-section__afcqm .index-module__project-info__x4kU3 .index-module__project-name__PZIIk{margin:0 0 4px;font-size:14px;font-weight:600;color:var(--text-primary)}.index-module__changelog-section__afcqm .index-module__project-info__x4kU3 .index-module__project-description__54hoR{margin:0 0 8px;font-size:12px;color:var(--text-secondary);line-height:1.4}.index-module__changelog-section__afcqm .index-module__project-info__x4kU3 .index-module__project-meta__ZjnkM{display:flex;align-items:center;gap:12px}.index-module__changelog-section__afcqm .index-module__project-info__x4kU3 .index-module__project-meta__ZjnkM .index-module__last-activity__nM8Tj{font-size:11px;color:var(--text-secondary)}.index-module__changelog-section__afcqm .index-module__commits-list__WBJw5{max-height:400px;overflow-y:auto;border:1px solid var(--border-primary);border-radius:6px}.index-module__changelog-section__afcqm .index-module__commit-item__MQuzM{padding:12px 16px;border-bottom:1px solid var(--border-primary)}.index-module__changelog-section__afcqm .index-module__commit-item__MQuzM:last-child{border-bottom:none}.index-module__changelog-section__afcqm .index-module__commit-info__PzzU5 .index-module__commit-title__UcB1e{margin:0 0 4px;font-size:14px;font-weight:600;color:var(--text-primary);line-height:1.3}.index-module__changelog-section__afcqm .index-module__commit-info__PzzU5 .index-module__commit-message__KzrgK{margin:0 0 8px;font-size:12px;color:var(--text-secondary);line-height:1.4;max-height:40px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;line-clamp:2;-webkit-line-clamp:2;-webkit-box-orient:vertical}.index-module__changelog-section__afcqm .index-module__commit-info__PzzU5 .index-module__commit-meta__yYNDx{display:flex;align-items:center;gap:12px;font-size:11px}.index-module__changelog-section__afcqm .index-module__commit-info__PzzU5 .index-module__commit-meta__yYNDx .index-module__commit-author__fISkm{color:var(--text-secondary);font-weight:500}.index-module__changelog-section__afcqm .index-module__commit-info__PzzU5 .index-module__commit-meta__yYNDx .index-module__commit-date__9vTCG{color:var(--text-secondary)}.index-module__changelog-section__afcqm .index-module__commit-info__PzzU5 .index-module__commit-meta__yYNDx .index-module__commit-link__SLhDR{color:var(--color-primary);text-decoration:none;font-weight:500}.index-module__changelog-section__afcqm .index-module__commit-info__PzzU5 .index-module__commit-meta__yYNDx .index-module__commit-link__SLhDR:hover{text-decoration:underline}.index-module__filter-section__gMBIz{flex-shrink:0;padding:16px 20px;background:var(--bg-quaternary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-bottom:1px solid var(--border-secondary)}.index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq{margin-bottom:16px}.index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq:last-child{margin-bottom:0}.index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq .index-module__filter-label__TDZ3H{display:block;font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:8px}.index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq .index-module__filter-options__4AUEQ{display:flex;flex-wrap:wrap;gap:8px}.index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq .index-module__filter-options__4AUEQ .index-module__filter-option__-CSf1{padding:6px 12px;border:1px solid var(--btn-border);border-radius:8px;background:var(--input-bg);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:var(--text-primary);font-size:13px;font-weight:500;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);outline:none}.index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq .index-module__filter-options__4AUEQ .index-module__filter-option__-CSf1:hover{border-color:#007aff80;background:var(--color-primary-light);box-shadow:0 4px 12px #007aff26}.index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq .index-module__filter-options__4AUEQ .index-module__filter-option__-CSf1.index-module__active__Mr5KU{border-color:var(--color-primary);background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-info) 100%);color:#fff;box-shadow:0 4px 12px #007aff4d}.index-module__events-section__gJwdk{flex:1;min-height:0}@media (width <= 768px){.index-module__main-panel__82FLm{padding:16px;gap:12px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p{flex-direction:column;align-items:stretch;gap:12px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5{justify-content:center}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 h1{font-size:24px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo{justify-content:center;flex-wrap:wrap}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-btn__x4IAP{font-size:12px;padding:6px 10px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-btn__x4IAP .index-module__icon__tX8wX{font-size:12px}}.index-module__icon__tX8wX{display:inline-block;width:1em;height:1em;vertical-align:middle}@keyframes index-module__pulse__O-BV4{0%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.2)}to{opacity:1;transform:scale(1)}}.index-module__modal-mask__XYxyO{position:fixed;top:0;right:0;bottom:0;left:0;width:100vw;height:100vh;background:var(--overlay);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);z-index:9999;display:flex;align-items:center;justify-content:center;animation:index-module__modal-mask-fade-in__R7ZBs .3s cubic-bezier(.4,0,.2,1)}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip{display:flex;align-items:flex-start;justify-content:center;width:100%;height:100%;padding:24px}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u{background:var(--bg-quaternary);-webkit-backdrop-filter:blur(40px);backdrop-filter:blur(40px);border-radius:16px;border:1px solid var(--border-secondary);box-shadow:var(--shadow-lg);max-height:90vh;display:flex;flex-direction:column;overflow:hidden;animation:index-module__modal-slide-in__VC-Dp .4s cubic-bezier(.34,1.56,.64,1)}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-header__GdUjX{display:flex;justify-content:space-between;align-items:center;padding:20px 24px 16px;border-bottom:1px solid var(--border-secondary);flex-shrink:0}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-header__GdUjX .index-module__modal-title__cafB-{font-size:18px;font-weight:600;color:var(--text-primary);margin:0}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-header__GdUjX .index-module__modal-close__ZuUgf{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;background:var(--bg-secondary);border-radius:6px;color:var(--text-secondary);cursor:pointer;transition:all .2s ease}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-header__GdUjX .index-module__modal-close__ZuUgf:hover{background:var(--bg-tertiary);color:var(--text-primary)}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-header__GdUjX .index-module__modal-close__ZuUgf span{font-size:18px;line-height:1}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-body__j5X3U{flex:1;overflow-y:auto;padding:20px 24px}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-body__j5X3U::-webkit-scrollbar{width:6px}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-body__j5X3U::-webkit-scrollbar-track{background:transparent}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-body__j5X3U::-webkit-scrollbar-thumb{background:var(--border-primary);border-radius:3px}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-body__j5X3U::-webkit-scrollbar-thumb:hover{background:var(--scrollbar-thumb-hover)}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-footer__3q-wn{flex-shrink:0;padding:16px 24px 20px;border-top:1px solid var(--border-secondary);background:var(--bg-secondary)}.index-module__btn-primary__OwgHI{padding:8px 16px;border:none;border-radius:10px;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));color:var(--btn-primary-text);font-size:14px;font-weight:600;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:var(--shadow-sm)}.index-module__btn-primary__OwgHI:hover:not(:disabled){background:var(--color-primary-dark);transform:translateY(-1px);box-shadow:var(--shadow-md)}.index-module__btn-primary__OwgHI:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-sm)}.index-module__btn-primary__OwgHI:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__btn-secondary__o1dNd{padding:8px 16px;border:1px solid var(--border-primary);border-radius:10px;background:var(--bg-quaternary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);color:var(--text-primary);font-size:14px;font-weight:500;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1)}.index-module__btn-secondary__o1dNd:hover:not(:disabled){border-color:var(--color-primary);background:var(--color-primary-lighter);transform:translateY(-1px);box-shadow:var(--shadow-sm)}.index-module__btn-secondary__o1dNd:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-xs)}.index-module__btn-secondary__o1dNd:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__btn-text__s61zq{padding:4px 8px;border:none;background:transparent;color:var(--color-primary);font-size:13px;font-weight:500;cursor:pointer;border-radius:4px;transition:all .2s ease}.index-module__btn-text__s61zq:hover:not(:disabled){background:var(--color-primary-lighter)}.index-module__btn-text__s61zq:disabled{opacity:.5;cursor:not-allowed}@keyframes index-module__modal-mask-fade-in__R7ZBs{0%{opacity:0}to{opacity:1}}@keyframes index-module__modal-slide-in__VC-Dp{0%{opacity:0;transform:translateY(-20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}.index-module__config-status__0q8ZM{background:var(--bg-secondary);border:1px solid var(--border-primary);border-radius:12px;padding:16px;transition:all .2s ease}.index-module__config-status__0q8ZM.index-module__clickable__pZ86X{cursor:pointer}.index-module__config-status__0q8ZM.index-module__clickable__pZ86X:hover{border-color:var(--color-primary);box-shadow:0 4px 12px #667eea26}.index-module__config-status__0q8ZM.index-module__compact__-QN-s{padding:12px;border-radius:8px}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__compact-content__wSrCk{display:flex;align-items:center;gap:8px}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__compact-content__wSrCk .index-module__status-icon__7jFiQ{font-size:14px;line-height:1}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__compact-content__wSrCk .index-module__compact-text__7OyGG{font-size:13px;font-weight:500;color:var(--text-primary);flex:1}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__compact-content__wSrCk .index-module__expand-button__NusWg{background:none;border:1px solid var(--border-secondary);border-radius:4px;padding:4px 8px;font-size:11px;color:var(--text-secondary);cursor:pointer;transition:all .2s ease;white-space:nowrap}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__compact-content__wSrCk .index-module__expand-button__NusWg:hover{border-color:var(--color-primary);color:var(--color-primary);background:var(--color-primary-light)}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__expanded-content__Hih4c{margin-top:12px;padding-top:12px;border-top:1px solid var(--border-secondary)}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__expanded-content__Hih4c .index-module__config-items__quryV{gap:6px}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__expanded-content__Hih4c .index-module__config-items__quryV .index-module__compact-item__UCAOc{padding:8px 10px;background:var(--bg-tertiary);border-radius:6px;display:flex;align-items:center;justify-content:space-between}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__expanded-content__Hih4c .index-module__config-items__quryV .index-module__compact-item__UCAOc .index-module__item-label__24FVq{font-size:12px;font-weight:500;color:var(--text-primary)}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__expanded-content__Hih4c .index-module__config-items__quryV .index-module__compact-item__UCAOc .index-module__item-icon__4yYRW{font-size:12px;font-weight:700;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__expanded-content__Hih4c .index-module__config-items__quryV .index-module__compact-item__UCAOc.index-module__valid__Xyroo{border:1px solid var(--color-success);background:var(--color-success-light)}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__expanded-content__Hih4c .index-module__config-items__quryV .index-module__compact-item__UCAOc.index-module__valid__Xyroo .index-module__item-icon__4yYRW{background:linear-gradient(135deg,var(--color-success),var(--success-color));color:#fff}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__expanded-content__Hih4c .index-module__config-items__quryV .index-module__compact-item__UCAOc.index-module__invalid__Fn-hL{border:1px solid var(--color-warning);background:var(--color-warning-light)}.index-module__config-status__0q8ZM.index-module__compact__-QN-s .index-module__expanded-content__Hih4c .index-module__config-items__quryV .index-module__compact-item__UCAOc.index-module__invalid__Fn-hL .index-module__item-icon__4yYRW{background:linear-gradient(135deg,var(--color-warning),var(--warning-color));color:#fff}.index-module__config-status__0q8ZM .index-module__status-header__AORn-{margin-bottom:16px}.index-module__config-status__0q8ZM .index-module__status-header__AORn- .index-module__status-title__6hAD6{display:flex;align-items:center;gap:8px;margin-bottom:12px}.index-module__config-status__0q8ZM .index-module__status-header__AORn- .index-module__status-title__6hAD6 .index-module__status-icon__7jFiQ{font-size:16px;line-height:1}.index-module__config-status__0q8ZM .index-module__status-header__AORn- .index-module__status-title__6hAD6 .index-module__status-text__llRfw{font-size:14px;font-weight:600;color:var(--text-primary)}.index-module__config-status__0q8ZM .index-module__status-header__AORn- .index-module__progress-container__ofPka{display:flex;align-items:center;gap:12px}.index-module__config-status__0q8ZM .index-module__status-header__AORn- .index-module__progress-container__ofPka .index-module__progress-bar__CFedX{flex:1;height:8px;background:var(--bg-tertiary);border-radius:4px;overflow:hidden;border:1px solid var(--border-secondary)}.index-module__config-status__0q8ZM .index-module__status-header__AORn- .index-module__progress-container__ofPka .index-module__progress-bar__CFedX .index-module__progress-fill__w-23-{height:100%;background:linear-gradient(90deg,var(--color-warning) 0%,var(--color-primary) 50%,var(--color-success) 100%);transition:all .3s ease;border-radius:3px}.index-module__config-status__0q8ZM .index-module__status-header__AORn- .index-module__progress-container__ofPka .index-module__progress-bar__CFedX .index-module__progress-fill__w-23-.index-module__complete__L0-gl{background:linear-gradient(135deg,var(--color-success),var(--success-color));box-shadow:0 0 8px var(--color-success-light)}.index-module__config-status__0q8ZM .index-module__status-header__AORn- .index-module__progress-container__ofPka .index-module__progress-text__uoYK9{font-size:12px;font-weight:600;color:var(--text-secondary);min-width:35px;text-align:right}.index-module__config-status__0q8ZM .index-module__config-items__quryV{display:flex;flex-direction:column;gap:8px}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF{display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--bg-tertiary);border-radius:8px;border:1px solid var(--border-secondary);transition:all .2s ease}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF .index-module__item-info__BhIr5{display:flex;flex-direction:column;gap:2px}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF .index-module__item-info__BhIr5 .index-module__item-label__24FVq{font-size:13px;font-weight:600;color:var(--text-primary)}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF .index-module__item-info__BhIr5 .index-module__item-status__3ppNU{font-size:11px;color:var(--text-secondary)}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF .index-module__item-icon__4yYRW{font-size:14px;font-weight:700;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF.index-module__valid__Xyroo{border-color:var(--color-success);background:var(--color-success-light)}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF.index-module__valid__Xyroo .index-module__item-icon__4yYRW{background:linear-gradient(135deg,var(--color-success),var(--success-color));color:#fff}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF.index-module__valid__Xyroo .index-module__item-status__3ppNU{color:var(--color-success)}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF.index-module__invalid__Fn-hL{border-color:var(--color-warning);background:var(--color-warning-light)}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF.index-module__invalid__Fn-hL .index-module__item-icon__4yYRW{background:linear-gradient(135deg,var(--color-warning),var(--warning-color));color:#fff}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF.index-module__invalid__Fn-hL .index-module__item-status__3ppNU{color:var(--color-warning)}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF:hover{transform:translateY(-1px);box-shadow:0 2px 8px #0000001a}@media (width <= 768px){.index-module__config-status__0q8ZM{padding:12px}.index-module__config-status__0q8ZM .index-module__status-header__AORn-{margin-bottom:12px}.index-module__config-status__0q8ZM .index-module__status-header__AORn- .index-module__status-title__6hAD6 .index-module__status-text__llRfw{font-size:13px}.index-module__config-status__0q8ZM .index-module__status-header__AORn- .index-module__progress-container__ofPka{gap:8px}.index-module__config-status__0q8ZM .index-module__status-header__AORn- .index-module__progress-container__ofPka .index-module__progress-text__uoYK9{font-size:11px;min-width:30px}.index-module__config-status__0q8ZM .index-module__config-items__quryV{gap:6px}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF{padding:10px}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF .index-module__item-info__BhIr5 .index-module__item-label__24FVq{font-size:12px}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF .index-module__item-info__BhIr5 .index-module__item-status__3ppNU{font-size:10px}.index-module__config-status__0q8ZM .index-module__config-items__quryV .index-module__config-item__m6pYF .index-module__item-icon__4yYRW{font-size:12px;width:18px;height:18px}}.index-module__settings-panel__UCg3H .index-module__settings-tabs__vPH-t{display:flex;border-bottom:1px solid var(--border-light);margin-bottom:24px}.index-module__settings-panel__UCg3H .index-module__settings-tabs__vPH-t .index-module__tab-button__FG9Nc{display:flex;align-items:center;gap:8px;padding:12px 16px;border:none;background:transparent;color:var(--text-secondary);font-size:14px;font-weight:500;cursor:pointer;border-bottom:2px solid transparent;transition:all .2s ease;outline:none;border-radius:0}.index-module__settings-panel__UCg3H .index-module__settings-tabs__vPH-t .index-module__tab-button__FG9Nc .index-module__tab-icon__rBe-o{font-size:16px}.index-module__settings-panel__UCg3H .index-module__settings-tabs__vPH-t .index-module__tab-button__FG9Nc:hover{color:var(--text-primary);background:var(--bg-secondary)}.index-module__settings-panel__UCg3H .index-module__settings-tabs__vPH-t .index-module__tab-button__FG9Nc.index-module__active__bsBC1{color:var(--color-primary);border-bottom-color:var(--color-primary)}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH{min-height:400px}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA{margin-bottom:20px}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA:last-child{margin-bottom:0}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-label__pwe7O{display:block;font-size:14px;font-weight:500;color:var(--text-primary);margin-bottom:8px}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-label__pwe7O .index-module__required__2vuyW{color:var(--color-error);margin-left:4px}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-input__jGbRP,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-select__jbXdq,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-textarea__fAVMw{width:100%;padding:10px 12px;border:1px solid var(--input-border);border-radius:8px;font-size:14px;color:var(--text-primary);background:var(--input-bg);transition:all .2s ease;box-sizing:border-box}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-input__jGbRP:hover,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-select__jbXdq:hover,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-textarea__fAVMw:hover{border-color:var(--input-focus-border)}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-input__jGbRP:focus,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-select__jbXdq:focus,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-textarea__fAVMw:focus{outline:none;border-color:var(--input-focus-border);box-shadow:0 0 0 3px var(--input-focus-shadow)}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-input__jGbRP::placeholder,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-select__jbXdq::placeholder,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-textarea__fAVMw::placeholder{color:var(--text-secondary)}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-select__jbXdq{padding:10px 32px 10px 12px}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-textarea__fAVMw{resize:vertical;min-height:80px;font-family:inherit;line-height:1.5}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-hint__F0dFQ{font-size:12px;color:var(--text-secondary);margin-top:6px;line-height:1.4}.index-module__settings-panel__UCg3H .index-module__version-info__y0NZv{margin-top:24px;padding-top:16px;border-top:1px solid var(--border-light);text-align:center}.index-module__settings-panel__UCg3H .index-module__version-info__y0NZv .index-module__version-text__bx0HU{font-size:12px;color:var(--text-secondary);opacity:.7}.index-module__settings-footer__qA44X{display:flex;justify-content:space-between;align-items:center}.index-module__settings-footer__qA44X .index-module__footer-right__bslDg{display:flex;gap:8px}.index-module__btn-primary__ZzzFI{padding:8px 16px;border:none;border-radius:10px;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));color:var(--btn-primary-text);font-size:14px;font-weight:600;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:var(--shadow-sm)}.index-module__btn-primary__ZzzFI:hover:not(:disabled){background:linear-gradient(135deg,var(--color-primary-hover),var(--color-primary-dark));transform:translateY(-1px);box-shadow:var(--shadow-md)}.index-module__btn-primary__ZzzFI:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-sm)}.index-module__btn-primary__ZzzFI:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__switch-container__5xk1J{display:flex;align-items:center;gap:8px}.index-module__switch-input__V-8fl{display:none}.index-module__switch-label__xrOeQ{position:relative;display:inline-block;width:44px;height:24px;cursor:pointer}.index-module__switch-slider__dG-6J{position:absolute;top:0;right:0;bottom:0;left:0;background-color:var(--border-primary);border-radius:24px;transition:all .3s ease}.index-module__switch-slider__dG-6J:before{content:\"\";position:absolute;height:18px;width:18px;left:3px;bottom:3px;background-color:#fff;border-radius:50%;transition:all .3s ease;box-shadow:var(--shadow-xs)}.index-module__switch-input__V-8fl:checked+.index-module__switch-label__xrOeQ .index-module__switch-slider__dG-6J{background-color:var(--color-primary)}.index-module__switch-input__V-8fl:checked+.index-module__switch-label__xrOeQ .index-module__switch-slider__dG-6J:before{transform:translate(20px)}.index-module__switch-input__V-8fl:focus+.index-module__switch-label__xrOeQ .index-module__switch-slider__dG-6J{box-shadow:0 0 0 2px var(--color-primary-lighter)}.index-module__switch-input__V-8fl:disabled+.index-module__switch-label__xrOeQ{opacity:.5;cursor:not-allowed}.index-module__switch-input__V-8fl:disabled+.index-module__switch-label__xrOeQ .index-module__switch-slider__dG-6J{background-color:var(--border-light)}.index-module__btn-secondary__cRCpD{padding:8px 16px;border:1px solid var(--border-primary);border-radius:10px;background:var(--bg-quaternary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);color:var(--text-primary);font-size:14px;font-weight:500;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1)}.index-module__btn-secondary__cRCpD:hover:not(:disabled){border-color:var(--color-primary);background:var(--color-primary-lighter);transform:translateY(-1px);box-shadow:var(--shadow-sm)}.index-module__btn-secondary__cRCpD:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-xs)}.index-module__btn-secondary__cRCpD:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM{margin-bottom:24px;border:1px solid var(--border-primary);border-radius:8px;background:var(--bg-secondary);overflow:hidden}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-header__ae0e8{padding:12px 16px;border-bottom:1px solid var(--border-primary)}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-header__ae0e8 h4{font-size:14px;font-weight:600;color:var(--text-primary);margin:0;display:flex;align-items:center;gap:8px}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-content__dhjh6{padding:16px;display:flex;flex-direction:column;gap:12px}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-content__dhjh6 .index-module__overview-item__20Ilu{display:flex;justify-content:space-between;align-items:center;font-size:14px}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-content__dhjh6 .index-module__overview-item__20Ilu .index-module__overview-label__k3QHX{color:var(--text-secondary);font-weight:500}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-content__dhjh6 .index-module__overview-item__20Ilu .index-module__overview-value__gbEnJ{color:var(--text-primary);font-weight:600}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-content__dhjh6 .index-module__overview-item__20Ilu .index-module__overview-value__gbEnJ.index-module__ready__f4MXX{color:var(--success-color)}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-content__dhjh6 .index-module__overview-item__20Ilu .index-module__overview-value__gbEnJ.index-module__waiting__orgl9{color:var(--warning-color)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe{background:var(--bg-primary);border:1px solid var(--border-secondary);border-radius:12px;padding:20px;margin-bottom:20px;box-shadow:var(--shadow-sm);transition:all .2s ease}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs:hover,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe:hover{box-shadow:var(--shadow-md)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border-secondary)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-title__GYp3Q,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-title__GYp3Q{display:flex;align-items:center;gap:8px;margin:0;font-size:15px;font-weight:600;color:var(--text-primary)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-title__GYp3Q .index-module__title-icon__w1Z58,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-title__GYp3Q .index-module__title-icon__w1Z58{font-size:16px;color:var(--color-success)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b{display:flex;align-items:center;gap:8px}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS{display:flex;align-items:center;gap:4px;padding:6px 10px;border:1px solid var(--border-primary);border-radius:6px;background:var(--bg-secondary);color:var(--text-primary);font-size:12px;font-weight:500;cursor:pointer;transition:all .15s ease;outline:none}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS:hover,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS:hover{background:var(--bg-tertiary);border-color:var(--color-primary)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS.index-module__primary__Uwxt8,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS.index-module__primary__Uwxt8{background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));color:#fff;border-color:var(--color-primary)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS.index-module__primary__Uwxt8:hover,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS.index-module__primary__Uwxt8:hover{background:linear-gradient(135deg,var(--color-primary-hover),var(--color-primary-dark))}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS .index-module__btn-icon__bBkUh,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS .index-module__btn-icon__bBkUh{font-size:12px}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-content__NBmXz .index-module__result-text__WX-aI,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-content__NBmXz .index-module__result-text__WX-aI{background:var(--bg-secondary);border:1px solid var(--border-primary);border-radius:8px;padding:16px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:14px;line-height:1.6;color:var(--text-primary);white-space:pre-wrap;word-wrap:break-word;max-height:400px;overflow-y:auto;transition:border-color .15s ease}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-content__NBmXz .index-module__result-text__WX-aI:hover,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-content__NBmXz .index-module__result-text__WX-aI:hover{border-color:var(--border-tertiary)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar{width:6px}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-track,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-track{background:transparent}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-thumb,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:3px}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-thumb:hover,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-thumb:hover{background:var(--scrollbar-thumb-hover)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-meta__zAR0J,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-meta__zAR0J{display:flex;align-items:center;justify-content:space-between;margin-top:12px;padding-top:12px;border-top:1px solid var(--border-secondary);font-size:12px;color:var(--text-secondary)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-meta__zAR0J .index-module__meta-left__G7E6i,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-meta__zAR0J .index-module__meta-left__G7E6i{display:flex;align-items:center;gap:12px}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-meta__zAR0J .index-module__meta-left__G7E6i .index-module__meta-item__Mikx5,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-meta__zAR0J .index-module__meta-left__G7E6i .index-module__meta-item__Mikx5{display:flex;align-items:center;gap:4px}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs h2,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe h2{margin-bottom:15px;color:var(--text-primary);font-size:1.3em}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1{margin-bottom:24px}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1:last-child{margin-bottom:0}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__section-header__WEXG-{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__section-header__WEXG- h3{font-size:16px;font-weight:600;color:var(--text-primary);margin:0}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__section-header__WEXG- .index-module__header-actions__phC5-{display:flex;align-items:center;gap:12px}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__section-header__WEXG- .index-module__header-actions__phC5- .index-module__token-count__bZx1v{font-size:12px;color:var(--text-secondary);background:var(--bg-secondary);padding:4px 8px;border-radius:4px}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy{border:1px solid var(--border-primary);border-radius:8px;background:var(--bg-primary);transition:all .2s ease}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy:hover{border-color:var(--color-primary)}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy:focus-within{border-color:var(--color-primary);box-shadow:0 0 0 3px var(--primary-shadow)}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy .index-module__prompt-textarea__ZeYSC{width:100%;padding:12px;border:none;border-radius:8px;font-size:14px;color:var(--text-primary);background:transparent;resize:none;box-sizing:border-box;font-family:inherit;line-height:1.5}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy .index-module__prompt-textarea__ZeYSC:focus{outline:none}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy .index-module__prompt-textarea__ZeYSC::placeholder{color:var(--text-secondary)}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy .index-module__prompt-footer__NhJb8{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;border-top:1px solid var(--border-light);background:var(--bg-secondary);border-radius:0 0 8px 8px}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy .index-module__prompt-footer__NhJb8 .index-module__char-count__qSePr{font-size:12px;color:var(--text-secondary)}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy.index-module__expanded__VY5Zd .index-module__prompt-textarea__ZeYSC{min-height:300px}.index-module__ai-panel__R0K19 .index-module__loading-section__qmhp-{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;text-align:center;gap:16px}.index-module__ai-panel__R0K19 .index-module__loading-section__qmhp- .index-module__loading-spinner__FhbKe{width:40px;height:40px;border:4px solid var(--border-light);border-top:4px solid var(--color-primary);border-radius:50%;animation:index-module__spin__NTQZe 1s linear infinite}.index-module__ai-panel__R0K19 .index-module__loading-section__qmhp- p{font-size:16px;font-weight:500;color:var(--text-primary);margin:0}.index-module__ai-panel__R0K19 .index-module__loading-section__qmhp- .index-module__loading-tips__TN0F6{font-size:13px;color:var(--text-secondary)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe{background:var(--bg-secondary);border-radius:16px;border:1px solid var(--border-primary);overflow:hidden;box-shadow:var(--shadow-lg);margin-bottom:24px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM{display:flex;justify-content:space-between;align-items:flex-start;background:linear-gradient(135deg,var(--bg-primary) 0%,var(--bg-secondary) 100%);border-bottom:1px solid var(--border-light);gap:20px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-title__GYp3Q{display:flex;align-items:center;gap:12px;flex:1}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-title__GYp3Q .index-module__title-icon__w1Z58{font-size:24px;margin-top:2px;filter:drop-shadow(var(--shadow-xs))}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-title__GYp3Q .index-module__title-content__qCIUv h3{font-size:18px;font-weight:700;color:var(--text-primary);margin:0 0 4px;background:linear-gradient(135deg,var(--text-primary) 0%,var(--color-primary) 100%);-webkit-text-fill-color:transparent;-webkit-background-clip:text;background-clip:text}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-title__GYp3Q .index-module__title-content__qCIUv .index-module__result-meta__zAR0J{font-size:12px;color:var(--text-secondary);font-weight:500}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b{display:flex;align-items:center;gap:16px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__token-info__IvG7g{display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--bg-tertiary);border-radius:20px;border:1px solid var(--border-light)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__token-info__IvG7g .index-module__token-icon__1P1bc{font-size:14px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__token-info__IvG7g .index-module__token-text__RWskI{font-size:12px;font-weight:600;color:var(--text-primary)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-buttons__SWxAg{display:flex;gap:8px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-buttons__SWxAg .index-module__btn-icon__bBkUh{margin-right:6px;font-size:14px}@media (width <= 768px){.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM{flex-direction:column;align-items:stretch;gap:16px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b{justify-content:space-between}}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI{padding:24px;font-size:14px;line-height:1.7;color:var(--text-primary);max-height:500px;overflow-y:auto;background:var(--bg-primary)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-paragraph__D6REa{margin:0 0 12px;color:var(--text-primary)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-paragraph__D6REa:last-child{margin-bottom:0}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-heading__voqzC{font-weight:700;color:var(--text-primary);margin:20px 0 12px;padding-bottom:8px;border-bottom:2px solid var(--border-light)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-heading__voqzC.index-module__heading1__eVaM0{font-size:20px;color:var(--color-primary)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-heading__voqzC.index-module__heading2__EgSC5{font-size:18px;color:var(--color-primary)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-heading__voqzC.index-module__heading3__gXHpl{font-size:16px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-heading__voqzC:first-child{margin-top:0}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-list-item__9keYT{display:flex;align-items:flex-start;gap:8px;margin:6px 0;padding-left:16px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-list-item__9keYT .index-module__list-bullet__5e-IY{color:var(--color-primary);font-weight:700;margin-top:1px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-numbered-item__IXzIR{display:flex;align-items:flex-start;gap:8px;margin:6px 0;padding-left:16px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-numbered-item__IXzIR .index-module__number-bullet__KKVqC{color:var(--color-primary);font-weight:700;min-width:20px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-spacing__lk3vv{height:12px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar{width:8px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-track{background:var(--bg-secondary);border-radius:4px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:4px;border:2px solid var(--bg-secondary)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-thumb:hover{background:var(--scrollbar-thumb-hover)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;background:var(--bg-tertiary);border-top:1px solid var(--border-light)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__result-stats__RMcsG{display:flex;gap:20px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__result-stats__RMcsG .index-module__stat-item__z6Cev{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-secondary);font-weight:500}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__result-stats__RMcsG .index-module__stat-item__z6Cev .index-module__stat-icon__jcDOw{font-size:14px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__quality-badge__8BKyM{display:flex;align-items:center;gap:4px;padding:4px 10px;background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-primary-dark) 100%);color:#fff;border-radius:12px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;box-shadow:var(--shadow-sm)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__quality-badge__8BKyM .index-module__badge-icon__1YRBa{font-size:12px}@media (width <= 600px){.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v{flex-direction:column;gap:12px;align-items:stretch}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__result-stats__RMcsG{justify-content:center}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__quality-badge__8BKyM{align-self:center}}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;text-align:center;gap:20px;background:linear-gradient(135deg,var(--bg-secondary) 0%,var(--bg-tertiary) 100%);border-radius:16px;border:1px solid var(--border-primary);position:relative;overflow:hidden}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK:before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:0;background:radial-gradient(circle at 30% 20%,var(--color-primary-lighter) 0%,transparent 50%),radial-gradient(circle at 70% 80%,var(--color-success-lighter) 0%,transparent 50%);pointer-events:none}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-icon__RFmRa{font-size:72px;opacity:.8;filter:drop-shadow(var(--shadow-sm));animation:index-module__float__FahY4 3s ease-in-out infinite;position:relative;z-index:1}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK h3{font-size:20px;font-weight:700;color:var(--text-primary);margin:0;position:relative;z-index:1;background:linear-gradient(135deg,var(--text-primary) 0%,var(--color-primary) 100%);-webkit-text-fill-color:transparent;-webkit-background-clip:text;background-clip:text}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK p{font-size:15px;color:var(--text-secondary);margin:0;max-width:420px;line-height:1.6;position:relative;z-index:1;opacity:.9}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR{display:flex;gap:32px;margin-top:24px;position:relative;z-index:1}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K{display:flex;flex-direction:column;align-items:center;gap:10px;padding:16px 12px;border-radius:12px;background:var(--bg-primary);border:1px solid var(--border-secondary);transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:var(--shadow-sm)}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K:hover{transform:translateY(-2px);box-shadow:var(--shadow-md);border-color:var(--color-primary-light)}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K .index-module__feature-icon__aCith{font-size:28px;filter:drop-shadow(var(--shadow-xs))}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K span{font-size:13px;color:var(--text-secondary);font-weight:500;text-align:center;line-height:1.3}@media (width <= 600px){.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR{flex-direction:column;gap:16px}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K{flex-direction:row;text-align:left;padding:12px 16px}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K .index-module__feature-icon__aCith{font-size:24px}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K span{text-align:left}}.index-module__ai-panel__R0K19 .index-module__fetch-progress__u65Rg{margin-bottom:24px;padding:16px;background:var(--bg-secondary);border:1px solid var(--border-primary);border-radius:8px}.index-module__ai-panel__R0K19 .index-module__fetch-progress__u65Rg .index-module__progress-header__hilxF{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.index-module__ai-panel__R0K19 .index-module__fetch-progress__u65Rg .index-module__progress-header__hilxF span:first-child{font-size:14px;font-weight:500;color:var(--text-primary)}.index-module__ai-panel__R0K19 .index-module__fetch-progress__u65Rg .index-module__progress-header__hilxF span:last-child{font-size:14px;font-weight:600;color:var(--color-primary)}.index-module__ai-panel__R0K19 .index-module__fetch-progress__u65Rg .index-module__progress-bar__upGJZ{height:8px;background:var(--bg-primary);border-radius:4px;overflow:hidden;margin-bottom:8px}.index-module__ai-panel__R0K19 .index-module__fetch-progress__u65Rg .index-module__progress-bar__upGJZ .index-module__progress-fill__qzGhB{height:100%;background:linear-gradient(90deg,var(--color-primary),var(--primary-hover));border-radius:4px;transition:width .3s ease}.index-module__ai-panel__R0K19 .index-module__fetch-progress__u65Rg .index-module__progress-tip__SZdKA{margin:0;font-size:12px;color:var(--text-secondary);text-align:center}.index-module__btn-primary__NTwQw{padding:8px 16px;border:none;border-radius:10px;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));color:var(--btn-primary-text);font-size:14px;font-weight:600;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:var(--shadow-sm)}.index-module__btn-primary__NTwQw:hover:not(:disabled){background:linear-gradient(135deg,var(--color-primary-hover),var(--color-primary-dark));transform:translateY(-1px);box-shadow:var(--shadow-md)}.index-module__btn-primary__NTwQw:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-sm)}.index-module__btn-primary__NTwQw:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__btn-primary__NTwQw.index-module__regenerate__MPpEF{background:linear-gradient(135deg,var(--color-warning),var(--warning-color));color:#fff}.index-module__btn-primary__NTwQw.index-module__regenerate__MPpEF:hover:not(:disabled){background:var(--color-warning-dark)}.index-module__btn-secondary__aSTHl{padding:8px 16px;border:1px solid var(--border-primary);border-radius:10px;background:var(--bg-quaternary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);color:var(--text-primary);font-size:14px;font-weight:500;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1)}.index-module__btn-secondary__aSTHl:hover:not(:disabled){border-color:var(--color-primary);background:var(--color-primary-lighter);transform:translateY(-1px);box-shadow:var(--shadow-sm)}.index-module__btn-secondary__aSTHl:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-xs)}.index-module__btn-secondary__aSTHl:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__btn-text__f3PZM{padding:4px 8px;border:none;background:transparent;color:var(--color-primary);font-size:13px;font-weight:500;cursor:pointer;border-radius:4px;transition:all .2s ease}.index-module__btn-text__f3PZM:hover:not(:disabled){background:var(--color-primary-lighter)}.index-module__btn-text__f3PZM:disabled{opacity:.5;cursor:not-allowed}@keyframes index-module__spin__NTQZe{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes index-module__float__FahY4{0%,to{transform:translateY(0)}50%{transform:translateY(-8px)}}.index-module__generate-btn__M2gOr{width:100%;height:48px;padding:0 20px;background:var(--color-primary);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:500;cursor:pointer;transition:all .2s ease;display:flex;align-items:center;justify-content:center;gap:8px}.index-module__generate-btn__M2gOr:hover:not(:disabled){background:var(--primary-hover);transform:translateY(-1px)}.index-module__generate-btn__M2gOr:disabled{background:var(--bg-disabled);color:var(--text-disabled);cursor:not-allowed;transform:none}.index-module__generate-btn__M2gOr .index-module__loading-dot__7D9Fk{width:16px;height:16px;border-radius:50%;background:currentcolor;animation:index-module__loading-pulse__NLo-J 1.5s ease-in-out infinite}@keyframes index-module__loading-pulse__NLo-J{0%,to{opacity:.6;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4{position:fixed;top:0;left:0;width:100%;height:100%;background:#00000080;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;animation:EventDetailModal-module__fade-in__gcFok .2s ease-out}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j{background:var(--bg-primary);border:1px solid var(--border-primary);border-radius:20px;box-shadow:0 20px 60px #00000026,0 8px 25px #0000001a;max-width:900px;width:100%;max-height:85vh;overflow:hidden;display:flex;flex-direction:column;animation:EventDetailModal-module__modal-slide-in__wtFi2 .3s cubic-bezier(.34,1.56,.64,1)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j{--bg-primary: var(--bg-secondary)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM{display:flex;align-items:center;justify-content:space-between;padding:24px 28px;border-bottom:1px solid var(--header-border, rgba(0, 0, 0, .08));background:var(--header-bg, rgba(248, 248, 248, .9));-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM{--header-bg: rgba(28, 28, 30, .9);--header-border: rgba(255, 255, 255, .1)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM h2{margin:0;font-size:20px;font-weight:700;color:var(--text-primary);letter-spacing:-.03em}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE{width:36px;height:36px;border:none;border-radius:10px;background:var(--close-btn-bg, rgba(0, 0, 0, .06));cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--text-secondary);transition:all .2s cubic-bezier(.25,.46,.45,.94)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE{--close-btn-bg: rgba(255, 255, 255, .1)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE:hover{background:var(--close-btn-hover-bg, rgba(0, 0, 0, .12));color:var(--text-primary);transform:scale(1.05)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE:hover{--close-btn-hover-bg: rgba(255, 255, 255, .15)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE:active{transform:scale(.95)}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk{flex:1;overflow-y:auto;padding:28px;background:var(--bg-primary)}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar{width:6px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-track{background:transparent}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb, rgba(0, 0, 0, .2));border-radius:3px}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb{--scrollbar-thumb: rgba(255, 255, 255, .3)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb:hover{background:var(--scrollbar-thumb-hover, rgba(0, 0, 0, .3))}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb:hover{--scrollbar-thumb-hover: rgba(255, 255, 255, .4)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG{margin-bottom:36px;padding:20px;background:var(--section-bg, rgba(248, 248, 248, .5));border-radius:16px;border:1px solid var(--section-border, rgba(0, 0, 0, .04));transition:all .2s ease}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG{--section-bg: rgba(28, 28, 30, .6);--section-border: rgba(255, 255, 255, .08)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG:last-child{margin-bottom:0}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG:hover{background:var(--section-hover-bg, rgba(248, 248, 248, .8));border-color:var(--section-hover-border, rgba(0, 0, 0, .08))}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG:hover{--section-hover-bg: rgba(28, 28, 30, .8);--section-hover-border: rgba(255, 255, 255, .12)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG.EventDetailModal-module__compact__GlU0K{margin-bottom:20px;padding:16px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG.EventDetailModal-module__compact__GlU0K h3{margin-bottom:12px;font-size:15px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG h3{margin:0 0 18px;font-size:17px;font-weight:700;color:var(--text-primary);letter-spacing:-.03em;display:flex;align-items:center;gap:8px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG h3:before{content:\"\";width:4px;height:18px;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-hover));border-radius:2px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-grid__lP-Rl,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-content__b-wBI,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__project-info__BF-ji,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__push-info__CiBtf{display:flex;flex-direction:column;gap:12px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-content__Zl-xn,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-project__W-Pxu,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-author__bJeyL{gap:8px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL{display:flex;align-items:flex-start;gap:16px;padding:12px 0;border-bottom:1px solid var(--item-border, rgba(0, 0, 0, .04))}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL{--item-border: rgba(255, 255, 255, .06)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL:last-child{border-bottom:none}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-content__Zl-xn .EventDetailModal-module__detail-item__gTUiL,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-project__W-Pxu .EventDetailModal-module__detail-item__gTUiL{padding:8px 0;gap:12px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-content__Zl-xn .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__label__q-vpJ,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-project__W-Pxu .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__label__q-vpJ{min-width:60px;font-size:13px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-content__Zl-xn .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-project__W-Pxu .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT{font-size:13px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-author__bJeyL .EventDetailModal-module__detail-item__gTUiL{padding:6px 0;gap:10px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__label__q-vpJ{font-size:14px;font-weight:600;color:var(--text-secondary);min-width:100px;flex-shrink:0}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT{font-size:14px;color:var(--text-primary);flex:1;word-break:break-word;line-height:1.4}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__action-badge__Bxghx{flex:0;white-space:nowrap;display:inline-block;padding:6px 12px;background:linear-gradient(135deg,#34c75926,#34c75914);color:var(--color-success);border-radius:8px;font-size:12px;font-weight:600;border:1px solid rgba(52,199,89,.2)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__action-badge__Bxghx{background:linear-gradient(135deg,#34c75933,#34c7591a);border-color:#34c7594d}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY{display:inline-block;padding:4px 8px;border-radius:6px;font-size:11px;font-weight:500}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY.EventDetailModal-module__status-opened__0o3-j{background:#34c7591f;color:var(--color-success)}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY.EventDetailModal-module__status-closed__axB54{background:#ff453a1f;color:var(--color-danger)}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY.EventDetailModal-module__status-merged__jrAZc{background:#007aff1f;color:var(--color-primary)}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__commit-hash__T82Gy{font-family:SF Mono,Monaco,Cascadia Code,Roboto Mono,Consolas,Courier New,monospace;font-size:12px;background:#0000000a;padding:4px 8px;border-radius:4px;word-break:break-all}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__labels__FfkpP{display:flex;flex-wrap:wrap;gap:6px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__labels__FfkpP .EventDetailModal-module__label-tag__1eJTi{padding:3px 8px;background:#007aff14;color:var(--color-primary);border-radius:4px;font-size:11px;font-weight:500}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM{display:flex;align-items:center;gap:12px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-avatar__UktK4{width:72px;height:72px;border-radius:12px;object-fit:cover}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN{flex:1}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-name__Aop-h{font-size:15px;font-weight:600;color:var(--text-primary);margin-bottom:2px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-username__7f29y{font-size:13px;color:var(--text-secondary);margin-bottom:6px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-link__qdJ8G{font-size:12px;color:var(--color-primary);text-decoration:none;font-weight:500}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-link__qdJ8G:hover{text-decoration:underline}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__note-info__xsh-2 .EventDetailModal-module__note-body__h5kYR{background:#00000005;padding:16px;border-radius:8px;font-size:13px;line-height:1.5;color:var(--text-primary);white-space:pre-wrap;word-break:break-word;margin-bottom:12px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__note-info__xsh-2 .EventDetailModal-module__note-meta__CSOAr{display:flex;flex-direction:column;gap:4px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__note-info__xsh-2 .EventDetailModal-module__note-meta__CSOAr span{font-size:12px;color:var(--text-secondary)}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG{display:flex;align-items:center;justify-content:flex-end;gap:16px;padding:20px 28px;border-top:1px solid var(--footer-border, rgba(0, 0, 0, .08));background:var(--footer-bg, rgba(248, 248, 248, .9));-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG{--footer-bg: rgba(28, 28, 30, .9);--footer-border: rgba(255, 255, 255, .1)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__source-link-btn__lCMP7{padding:12px 20px;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-hover));color:var(--btn-primary-text);border:none;border-radius:12px;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;transition:all .2s cubic-bezier(.25,.46,.45,.94);box-shadow:0 4px 12px #007aff4d;display:flex;align-items:center;gap:8px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__source-link-btn__lCMP7:before{content:\"🔗\";font-size:16px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__source-link-btn__lCMP7:hover{transform:translateY(-2px);box-shadow:0 6px 20px #007aff66;background:linear-gradient(135deg,var(--color-primary-dark),var(--color-primary))}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__source-link-btn__lCMP7:active{transform:translateY(0)}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23{padding:12px 20px;background:var(--close-modal-bg, rgba(0, 0, 0, .06));color:var(--text-primary);border:1px solid var(--close-modal-border, rgba(0, 0, 0, .1));border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s cubic-bezier(.25,.46,.45,.94)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23{--close-modal-bg: rgba(255, 255, 255, .1);--close-modal-border: rgba(255, 255, 255, .2)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23:hover{background:var(--close-modal-hover-bg, rgba(0, 0, 0, .12));border-color:var(--close-modal-hover-border, rgba(0, 0, 0, .15));transform:translateY(-1px)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23:hover{--close-modal-hover-bg: rgba(255, 255, 255, .15);--close-modal-hover-border: rgba(255, 255, 255, .25)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23:active{transform:translateY(0)}@keyframes EventDetailModal-module__fade-in__gcFok{0%{opacity:0}to{opacity:1}}@keyframes EventDetailModal-module__modal-slide-in__wtFi2{0%{opacity:0;transform:scale(.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4{background:#0009}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j{background:#1c1c1ef2;box-shadow:0 8px 32px #0000004d}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM{background:#2c2c2ecc;border-bottom:1px solid rgba(255,255,255,.1)}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM h2{color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE{background:#ffffff1a;color:#8e8e93}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE:hover{background:#fff3;color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG h3{color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__label__q-vpJ{color:#8e8e93}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT{color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT.EventDetailModal-module__action-badge__Bxghx,.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY.EventDetailModal-module__status-opened__0o3-j{background:#34c75933;color:#32d74b}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY.EventDetailModal-module__status-closed__axB54{background:#ff453a33;color:#ff6961}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY.EventDetailModal-module__status-merged__jrAZc{background:#4a9eff33;color:#4a9eff}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT.EventDetailModal-module__commit-hash__T82Gy{background:#ffffff1a;color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__labels__FfkpP .EventDetailModal-module__label-tag__1eJTi{background:#4a9eff33;color:#4a9eff}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-name__Aop-h{color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-username__7f29y{color:#8e8e93}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-link__qdJ8G{color:#4a9eff}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__note-info__xsh-2 .EventDetailModal-module__note-body__h5kYR{background:#ffffff14;color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__note-info__xsh-2 .EventDetailModal-module__note-meta__CSOAr span{color:#8e8e93}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-footer__bMVTG{background:#2c2c2ecc;border-top:1px solid rgba(255,255,255,.1)}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__source-link-btn__lCMP7{background:#4a9eff33;color:#4a9eff}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__source-link-btn__lCMP7:hover{background:#4a9eff4d}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23{background:#ffffff1a;color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23:hover{background:#fff3}@media (width <= 768px){.EventDetailModal-module__event-detail-modal-overlay__kSKR4{padding:12px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-footer__bMVTG{padding:16px 20px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk{padding:20px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG{margin-bottom:24px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL{flex-direction:column;gap:4px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__label__q-vpJ{min-width:auto}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__author-info__QU8GM{flex-direction:column;align-items:flex-start;text-align:center}}.EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar{width:4px}.EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-track{background:transparent}.EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb{background:#0003;border-radius:2px}.EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb:hover{background:#0000004d}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb{background:#fff3}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb:hover{background:#ffffff4d}.App-module__app__ZYOJd{width:100%;height:100vh;background:var(--bg-secondary);font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;color:var(--text-primary);position:relative;overflow:hidden}.App-module__app__ZYOJd.App-module__web-mode__2hnFp{display:flex;align-items:stretch;justify-content:center}.App-module__app__ZYOJd.App-module__web-mode__2hnFp>*{width:100%;height:100vh}.App-module__app__ZYOJd.App-module__userscript-mode__5Dbvp{position:relative;width:100%;height:100%;z-index:999999;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;isolation:isolate;contain:layout style}.App-module__app__ZYOJd.App-module__userscript-mode__5Dbvp>*{width:100%;height:100%}.App-module__app__ZYOJd.App-module__userscript-mode__5Dbvp .App-module__events-list-footer__M6fFx{flex-shrink:0;display:block;visibility:visible;opacity:1;position:relative;z-index:1}.App-module__app__ZYOJd.App-module__userscript-mode__5Dbvp .App-module__pagination__8MYcc{display:flex;visibility:visible;opacity:1;position:relative;z-index:1}.App-module__app__ZYOJd.App-module__light__-2YM7{--app-bg: var(--bg-secondary);--app-color: var(--text-primary);background:var(--app-bg);color:var(--app-color)}.App-module__app__ZYOJd.App-module__dark__zl6FN{--app-bg: var(--bg-primary);--app-color: var(--text-primary);background:var(--app-bg);color:var(--app-color)}@media (width <= 768px){.App-module__app__ZYOJd.App-module__web-mode__2hnFp>*{height:100vh}.App-module__app__ZYOJd.App-module__userscript-mode__5Dbvp{top:10px;right:10px;left:10px;width:auto;height:calc(100vh - 20px)}}*::-webkit-scrollbar{width:8px;height:8px}*::-webkit-scrollbar-track{background:transparent}*::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:4px}*::-webkit-scrollbar-thumb:hover{background:var(--scrollbar-thumb-hover)}@keyframes App-module__fade-in__hmOGT{0%{opacity:0}to{opacity:1}}@keyframes App-module__slide-in-up__3G2dj{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes App-module__slide-in-down__yp8xa{0%{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}.App-module__fade-in__hmOGT{animation:App-module__fade-in__hmOGT .3s ease-out}.App-module__slide-in-up__3G2dj{animation:App-module__slide-in-up__3G2dj .3s ease-out}.App-module__slide-in-down__yp8xa{animation:App-module__slide-in-down__yp8xa .3s ease-out}.App-module__userscript-header__Gd9rb{display:flex;justify-content:space-between;align-items:center;padding:15px 20px;border-bottom:1px solid var(--border-tertiary);background:var(--bg-tertiary);border-radius:8px}.App-module__userscript-header__Gd9rb h3{margin:0;color:var(--text-primary);font-size:16px}.App-module__userscript-header__Gd9rb .App-module__toggle-btn__1QXY6{padding:4px 12px;font-size:12px;background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));color:#fff;border:none;border-radius:4px;cursor:pointer}.App-module__userscript-header__Gd9rb .App-module__toggle-btn__1QXY6:hover{background:linear-gradient(135deg,var(--color-primary-hover),var(--color-primary-dark))}.App-module__app-content__41BC0{transition:all .3s ease}.App-module__app-content__41BC0.App-module__collapsed__-W0B6{display:none}.App-module__app-content__41BC0.App-module__expanded__4oZSa{display:block}.App-module__app-header__uzDwt{text-align:center;margin-bottom:30px}.App-module__app-header__uzDwt h1{margin-bottom:10px;color:var(--text-primary);font-size:2.5em}@media (prefers-color-scheme: dark){.App-module__app-header__uzDwt h1{color:var(--btn-primary-text)}}.App-module__app-header__uzDwt p{color:var(--text-tertiary);font-size:1.1em}@media (prefers-color-scheme: dark){.App-module__app-header__uzDwt p{color:var(--border-tertiary)}}.App-module__app-main__Vb-mE{display:flex;flex-direction:column;gap:25px}.App-module__error-banner__lzzyc{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:var(--color-error-bg);border:1px solid var(--color-error-border);border-radius:6px;color:var(--color-error-text);margin-bottom:20px}.App-module__error-banner__lzzyc button{background:none;border:none;color:var(--color-error-text);font-size:18px;cursor:pointer;padding:0;width:20px;height:20px;display:flex;align-items:center;justify-content:center}.App-module__error-banner__lzzyc button:hover{opacity:.7}.App-module__config-form__3qfiF{display:flex;flex-direction:column;gap:15px}.App-module__form-group__HjqOW{display:flex;flex-direction:column;gap:5px}.App-module__form-group__HjqOW label{font-weight:500;color:var(--text-secondary)}@media (prefers-color-scheme: dark){.App-module__form-group__HjqOW label{color:var(--border-tertiary)}}.App-module__form-group__HjqOW input{padding:8px 12px;border:1px solid var(--border-primary);border-radius:4px;font-size:14px;transition:border-color .2s}.App-module__form-group__HjqOW input:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 2px var(--color-primary-light)}@media (prefers-color-scheme: dark){.App-module__form-group__HjqOW input{background:var(--bg-secondary);border-color:var(--border-secondary);color:var(--text-primary)}}.App-module__date-range__a4twt{display:flex;align-items:center;gap:10px}.App-module__date-range__a4twt input{flex:1}.App-module__date-range__a4twt span{color:var(--text-tertiary);font-size:14px}@media (prefers-color-scheme: dark){.App-module__date-range__a4twt span{color:var(--border-tertiary)}}.App-module__action-section__PNqvo{display:flex;gap:15px;justify-content:center}.App-module__primary-btn__7Yh0h,.App-module__secondary-btn__rYZob{padding:12px 24px;border-radius:6px;font-size:16px;font-weight:500;cursor:pointer;transition:all .2s}.App-module__primary-btn__7Yh0h:disabled,.App-module__secondary-btn__rYZob:disabled{opacity:.6;cursor:not-allowed}.App-module__primary-btn__7Yh0h{background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));color:var(--btn-text);border:none;box-shadow:var(--shadow-sm)}.App-module__primary-btn__7Yh0h:hover:not(:disabled){background:linear-gradient(135deg,var(--color-primary-hover),var(--color-primary-dark));transform:translateY(-1px);box-shadow:var(--shadow-md)}.App-module__primary-btn__7Yh0h:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-sm)}.App-module__secondary-btn__rYZob{background:transparent;color:var(--color-primary);border:1px solid var(--color-primary)}.App-module__secondary-btn__rYZob:hover:not(:disabled){background:linear-gradient(135deg,var(--color-primary),var(--color-primary-dark));color:#fff;transform:translateY(-1px)}.App-module__preview-area__eSphl{min-height:200px;background:#fff;border:1px solid var(--border-primary);border-radius:4px;padding:15px}@media (prefers-color-scheme: dark){.App-module__preview-area__eSphl{background:var(--bg-secondary);border-color:var(--border-secondary)}}.App-module__preview-area__eSphl .App-module__placeholder__64NFK{color:var(--text-tertiary);text-align:center;margin-top:80px;font-style:italic}@media (prefers-color-scheme: dark){.App-module__preview-area__eSphl .App-module__placeholder__64NFK{color:var(--text-quaternary)}}.App-module__preview-area__eSphl .App-module__loading__nhcml{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;gap:16px}.App-module__preview-area__eSphl .App-module__loading__nhcml .App-module__spinner__DX3IN{width:32px;height:32px;border:3px solid var(--bg-secondary);border-top:3px solid var(--color-primary);border-radius:50%;animation:App-module__spin__cTQvR 1s linear infinite}.App-module__preview-area__eSphl .App-module__loading__nhcml p{color:var(--text-tertiary);margin:0}@media (prefers-color-scheme: dark){.App-module__preview-area__eSphl .App-module__loading__nhcml p{color:var(--border-tertiary)}}.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-meta__Jmys5{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border-tertiary);margin-bottom:15px;font-size:12px;color:var(--text-tertiary)}@media (prefers-color-scheme: dark){.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-meta__Jmys5{border-color:var(--text-secondary);color:var(--border-tertiary)}}.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-meta__Jmys5 span:not(:last-child):after{content:\"•\";margin:0 8px;opacity:.5}@media (width <= 600px){.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-meta__Jmys5{flex-direction:column;gap:5px;align-items:flex-start}.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-meta__Jmys5 span:after{display:none}}.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-text__DiDz5{line-height:1.6;color:var(--text-primary);white-space:pre-wrap;word-wrap:break-word}@media (prefers-color-scheme: dark){.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-text__DiDz5{color:var(--text-primary)}}@media (width <= 768px){.App-module__app__ZYOJd{padding:15px}.App-module__app__ZYOJd.App-module__userscript-mode__5Dbvp{max-width:350px}.App-module__app-header__uzDwt h1{font-size:2em}.App-module__action-section__PNqvo,.App-module__date-range__a4twt{flex-direction:column}.App-module__date-range__a4twt span{display:none}}*{margin:0;padding:0;box-sizing:border-box}:root{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light dark;font-synthesis:none;text-rendering:optimizelegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-size-adjust:100%;--bg-primary: #fff;--bg-secondary: #f5f5f7;--bg-tertiary: #f8f9fa;--bg-quaternary: rgba(248, 248, 248, .8);--text-primary: #1d1d1f;--text-secondary: #86868b;--text-tertiary: #666;--text-quaternary: #8e8e93;--border-primary: rgba(0, 0, 0, .08);--border-secondary: rgba(0, 0, 0, .05);--border-tertiary: #e5e5e7;--border-quaternary: #d2d2d7;--color-primary: #007aff;--color-primary-hover: #0051d5;--color-primary-dark: #0051d5;--color-primary-light: rgba(0, 122, 255, .1);--color-primary-lighter: rgba(0, 122, 255, .05);--color-success: #34c759;--color-success-light: rgba(52, 199, 89, .1);--color-success-lighter: rgba(52, 199, 89, .05);--color-warning: #ff9500;--color-warning-light: rgba(255, 149, 0, .1);--color-warning-lighter: rgba(255, 149, 0, .05);--color-error: #ff3b30;--color-error-bg: #f8d7da;--color-error-border: #f5c6cb;--color-error-text: #721c24;--color-error-light: rgba(255, 59, 48, .1);--color-danger: #ff3b30;--color-danger-light: rgba(255, 59, 48, .1);--color-danger-lighter: rgba(255, 59, 48, .05);--color-info: #5856d6;--color-info-light: rgba(88, 86, 214, .1);--shadow-sm: 0 2px 8px rgba(0, 0, 0, .06);--shadow-md: 0 4px 16px rgba(0, 0, 0, .1);--shadow-lg: 0 8px 32px rgba(0, 0, 0, .15);--shadow-xl: 0 20px 60px rgba(0, 0, 0, .15);--scrollbar-thumb: #d1d1d6;--scrollbar-thumb-hover: #b4b4b9;--overlay: rgba(0, 0, 0, .5);--overlay-light: rgba(0, 0, 0, .5);--overlay-heavy: rgba(0, 0, 0, .6);--btn-bg: #f9f9f9;--btn-text: #213547;--btn-primary-text: #fff;--btn-border: rgba(0, 0, 0, .1);--btn-hover-bg: rgba(0, 0, 0, .06);--bg-hover: rgba(0, 0, 0, .04);--border-light: rgba(0, 0, 0, .05);--primary-bg-hover: rgba(74, 158, 255, .1);--primary-shadow: rgba(74, 158, 255, .25);--success-color: #34c759;--warning-color: #ff9500;--shadow-xs: 0 1px 4px rgba(0, 0, 0, .04);--input-bg: #fff;--input-border: #ddd;--input-focus-border: #007bff;--input-focus-shadow: rgba(0, 123, 255, .1);color:var(--text-primary);background-color:var(--bg-primary)}html,body{height:100%;margin:0;padding:0}#root{width:100%;min-height:100vh;display:flex;flex-direction:column}a{font-weight:500;color:var(--color-primary);text-decoration:inherit;transition:color .2s ease}a:hover{color:var(--color-primary-hover)}body{margin:0;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}button{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:var(--btn-bg);color:var(--btn-text);cursor:pointer;transition:border-color .25s;outline:none!important}button:hover{border-color:var(--color-primary)}@media (prefers-color-scheme: dark){:root{--bg-primary: #1a1a1a;--bg-secondary: #1c1c1e;--bg-tertiary: #2c2c2e;--bg-quaternary: rgba(28, 28, 30, .8);--text-primary: #fff;--text-secondary: #8e8e93;--text-tertiary: #98989d;--text-quaternary: #636366;--border-primary: rgba(255, 255, 255, .1);--border-secondary: rgba(255, 255, 255, .08);--border-tertiary: #424245;--border-quaternary: #48484a;--color-primary: #4a9eff;--color-primary-hover: #64b5f6;--color-primary-dark: #3a8eef;--color-primary-light: rgba(74, 158, 255, .2);--color-primary-lighter: rgba(74, 158, 255, .1);--color-success: #32d74b;--color-success-light: rgba(52, 199, 89, .2);--color-warning: #ff9f0a;--color-warning-light: rgba(255, 149, 0, .2);--color-error: #ff453a;--color-error-bg: #5c2122;--color-error-border: #7c2e2f;--color-error-text: #f8d7da;--color-error-light: rgba(255, 69, 58, .2);--color-info: #5e5ce6;--color-info-light: rgba(88, 86, 214, .2);--shadow-sm: 0 2px 8px rgba(0, 0, 0, .2);--shadow-md: 0 4px 16px rgba(0, 0, 0, .3);--shadow-lg: 0 8px 32px rgba(0, 0, 0, .4);--shadow-xl: 0 20px 60px rgba(0, 0, 0, .5);--scrollbar-thumb: #48484a;--scrollbar-thumb-hover: #636366;--overlay: rgba(0, 0, 0, .6);--overlay-light: rgba(0, 0, 0, .6);--overlay-heavy: rgba(0, 0, 0, .8);--btn-bg: #1a1a1a;--btn-text: rgba(255, 255, 255, .87);--btn-primary-text: #fff;--btn-border: rgba(255, 255, 255, .2);--btn-hover-bg: rgba(255, 255, 255, .1);--bg-hover: rgba(255, 255, 255, .06);--border-light: rgba(255, 255, 255, .08);--primary-bg-hover: rgba(74, 158, 255, .2);--primary-shadow: rgba(74, 158, 255, .3);--success-color: #32d74b;--warning-color: #ff9f0a;--shadow-xs: 0 1px 4px rgba(0, 0, 0, .1);--input-bg: #2c2c2e;--input-border: #48484a;--input-focus-border: #64b5f6;--input-focus-shadow: rgba(100, 181, 246, .1);color:var(--text-primary);background-color:var(--bg-primary)}}.dark{--bg-primary: #1a1a1a;--bg-secondary: #1c1c1e;--bg-tertiary: #2c2c2e;--bg-quaternary: rgba(28, 28, 30, .8);--text-primary: #fff;--text-secondary: #8e8e93;--text-tertiary: #98989d;--text-quaternary: #636366;--border-primary: rgba(255, 255, 255, .1);--border-secondary: rgba(255, 255, 255, .08);--border-tertiary: #424245;--border-quaternary: #48484a;--color-primary: #4a9eff;--color-primary-hover: #64b5f6;--color-primary-dark: #3a8eef;--color-primary-light: rgba(74, 158, 255, .2);--color-primary-lighter: rgba(74, 158, 255, .1);--color-success: #32d74b;--color-success-light: rgba(52, 199, 89, .2);--color-warning: #ff9f0a;--color-warning-light: rgba(255, 149, 0, .2);--color-error: #ff453a;--color-error-bg: #5c2122;--color-error-border: #7c2e2f;--color-error-text: #f8d7da;--color-error-light: rgba(255, 69, 58, .2);--color-info: #5e5ce6;--color-info-light: rgba(88, 86, 214, .2);--shadow-sm: 0 2px 8px rgba(0, 0, 0, .2);--shadow-md: 0 4px 16px rgba(0, 0, 0, .3);--shadow-lg: 0 8px 32px rgba(0, 0, 0, .4);--shadow-xl: 0 20px 60px rgba(0, 0, 0, .5);--scrollbar-thumb: #48484a;--scrollbar-thumb-hover: #636366;--overlay: rgba(0, 0, 0, .6);--overlay-light: rgba(0, 0, 0, .6);--overlay-heavy: rgba(0, 0, 0, .8);--btn-bg: #1a1a1a;--btn-text: rgba(255, 255, 255, .87);--btn-primary-text: #fff;--btn-border: rgba(255, 255, 255, .2);--btn-hover-bg: rgba(255, 255, 255, .1);--bg-hover: rgba(255, 255, 255, .06);--border-light: rgba(255, 255, 255, .08);--primary-bg-hover: rgba(74, 158, 255, .2);--primary-shadow: rgba(74, 158, 255, .3);--success-color: #32d74b;--warning-color: #ff9f0a;--shadow-xs: 0 1px 4px rgba(0, 0, 0, .1);--input-bg: #2c2c2e;--input-border: #48484a;--input-focus-border: #64b5f6;--input-focus-shadow: rgba(100, 181, 246, .1);color:var(--text-primary);background-color:var(--bg-primary)}.light{--bg-primary: #fff;--bg-secondary: #f5f5f7;--bg-tertiary: #f8f9fa;--bg-quaternary: rgba(248, 248, 248, .8);--text-primary: #1d1d1f;--text-secondary: #86868b;--text-tertiary: #666;--text-quaternary: #8e8e93;--border-primary: rgba(0, 0, 0, .08);--border-secondary: rgba(0, 0, 0, .05);--border-tertiary: #e5e5e7;--border-quaternary: #d2d2d7;--color-primary: #007aff;--color-primary-hover: #0051d5;--color-primary-dark: #0051d5;--color-primary-light: rgba(0, 122, 255, .1);--color-primary-lighter: rgba(0, 122, 255, .05);--color-success: #34c759;--color-warning: #ff9500;--color-error: #ff3b30;--color-danger: #ff3b30;--btn-bg: #f9f9f9;--btn-text: #213547;--btn-primary-text: #fff;--btn-border: rgba(0, 0, 0, .1);--btn-hover-bg: rgba(0, 0, 0, .06);--input-bg: #fff;--input-border: #ddd;--input-focus-border: #007bff;--input-focus-shadow: rgba(0, 123, 255, .1);--border-light: rgba(0, 0, 0, .05);--success-color: #34c759;--warning-color: #ff9500;--shadow-xs: 0 1px 4px rgba(0, 0, 0, .04);--shadow-sm: 0 2px 8px rgba(0, 0, 0, .06);--shadow-md: 0 4px 16px rgba(0, 0, 0, .1);color:var(--text-primary);background-color:var(--bg-primary)}.error-message{background:var(--color-error-bg);border:1px solid var(--color-error-border);padding:10px;border-radius:5px;color:var(--color-error-text);margin-bottom:20px}.error-message p{margin:0;color:var(--color-error-text)}select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e\");background-repeat:no-repeat;background-position:right 8px center;background-size:16px;padding-right:32px!important}@media (prefers-color-scheme: dark){select{background-image:url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e\")}}",
        ),
      ),
        document.head.appendChild(e)
    }
  } catch (_) {
    console.error('vite-plugin-css-injected-by-js', _)
  }
})()
var __defProp = Object.defineProperty,
  __defNormalProp = (e, t, a) =>
    t in e
      ? __defProp(e, t, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: a,
        })
      : (e[t] = a),
  __publicField = (e, t, a) =>
    __defNormalProp(e, 'symbol' != typeof t ? t + '' : t, a)
!(function (e, t) {
  'use strict'
  var a = {},
    n = t
  ;(a.createRoot = n.createRoot), (a.hydrateRoot = n.hydrateRoot)
  const s = function (e, t, a) {
    let n = Promise.resolve()
    function s(e) {
      const t = new Event('vite:preloadError', { cancelable: !0 })
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented))
        throw e
    }
    return n.then(t => {
      for (const e of t || []) 'rejected' === e.status && s(e.reason)
      return e().catch(s)
    })
  }
  var l = { exports: {} },
    i = {},
    o = e,
    r = Symbol.for('react.element'),
    d = Symbol.for('react.fragment'),
    c = Object.prototype.hasOwnProperty,
    u = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    _ = { key: !0, ref: !0, __self: !0, __source: !0 }
  function m(e, t, a) {
    var n,
      s = {},
      l = null,
      i = null
    for (n in (void 0 !== a && (l = '' + a),
    void 0 !== t.key && (l = '' + t.key),
    void 0 !== t.ref && (i = t.ref),
    t))
      c.call(t, n) && !_.hasOwnProperty(n) && (s[n] = t[n])
    if (e && e.defaultProps)
      for (n in (t = e.defaultProps)) void 0 === s[n] && (s[n] = t[n])
    return { $$typeof: r, type: e, key: l, ref: i, props: s, _owner: u.current }
  }
  ;(i.Fragment = d), (i.jsx = m), (i.jsxs = m), (l.exports = i)
  var p = l.exports
  const h = () =>
    'undefined' != typeof window && 'undefined' != typeof GM_xmlhttpRequest
  async function x(e, t = {}) {
    const {
      method: a = 'GET',
      headers: n = {},
      body: s,
      timeout: l = 3e4,
      signal: i,
    } = t
    if (h())
      return new Promise((t, o) => {
        if (null == i ? void 0 : i.aborted)
          return o(new Error('Request aborted'))
        const r = new AbortController(),
          d = l > 0 ? setTimeout(() => r.abort(), l) : void 0,
          c = () => {
            clearTimeout(d), r.abort(), o(new Error('Request aborted'))
          }
        null == i || i.addEventListener('abort', c),
          GM_xmlhttpRequest({
            method: a.toUpperCase(),
            url: e,
            headers: { 'Content-Type': 'application/json', ...n },
            data: s,
            timeout: l,
            onload: e => {
              clearTimeout(d),
                null == i || i.removeEventListener('abort', c),
                t({
                  ok: e.status >= 200 && e.status < 300,
                  status: e.status,
                  statusText: e.statusText,
                  headers: g(e.responseHeaders),
                  json: () => Promise.resolve(JSON.parse(e.responseText)),
                  text: () => Promise.resolve(e.responseText),
                })
            },
            onerror: e => {
              clearTimeout(d),
                null == i || i.removeEventListener('abort', c),
                o(new Error(`Network error: ${e.error || 'Unknown error'}`))
            },
            ontimeout: () => {
              null == i || i.removeEventListener('abort', c),
                o(new Error('Request timeout'))
            },
          })
      })
    {
      const t = {
        method: a,
        headers: { 'Content-Type': 'application/json', ...n },
        body: s,
        signal: i,
      }
      l > 0 && !i && (t.signal = AbortSignal.timeout(l))
      try {
        const a = await fetch(e, t)
        return {
          ok: a.ok,
          status: a.status,
          statusText: a.statusText,
          headers: a.headers,
          json: () => a.json(),
          text: () => a.text(),
        }
      } catch (o) {
        if (o instanceof Error) throw o
        throw new Error('Network request failed')
      }
    }
  }
  const g = e => {
      const t = {}
      return e
        ? (e.split('\n').forEach(e => {
            const a = e.split(': ')
            2 === a.length && (t[a[0].toLowerCase()] = a[1])
          }),
          t)
        : t
    },
    v = {
      /**
       * 设置存储值
       */
      setItem: (e, t) => {
        try {
          h() && 'undefined' != typeof GM_setValue
            ? GM_setValue(e, t)
            : 'undefined' != typeof localStorage && localStorage.setItem(e, t)
        } catch (a) {}
      },
      /**
       * 获取存储值
       */
      getItem: e => {
        try {
          return h() && 'undefined' != typeof GM_getValue
            ? GM_getValue(e, null)
            : 'undefined' != typeof localStorage
              ? localStorage.getItem(e)
              : null
        } catch (t) {
          return null
        }
      },
      /**
       * 删除存储值
       */
      removeItem: e => {
        try {
          h() && 'undefined' != typeof GM_deleteValue
            ? GM_deleteValue(e)
            : 'undefined' != typeof localStorage && localStorage.removeItem(e)
        } catch (t) {}
      },
    },
    b = '1.10.3',
    j = {
      DEEPSEEK_BASE_URL: 'https://api.deepseek.com/v1',
      REQUEST_TIMEOUT: 3e4,
    },
    f = {
      gitlabUrl: 'https://www.lejuhub.com/api/v4',
      gitlabToken: '',
      deepseekApiKey: '',
      defaultPrompt:
        '你是一名前端工程师, 现在需要提交一份100字左右的周报, 请根据Git提交记录生成一份简洁的周报;请使用中文回答; 请使用简单文本, 不要使用markdown格式;减少笼统的描述;不需要下周计划;',
      tokenLimit: 4e3,
      // 默认token限制
      model: 'deepseek-chat',
      customPrompt: '',
      theme: 'system',
    },
    N = 'https://gitlab.example.com',
    y = '请输入您的GitLab Personal Access Token',
    C = '请输入您的DeepSeek API Key',
    k = '请根据以下GitLab事件数据生成工作周报...',
    E = 'gitlab_weekly_report_config',
    w = {
      'weekly-report': {
        type: 'weekly-report',
        title: 'AI 周报生成',
        buttonText: 'AI 周报',
        defaultPrompt:
          '你是一名前端工程师, 现在需要提交一份100字左右的周报, 请根据Git提交记录生成一份简洁的周报;请使用中文回答; 请使用简单文本, 不要使用markdown格式;减少笼统的描述;不需要下周计划;',
        description: '基于选中的GitLab事件数据生成专业的工作周报',
        placeholder: '请输入用于生成周报的提示词...',
        loadingText: 'AI 正在分析事件数据，生成周报中...',
        emptyTitle: '准备生成 AI 周报',
        emptyDescription:
          '点击"生成周报"按钮，AI 将基于您的 GitLab 事件数据生成专业的工作周报',
        generateButtonText: '生成周报',
        regenerateButtonText: '重新生成',
      },
      changelog: {
        type: 'changelog',
        title: 'AI 变更日志生成',
        buttonText: 'AI 变更日志',
        defaultPrompt:
          '你是一名技术文档编写专家，现在需要根据GitLab事件数据生成变更日志(CHANGELOG)。请使用简洁、专业的语言描述代码变更内容，突出重要功能和修复。请使用中文回答，使用简洁的文本格式，使用简单的markdown语法。分为修复和新增两个部分',
        description: '基于项目事件数据生成规范的变更日志文档',
        placeholder: '请输入用于生成变更日志的提示词...',
        loadingText: 'AI 正在分析项目数据，生成变更日志中...',
        emptyTitle: '准备生成 AI 变更日志',
        emptyDescription:
          '点击"生成变更日志"按钮，AI 将基于项目事件数据生成规范的变更日志',
        generateButtonText: '生成变更日志',
        regenerateButtonText: '重新生成',
      },
      custom: {
        type: 'custom',
        title: 'AI 内容生成',
        buttonText: 'AI 生成',
        defaultPrompt: '请根据提供的数据生成相应的内容...',
        description: '基于数据使用自定义提示词生成内容',
        placeholder: '请输入自定义提示词...',
        loadingText: 'AI 正在处理数据，生成内容中...',
        emptyTitle: '准备生成 AI 内容',
        emptyDescription:
          '点击"生成内容"按钮，AI 将基于您的自定义提示词生成内容',
        generateButtonText: '生成内容',
        regenerateButtonText: '重新生成',
      },
    }
  class S extends Error {
    constructor(e, t, a) {
      super(`[${a}] ${t}`),
        __publicField(this, 'status'),
        __publicField(this, 'service'),
        (this.name = 'ApiError'),
        (this.status = e),
        (this.service = a)
    }
  }
  class T extends Error {
    constructor(e, t) {
      super(`[${t}] ${e}`),
        __publicField(this, 'service'),
        (this.name = 'ResponseError'),
        (this.service = t)
    }
  }
  class I {
    /**
     * 创建API错误
     */
    static createApiError(e, t, a) {
      return new S(e, t, a)
    }
    /**
     * 创建响应错误
     */ static createResponseError(e, t) {
      return new T(e, t)
    }
    /**
     * 创建网络错误
     */ static createNetworkError(e) {
      const t = new Error(`网络错误: ${e}`)
      return (t.name = 'NetworkError'), t
    }
    /**
     * 创建配置错误
     */ static createConfigError(e) {
      const t = new Error(`配置错误: ${e}`)
      return (t.name = 'ConfigError'), t
    }
    /**
     * 格式化错误信息为用户友好的格式
     */ static formatErrorMessage(e) {
      if ('string' == typeof e) return e
      if (e instanceof Error) {
        const t = {
          ApiError: e.message,
          NetworkError: e.message,
          ConfigError: e.message,
        }
        if (t[e.name]) return t[e.name]
        const a = {
          fetch: '网络连接失败，请检查网络连接后重试',
          timeout: '请求超时，请稍后重试',
          CORS: '跨域请求被阻止，请检查服务器配置',
        }
        for (const n in a) if (e.message.includes(n)) return a[n]
        return e.message
      }
      return '发生未知错误，请稍后重试'
    }
    /**
     * 记录错误日志
     */ static logError(e, t) {
      new Date().toISOString()
      Error
    }
    /**
     * 安全地执行异步操作，自动处理错误
     */ static async safeAsync(e, t, a) {
      try {
        return await e()
      } catch (n) {
        return this.logError(n, a), t
      }
    }
    /**
     * 安全地执行同步操作，自动处理错误
     */ static safeSync(e, t, a) {
      try {
        return e()
      } catch (n) {
        return this.logError(n, a), t
      }
    }
    /**
     * 创建应用错误对象
     */ static createAppError(e, t, a) {
      return { code: e, message: t, details: a, timestamp: Date.now() }
    }
    /**
     * 判断是否为取消错误
     */ static isAbortError(e) {
      return e instanceof Error && 'AbortError' === e.name
    }
    /**
     * 判断是否为网络错误
     */ static isNetworkError(e) {
      if (!(e instanceof Error)) return !1
      return (
        ['NetworkError', 'fetch', 'network', 'timeout'].some(t =>
          e.message.includes(t),
        ) || 'NetworkError' === e.name
      )
    }
  }
  const M = e => {
      try {
        return e(v)
      } catch (t) {
        if ('undefined' != typeof localStorage)
          try {
            return e(localStorage)
          } catch (a) {}
      }
    },
    $ = e => {
      M(t => t.setItem(E, JSON.stringify(e)))
    },
    D = () => {
      const e = M(e => e.getItem(E))
      return e ? JSON.parse(e) : null
    },
    L = () => {
      M(e => e.removeItem(E))
    },
    A = '请先完善GitLab和DeepSeek配置信息',
    P = '请先完善配置信息',
    O = '请至少选择一个事件来生成周报',
    U = '请检查筛选条件或GitLab配置',
    R = {
      config: f,
      reportData: null,
      isLoading: !1,
      error: null,
      theme: f.theme,
      activePanel: 'main',
      appMode: 'events',
      filterConditions: { timeRange: 'week', targetType: [], action: [] },
      sortOptions: { field: 'created_at', order: 'desc' },
      paginationOptions: {
        page: 1,
        pageSize: 50,
        // 每页显示数量
        total: 0,
      },
      events: [],
      totalCount: 0,
      aiGenerationConfig: null,
      // Changelog模式相关状态
      projects: [],
      selectedProjectId: null,
      commits: [],
    }
  function G() {
    const [t, a] = e.useState(R)
    e.useEffect(() => {
      ;(async () => {
        try {
          const e = await D(),
            t = e ? { ...f, ...e } : f
          a(e => ({ ...e, config: t, theme: t.theme || f.theme }))
        } catch (e) {
          a(e => ({ ...e, config: f, theme: f.theme }))
        }
      })()
    }, [])
    const n = e.useCallback(e => {
        a(t => {
          const a = { ...t.config, ...e }
          try {
            $(a)
          } catch (n) {}
          return { ...t, config: a }
        })
      }, []),
      s = e.useCallback(e => {
        a(t => ({ ...t, activePanel: e }))
      }, []),
      l = e.useCallback(e => {
        a(t => ({ ...t, appMode: e }))
      }, []),
      i = e.useCallback(e => {
        a(t => ({ ...t, projects: e }))
      }, []),
      o = e.useCallback(e => {
        a(t => ({ ...t, selectedProjectId: e }))
      }, []),
      r = e.useCallback(e => {
        a(t => ({ ...t, commits: e }))
      }, []),
      d = e.useCallback(e => {
        a(t => ({
          ...t,
          filterConditions: e,
          paginationOptions: { ...t.paginationOptions, page: 1 },
        }))
      }, []),
      c = e.useCallback(e => {
        a(t => ({ ...t, sortOptions: e }))
      }, []),
      u = e.useCallback(e => {
        a(t => ({ ...t, paginationOptions: { ...t.paginationOptions, ...e } }))
      }, []),
      _ = e.useCallback(e => {
        a(t => ({ ...t, events: e }))
      }, []),
      m = e.useCallback(e => {
        a(t => ({
          ...t,
          totalCount: e,
          paginationOptions: { ...t.paginationOptions, total: e },
        }))
      }, []),
      p = e.useCallback(e => {
        a(t => ({ ...t, aiGenerationConfig: e }))
      }, []),
      h = e.useCallback(e => {
        a(t => ({ ...t, isLoading: e }))
      }, []),
      x = e.useCallback(e => {
        a(t => ({ ...t, error: e }))
      }, []),
      g = e.useCallback(e => {
        a(t => ({ ...t, reportData: e }))
      }, []),
      v = e.useCallback(e => {
        a(t => {
          const a = { ...t.config, theme: e }
          try {
            $(a)
          } catch (n) {}
          return { ...t, config: a, theme: e }
        })
      }, []),
      b = e.useCallback(() => {
        a(e => {
          let t
          switch (e.theme) {
            case 'light':
              t = 'dark'
              break
            case 'dark':
              t = 'system'
              break
            default:
              t = 'light'
          }
          const a = { ...e.config, theme: t }
          try {
            $(a)
          } catch (n) {}
          return { ...e, config: a, theme: t }
        })
      }, []),
      j = e.useCallback(() => {
        a(R), L()
      }, []),
      N = e.useCallback(() => {
        const {
          gitlabUrl: e,
          gitlabToken: a,
          deepseekApiKey: n,
          defaultPrompt: s,
        } = t.config
        return !!(e.trim() && a.trim() && n.trim() && s.trim())
      }, [t.config]),
      y = e.useCallback(() => {
        const e = new Date(),
          a = t.filterConditions.timeRange,
          n = 864e5,
          s = new Date(e.getTime() + n)
        if ('week' === a) {
          const t = e.getDay()
          let a = 0 === t ? 6 : t - 1
          1 === t && (a += 1)
          return {
            startDate: new Date(e.getTime() - a * n)
              .toISOString()
              .split('T')[0],
            endDate: s.toISOString().split('T')[0],
          }
        }
        let l = 7
        l = { '7d': 7, '30d': 30, '90d': 90, '180d': 180, '365d': 365 }[a] || 7
        return {
          startDate: new Date(e.getTime() - l * n).toISOString().split('T')[0],
          endDate: s.toISOString().split('T')[0],
        }
      }, [t.filterConditions.timeRange])
    return {
      state: t,
      updateConfig: n,
      setActivePanel: s,
      setAppMode: l,
      setProjects: i,
      setSelectedProjectId: o,
      setCommits: r,
      updateFilterConditions: d,
      updateSortOptions: c,
      updatePaginationOptions: u,
      setEvents: _,
      setTotal: m,
      setAIGenerationConfig: p,
      setLoading: h,
      setError: x,
      setReportData: g,
      setTheme: v,
      toggleTheme: b,
      resetState: j,
      isConfigValid: N,
      getTimeRange: y,
    }
  }
  const B = () => {
      const t = e.useRef(null),
        a = e.useCallback(() => {
          t.current && t.current.abort()
          const e = new AbortController()
          return (t.current = e), e
        }, []),
        n = e.useCallback(() => {
          t.current && (t.current.abort(), (t.current = null))
        }, []),
        s = e.useCallback(e => e.signal.aborted, []),
        l = e.useCallback(e => {
          t.current === e && (t.current = null)
        }, []),
        i = e.useCallback(
          e => e instanceof Error && 'AbortError' === e.name,
          [],
        )
      return (
        e.useEffect(
          () => () => {
            n()
          },
          [n],
        ),
        {
          createRequest: a,
          cancelRequest: n,
          isRequestCancelled: s,
          cleanupRequest: l,
          isAbortError: i,
        }
      )
    },
    F = 'index-module__filter-section-content__y5rEz',
    V = 'index-module__filter-group__5B49Z',
    q = 'index-module__filter-label__kgsrz',
    z = 'index-module__filter-options__83wOv',
    H = 'index-module__filter-option__SG0B9',
    K = 'index-module__active__IQgMz',
    X = [
      { value: 'week', label: '本周' },
      { value: '7d', label: '最近7天' },
      { value: '30d', label: '最近30天' },
      { value: '90d', label: '最近90天' },
      { value: '180d', label: '最近180天' },
      { value: '365d', label: '最近365天' },
    ],
    Q = [
      // { value: 'epic', label: 'Epic (需要启用新外观)' },
      { value: 'issue', label: 'Issue' },
      { value: 'merge_request', label: 'Merge Request' },
      { value: 'milestone', label: 'Milestone' },
      { value: 'note', label: 'Note' },
      { value: 'project', label: 'Project' },
      { value: 'snippet', label: 'Snippet' },
      { value: 'user', label: 'User' },
    ],
    Z = [
      { value: 'created', label: 'Created' },
      { value: 'updated', label: 'Updated' },
      { value: 'closed', label: 'Closed' },
      { value: 'reopened', label: 'Reopened' },
      { value: 'pushed', label: 'Pushed' },
      { value: 'commented', label: 'Commented' },
      { value: 'merged', label: 'Merged' },
      { value: 'approved', label: 'Approved' },
      { value: 'joined', label: 'Joined' },
      { value: 'left', label: 'Left' },
      { value: 'deleted', label: 'Deleted' },
    ],
    J = ({ filterConditions: e, onFilterChange: t }) => {
      const a = (a, n) => {
          t({ ...e, [a]: n })
        },
        n = [
          { key: 'targetType', label: '目标类型', options: Q },
          { key: 'action', label: '操作类型', options: Z },
        ]
      return p.jsxs('div', {
        className: F,
        children: [
          p.jsxs('div', {
            className: V,
            children: [
              p.jsx('label', { className: q, children: '时间范围' }),
              p.jsx('div', {
                className: z,
                children: X.map(({ value: t, label: n }) =>
                  p.jsx(
                    'button',
                    {
                      className: `${H} ${e.timeRange === t ? K : ''}`,
                      onClick: () => a('timeRange', t),
                      children: n,
                    },
                    t,
                  ),
                ),
              }),
            ],
          }),
          n.map(({ key: t, label: n, options: s }) =>
            p.jsxs(
              'div',
              {
                className: V,
                children: [
                  p.jsx('label', { className: q, children: n }),
                  p.jsxs('div', {
                    className: z,
                    children: [
                      p.jsx('button', {
                        className: `${H} ${0 === e[t].length ? K : ''}`,
                        onClick: () => a(t, []),
                        children: '全部',
                      }),
                      s.map(({ value: n, label: s }) =>
                        p.jsx(
                          'button',
                          {
                            className: `${H} ${Array.isArray(e[t]) && e[t].includes(n) ? K : ''}`,
                            onClick: () =>
                              ((t, n, s) => {
                                const l = e[t],
                                  i = s ? [...l, n] : l.filter(e => e !== n)
                                a(t, i)
                              })(t, n, !e[t].includes(n)),
                            children: s,
                          },
                          n,
                        ),
                      ),
                    ],
                  }),
                ],
              },
              t,
            ),
          ),
        ],
      })
    },
    W = {
      pagination: 'index-module__pagination__5dauU',
      paginationInfo: 'index-module__pagination-info__xbUbw',
      paginationControls: 'index-module__pagination-controls__q2hqL',
      paginationBtn: 'index-module__pagination-btn__P1OCG',
      disabled: 'index-module__disabled__BywdX',
      active: 'index-module__active__lSJu-',
      paginationEllipsis: 'index-module__pagination-ellipsis__gQnax',
      paginationSizeChanger: 'index-module__pagination-size-changer__SufyI',
      paginationSelect: 'index-module__pagination-select__JwvbH',
    },
    Y = e.memo(
      ({
        current: t,
        pageSize: a,
        total: n,
        onChange: s,
        showSizeChanger: l = !0,
        pageSizeOptions: i = [20, 50, 100, 200],
        onShowSizeChange: o,
      }) => {
        const r = Math.ceil(n / a),
          d = (t - 1) * a + 1,
          c = Math.min(t * a, n),
          u = e => {
            e >= 1 && e <= r && e !== t && s(e)
          }
        return 0 === n
          ? p.jsx('div', {
              className: W.pagination,
              children: p.jsx('div', {
                className: W.info,
                children: p.jsx('span', { children: '暂无数据' }),
              }),
            })
          : p.jsxs('div', {
              className: W.pagination,
              children: [
                p.jsx('div', {
                  className: W.paginationInfo,
                  children: p.jsxs('span', {
                    children: ['显示 ', d, '-', c, ' 条，共 ', n, ' 条'],
                  }),
                }),
                p.jsxs('div', {
                  className: W.paginationControls,
                  children: [
                    p.jsx('button', {
                      className: `${W.paginationBtn} ${1 === t ? W.disabled : ''}`,
                      onClick: () => u(t - 1),
                      disabled: 1 === t,
                      children: p.jsx('span', { children: '‹' }),
                    }),
                    (() => {
                      if (r <= 7)
                        return Array.from({ length: r }, (e, t) => t + 1)
                      const e = [1],
                        a = Math.max(2, t - 2),
                        n = Math.min(r - 1, t + 2)
                      t > 4 && e.push('...')
                      for (let t = a; t <= n; t++) e.push(t)
                      return t < r - 2 - 1 && e.push('...'), e.push(r), e
                    })().map((a, n) =>
                      p.jsx(
                        e.Fragment,
                        {
                          children:
                            'number' == typeof a
                              ? p.jsx('button', {
                                  className: `${W.paginationBtn} ${t === a ? W.active : ''}`,
                                  onClick: () => u(a),
                                  children: a,
                                })
                              : p.jsx('span', {
                                  className: W.paginationEllipsis,
                                  children: a,
                                }),
                        },
                        n,
                      ),
                    ),
                    p.jsx('button', {
                      className: `${W.paginationBtn} ${t === r ? W.disabled : ''}`,
                      onClick: () => u(t + 1),
                      disabled: t === r,
                      children: p.jsx('span', { children: '›' }),
                    }),
                  ],
                }),
                l &&
                  p.jsxs('div', {
                    className: W.paginationSizeChanger,
                    children: [
                      p.jsx('span', { children: '每页' }),
                      p.jsx('select', {
                        value: a,
                        onChange: e => {
                          return (
                            (t = Number(e.target.value)), void (o && o(1, t))
                          )
                          var t
                        },
                        className: W.paginationSelect,
                        children: i.map(e =>
                          p.jsx('option', { value: e, children: e }, e),
                        ),
                      }),
                      p.jsx('span', { children: '条' }),
                    ],
                  }),
              ],
            })
      },
    ),
    ee = 'index-module__selectionManager__BVUt4',
    te = 'index-module__selectionInfo__xzOCm',
    ae = 'index-module__selectionCount__C1Iwo',
    ne = 'index-module__selectionActions__Apagf',
    se = 'index-module__actionGroup__E-C1y',
    le = 'index-module__groupLabel__x-jJZ',
    ie = 'index-module__actionBtn__421Xy',
    oe = 'index-module__selectAllBtn__bMAjm',
    re = 'index-module__clearBtn__atjK2',
    de = e.memo(
      ({
        currentPageEvents: t,
        selectedEventIds: a,
        totalCount: n,
        onSelectionChange: s,
        loading: l = !1,
      }) => {
        const i = e.useRef(!1),
          o = e.useRef(!1),
          r = e.useMemo(() => t.map(e => e.id), [t]),
          d = e.useMemo(() => a.includes(-1), [a]),
          c = e.useMemo(() => {
            if (d) return { count: n, text: `已全选 ${n} 条` }
            const e = a.filter(e => -1 !== e).length
            return { count: e, text: `已选中 ${e} 条` }
          }, [d, n, a])
        e.useEffect(() => {
          if (r.length > 0 && !d && !l) {
            const e = a.filter(e => -1 !== e)
            if (!o.current && 0 === e.length && !i.current) {
              const e = [...r]
              s(e, !1), (o.current = !0)
            }
          }
        }, [r, a, d, l, s]),
          e.useEffect(() => {
            a.length > 0 && (i.current = !1)
          }, [a])
        const u = e.useCallback(() => {
            ;(i.current = !1), s([-1], !0)
          }, [s]),
          _ = e.useCallback(() => {
            ;(i.current = !0), s([], !1)
          }, [s])
        return p.jsxs('div', {
          className: ee,
          children: [
            p.jsx('div', {
              className: te,
              children: p.jsx('span', { className: ae, children: c.text }),
            }),
            p.jsx('div', {
              className: ne,
              children: p.jsxs('div', {
                className: se,
                children: [
                  p.jsx('span', { className: le, children: '全部:' }),
                  p.jsx('button', {
                    className: `${ie} ${oe}`,
                    onClick: u,
                    disabled: l || d,
                    title: '选择所有数据',
                    children: '全选',
                  }),
                  p.jsx('button', {
                    className: `${ie} ${re}`,
                    onClick: _,
                    disabled: l || 0 === c.count,
                    title: '清空选择',
                    children: '清空',
                  }),
                ],
              }),
            }),
          ],
        })
      },
    ),
    ce = {
      eventsList: 'index-module__events-list__-m-9O',
      eventsListHeader: 'index-module__events-list-header__IFdcr',
      headerCell: 'index-module__header-cell__Q50BV',
      checkboxCell: 'index-module__checkbox-cell__fFp2c',
      contentCell: 'index-module__content-cell__XX9h3',
      actionCell: 'index-module__action-cell__cQC45',
      timeCell: 'index-module__time-cell__MQe22',
      detailCell: 'index-module__detail-cell__zq1IN',
      sortIcon: 'index-module__sort-icon__tSSwt',
      eventsListBody: 'index-module__events-list-body__QknuZ',
      eventRow: 'index-module__event-row__nD7Rz',
      selected: 'index-module__selected__QNHpl',
      cell: 'index-module__cell__KsOts',
      eventIcon: 'index-module__event-icon__9UCQ3',
      eventContent: 'index-module__event-content__YCPED',
      eventTitle: 'index-module__event-title__530MV',
      eventDescription: 'index-module__event-description__C3Fjc',
      actionTag: 'index-module__action-tag__GZU05',
      eventTime: 'index-module__event-time__1VIXa',
      detailBtn: 'index-module__detail-btn__Q5YpF',
      detailIcon: 'index-module__detail-icon__E5Shy',
      emptyState: 'index-module__empty-state__ohnRa',
      emptyIcon: 'index-module__empty-icon__OXdkI',
      eventsListLoading: 'index-module__events-list-loading__e6mCh',
      loadingSpinner: 'index-module__loading-spinner__C04N8',
      checkboxContainer: 'index-module__checkbox-container__UxYEH',
      checkmark: 'index-module__checkmark__-Dj1c',
    },
    ue = e.memo(
      ({
        events: t,
        totalCount: a,
        loading: n,
        sortOptions: s,
        onSortChange: l,
        paginationOptions: i,
        onPaginationChange: o,
        selectedEventIds: r,
        isFullSelection: d,
        onSelectionChange: c,
        onEventSelect: u,
        onEventDetail: _,
      }) => {
        const m = e.useCallback(
            e => {
              if ('created_at' !== e) return
              const t = s.field === e && 'desc' === s.order ? 'asc' : 'desc'
              l({ field: e, order: t })
            },
            [s.field, s.order, l],
          ),
          h = e.useCallback(
            e => (s.field !== e ? '' : 'desc' === s.order ? '↓' : '↑'),
            [s.field, s.order],
          ),
          x = e.useCallback(
            e => {
              u(e)
            },
            [u],
          ),
          g = e.useCallback(e => {
            const t = new Date(e),
              a = new Date(),
              n =
                new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() -
                new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime(),
              s = Math.floor(n / 864e5),
              l = t.toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit',
              })
            return 0 === s
              ? `今天 ${l}`
              : 1 === s
                ? `昨天 ${l}`
                : s > 1 && s <= 7
                  ? `${s}天前`
                  : t.toLocaleDateString('zh-CN', {
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
          }, []),
          v = e.useCallback(e => {
            if (e.push_data) return `推送到分支 ${e.push_data.ref}`
            if (e.note) {
              const t = 50
              return `评论: ${e.note.body.replace(/\n/g, ' ').substring(0, t)}${e.note.body.length > t ? '...' : ''}`
            }
            return 'joined' === e.action_name
              ? '加入项目'
              : e.title || e.target_title || '无标题'
          }, []),
          b = e.useCallback(
            e => {
              const { action_name: t, target_type: a } = e
              if (e.push_data) {
                const { ref: t, commit_count: a } = e.push_data
                return {
                  icon: '⬆️',
                  actionType: '推送',
                  title: `推送到分支 ${t} (${a} 个提交)`,
                }
              }
              if (e.note) {
                const t = 50
                return {
                  icon: '💬',
                  actionType: '评论',
                  title: `评论: ${e.note.body.replace(/\n/g, ' ').substring(0, t)}${e.note.body.length > t ? '...' : ''}`,
                }
              }
              const n = e.title || e.target_title || '无标题',
                s = {
                  // TargetType based
                  Issue: { icon: '🐛', actionType: '问题' },
                  MergeRequest: { icon: '🔀', actionType: '合并请求' },
                  WikiPage: { icon: '📖', actionType: 'Wiki' },
                  Project: { icon: '📁', actionType: '项目' },
                  Milestone: { icon: '🎯', actionType: '里程碑' },
                  Epic: { icon: '🎪', actionType: 'Epic' },
                  Snippet: { icon: '✂️', actionType: '代码片段' },
                  User: { icon: '👤', actionType: '用户' },
                  // ActionName based
                  'pushed to': { icon: '⬆️', actionType: '推送' },
                  'pushed new': { icon: '⬆️', actionType: '推送新分支' },
                  opened: { icon: '🆕', actionType: '开启' },
                  closed: { icon: '✅', actionType: '关闭' },
                  merged: { icon: '🔀', actionType: '合并' },
                  'commented on': { icon: '💬', actionType: '评论' },
                  joined: { icon: '👋', actionType: '加入' },
                  left: { icon: '👋', actionType: '离开' },
                  created: { icon: '✨', actionType: '创建' },
                  updated: { icon: '🔄', actionType: '更新' },
                  deleted: { icon: '🗑️', actionType: '删除' },
                  approved: { icon: '✅', actionType: '批准' },
                  unapproved: { icon: '❌', actionType: '取消批准' },
                },
                l = (a && s[a]) || (t && s[t])
              return l
                ? { ...l, title: n }
                : { icon: '📋', actionType: a || t || '未知操作', title: v(e) }
            },
            [v],
          ),
          j = e.useCallback(e => {
            var t
            return e.push_data
              ? `${e.push_data.commit_count} 个提交: ${e.push_data.commit_title}`
              : e.note && e.target_title
                ? e.target_title
                : (null == (t = e.project) ? void 0 : t.path_with_namespace) ||
                  `项目ID: ${e.project_id}` ||
                  '未知项目'
          }, [])
        return p.jsxs('div', {
          className: ce.eventsList,
          children: [
            p.jsx(de, {
              currentPageEvents: t,
              selectedEventIds: r,
              totalCount: a,
              onSelectionChange: c,
              loading: n,
            }),
            p.jsxs('div', {
              className: ce.eventsListHeader,
              children: [
                p.jsx('div', {
                  className: `${ce.headerCell} ${ce.checkboxCell}`,
                  children: p.jsx('span', { children: '选择' }),
                }),
                p.jsx('div', {
                  className: `${ce.headerCell} ${ce.contentCell}`,
                  children: p.jsx('span', { children: '标题和内容' }),
                }),
                p.jsx('div', {
                  className: `${ce.headerCell} ${ce.actionCell}`,
                  children: p.jsx('span', { children: '操作' }),
                }),
                p.jsxs('div', {
                  className: `${ce.headerCell} ${ce.timeCell}`,
                  onClick: () => m('created_at'),
                  children: [
                    p.jsx('span', { children: '时间' }),
                    p.jsx('span', {
                      className: ce.sortIcon,
                      children: h('created_at'),
                    }),
                  ],
                }),
                p.jsx('div', {
                  className: `${ce.headerCell} ${ce.detailCell}`,
                  children: '详情',
                }),
              ],
            }),
            p.jsx('div', {
              className: ce.eventsListBody,
              children: n
                ? p.jsxs('div', {
                    className: ce.eventsListLoading,
                    children: [
                      p.jsx('div', { className: ce.loadingSpinner }),
                      p.jsx('p', { children: '正在加载事件数据...' }),
                    ],
                  })
                : 0 === t.length
                  ? p.jsxs('div', {
                      className: ce.emptyState,
                      children: [
                        p.jsx('div', {
                          className: ce.emptyIcon,
                          children: '📄',
                        }),
                        p.jsx('p', { children: '暂无事件数据' }),
                        p.jsx('span', { children: U }),
                      ],
                    })
                  : t.map(e => {
                      const t = d || r.includes(e.id),
                        { icon: a, title: n, actionType: s } = b(e)
                      return p.jsxs(
                        'div',
                        {
                          className: `${ce.eventRow} ${t ? ce.selected : ''}`,
                          children: [
                            p.jsx('div', {
                              className: `${ce.cell} ${ce.checkboxCell}`,
                              children: p.jsxs('label', {
                                className: ce.checkboxContainer,
                                children: [
                                  p.jsx('input', {
                                    type: 'checkbox',
                                    checked: t,
                                    onChange: () => x(e.id),
                                    title: t ? '取消选择' : '选择此事件',
                                  }),
                                  p.jsx('span', { className: ce.checkmark }),
                                ],
                              }),
                            }),
                            p.jsxs('div', {
                              className: `${ce.cell} ${ce.contentCell}`,
                              children: [
                                p.jsx('div', {
                                  className: ce.eventIcon,
                                  children: a,
                                }),
                                p.jsxs('div', {
                                  className: ce.eventContent,
                                  children: [
                                    p.jsx('div', {
                                      className: ce.eventTitle,
                                      children: n,
                                    }),
                                    p.jsx('div', {
                                      className: ce.eventDescription,
                                      children: j(e),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            p.jsx('div', {
                              className: `${ce.cell} ${ce.actionCell}`,
                              children: p.jsx('span', {
                                className: ce.actionTag,
                                children: s,
                              }),
                            }),
                            p.jsx('div', {
                              className: `${ce.cell} ${ce.timeCell}`,
                              children: p.jsx('span', {
                                className: ce.eventTime,
                                children: g(e.created_at),
                              }),
                            }),
                            p.jsx('div', {
                              className: `${ce.cell} ${ce.detailCell}`,
                              children: p.jsx('button', {
                                className: ce.detailBtn,
                                onClick: () => _(e),
                                title: '查看详情',
                                children: p.jsx('span', {
                                  className: ce.detailIcon,
                                  children: '🔍',
                                }),
                              }),
                            }),
                          ],
                        },
                        e.id,
                      )
                    }),
            }),
            p.jsx('div', {
              className: ce.eventsListFooter,
              children: p.jsx(Y, {
                current: i.page,
                pageSize: i.pageSize,
                total: a,
                onChange: e => o({ ...i, page: e }),
                showSizeChanger: !0,
                onShowSizeChange: (e, t) =>
                  o({ page: e, pageSize: t, total: a }),
              }),
            }),
          ],
        })
      },
    )
  class _e {
    constructor(e, t) {
      __publicField(this, 'baseUrl'),
        __publicField(this, 'token'),
        __publicField(this, 'currentUser', null),
        (this.baseUrl = e.replace(/\/$/, '')),
        (this.token = t)
    }
    async request(e, t = {}) {
      const a = `${this.baseUrl}${e}`,
        n = {
          method: t.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            'PRIVATE-TOKEN': this.token,
          },
          timeout: j.REQUEST_TIMEOUT,
          body: t.body,
        },
        s = await x(a, n)
      if (!s.ok) {
        let e
        try {
          e = await s.text()
        } catch {
          e = s.statusText
        }
        const t =
          {
            401: 'GitLab认证失败，请检查Token是否有效',
            403: 'GitLab访问权限不足，请检查Token权限',
            404: 'GitLab资源不存在，请检查URL或项目权限',
            429: 'GitLab API请求频率过高，请稍后重试',
            500: 'GitLab服务器错误，请稍后重试',
            502: 'GitLab服务器错误，请稍后重试',
            503: 'GitLab服务器错误，请稍后重试',
            504: 'GitLab服务器错误，请稍后重试',
          }[s.status] ||
          e ||
          s.statusText
        throw I.createApiError(s.status, t, 'GitLab API')
      }
      return s.json()
    }
    /**
     * 验证Token格式
     */ validateToken() {
      if (!this.token) throw new Error('GitLab Token为空')
      if ((this.token.startsWith('glpat-'), this.token.length < 20))
        throw new Error('GitLab Token长度太短')
      return !0
    }
    /**
     * 获取当前用户信息
     */ async getCurrentUser() {
      if (this.currentUser) return this.currentUser
      if (!this.validateToken())
        throw I.createResponseError('Token格式无效', 'GitLab API')
      const e = await this.request('/user')
      return (this.currentUser = e), e
    }
    /**
     * 初始化GitLab服务
     */ async init() {
      try {
        await this.getCurrentUser()
      } catch (e) {
        if (e instanceof Error) {
          if (e.message.includes('401'))
            throw new Error('GitLab Token无效或已过期，请检查Token是否正确')
          if (e.message.includes('403'))
            throw new Error('GitLab Token权限不足，请检查Token权限设置')
          if (e.message.includes('404'))
            throw new Error('GitLab URL无效，请检查GitLab服务器地址是否正确')
          if (e.message.includes('timeout'))
            throw new Error('GitLab服务器连接超时，请检查网络连接或稍后重试')
        }
        throw new Error('GitLab服务初始化失败，请检查GitLab URL和Token是否正确')
      }
    }
    /**
     * 获取项目列表（支持搜索和排序）
     */ async getProjects(e = {}) {
      const t = new URLSearchParams(
          Object.entries(e)
            .filter(([, e]) => void 0 !== e)
            .reduce((e, [t, a]) => ({ ...e, [t]: String(a) }), {}),
        ).toString(),
        a = t ? `/projects?${t}` : '/projects'
      return this.request(a)
    }
    /**
     * 获取项目列表并返回总数信息
     * @param options 筛选和分页选项
     * @returns 包含项目数据和总数的对象
     */ async getProjectsWithTotal(e = {}) {
      const t = new URLSearchParams(
          Object.entries(e)
            .filter(([, e]) => void 0 !== e)
            .reduce((e, [t, a]) => ({ ...e, [t]: String(a) }), {}),
        ).toString(),
        a = t ? `/projects?${t}` : '/projects',
        n = `${this.baseUrl}${a}`,
        s = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'PRIVATE-TOKEN': this.token,
          },
          timeout: j.REQUEST_TIMEOUT,
        },
        l = await x(n, s)
      if (!l.ok) {
        const e = await l.text()
        throw I.createApiError(l.status, e || l.statusText, 'GitLab API')
      }
      const i = await l.json()
      let o = 0,
        r = ''
      if (l.headers instanceof Headers)
        (r =
          l.headers.get('x-total') ||
          l.headers.get('X-Total') ||
          l.headers.get('x-total-count') ||
          l.headers.get('X-Total-Count') ||
          ''),
          (o = parseInt(r || '0', 10))
      else {
        if ('string' == typeof l.headers) {
          const e = l.headers.split('\n')
          for (const t of e) {
            const e = t.split(': ')
            if (2 === e.length) {
              const t = e[0].toLowerCase(),
                a = e[1]
              if ('x-total' === t || 'x-total-count' === t || 'x_total' === t) {
                r = a
                break
              }
            }
          }
        } else {
          const e = l.headers
          r =
            e['x-total'] ||
            e['X-Total'] ||
            e['x-total-count'] ||
            e['X-Total-Count'] ||
            e.x_total ||
            e.X_TOTAL ||
            ''
        }
        o = parseInt(r || '0', 10)
      }
      return !o && i.length > 0 && (o = i.length), { projects: i, total: o }
    }
    /**
     * 获取用户事件并返回总数信息
     * @param userId 用户ID
     * @param options 筛选和分页选项
     * @returns 包含事件数据和总数的对象
     */ async getUserEventsWithTotal(e, t = {}) {
      const a = new URLSearchParams()
      t.after && a.set('after', t.after),
        t.before && a.set('before', t.before),
        t.sort && a.set('sort', t.sort),
        t.page && a.set('page', t.page.toString()),
        t.per_page && a.set('per_page', t.per_page.toString()),
        t.action && t.action.forEach(e => a.append('action', e)),
        t.target_type && t.target_type.forEach(e => a.append('target_type', e))
      const n = `/users/${e}/events?${a.toString()}`,
        s = `${this.baseUrl}${n}`,
        l = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'PRIVATE-TOKEN': this.token,
          },
          timeout: j.REQUEST_TIMEOUT,
          signal: t.signal,
        },
        i = await x(s, l)
      if (!i.ok) {
        const e = await i.text()
        throw I.createApiError(i.status, e || i.statusText, 'GitLab API')
      }
      const o = await i.json()
      let r = 0,
        d = ''
      if (i.headers instanceof Headers)
        (d =
          i.headers.get('x-total') ||
          i.headers.get('X-Total') ||
          i.headers.get('x-total-count') ||
          i.headers.get('X-Total-Count') ||
          ''),
          (r = parseInt(d || '0', 10))
      else {
        if ('string' == typeof i.headers) {
          const e = i.headers.split('\n')
          for (const t of e) {
            const e = t.split(': ')
            if (2 === e.length) {
              const t = e[0].toLowerCase(),
                a = e[1]
              if ('x-total' === t || 'x-total-count' === t || 'x_total' === t) {
                d = a
                break
              }
            }
          }
        } else {
          const e = i.headers
          d =
            e['x-total'] ||
            e['X-Total'] ||
            e['x-total-count'] ||
            e['X-Total-Count'] ||
            e.x_total ||
            e.X_TOTAL ||
            ''
        }
        r = parseInt(d || '0', 10)
      }
      return !r && o.length > 0 && (r = o.length), { events: o, total: r }
    }
    /**
     * 获取项目事件并返回总数信息
     * @param projectId 项目ID
     * @param options 筛选和分页选项
     * @returns 包含事件数据和总数的对象
     */ async getProjectEventsWithTotal(e, t = {}) {
      const a = new URLSearchParams()
      t.after && a.set('after', t.after),
        t.before && a.set('before', t.before),
        t.sort && a.set('sort', t.sort),
        t.page && a.set('page', t.page.toString()),
        t.per_page && a.set('per_page', t.per_page.toString()),
        t.action && t.action.forEach(e => a.append('action', e)),
        t.target_type && t.target_type.forEach(e => a.append('target_type', e))
      const n = a.toString(),
        s = n ? `/projects/${e}/events?${n}` : `/projects/${e}/events`,
        l = `${this.baseUrl}${s}`,
        i = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'PRIVATE-TOKEN': this.token,
          },
          timeout: j.REQUEST_TIMEOUT,
          signal: t.signal,
        },
        o = await x(l, i)
      if (!o.ok) {
        const e = await o.text()
        throw I.createApiError(o.status, e || o.statusText, 'GitLab API')
      }
      const r = await o.json()
      let d = 0,
        c = ''
      if (o.headers instanceof Headers)
        (c =
          o.headers.get('x-total') ||
          o.headers.get('X-Total') ||
          o.headers.get('x-total-count') ||
          o.headers.get('X-Total-Count') ||
          ''),
          (d = parseInt(c || '0', 10))
      else {
        if ('string' == typeof o.headers) {
          const e = o.headers.split('\n')
          for (const t of e) {
            const e = t.split(': ')
            if (2 === e.length) {
              const t = e[0].toLowerCase(),
                a = e[1]
              if ('x-total' === t || 'x-total-count' === t || 'x_total' === t) {
                c = a
                break
              }
            }
          }
        } else {
          const e = o.headers
          c =
            e['x-total'] ||
            e['X-Total'] ||
            e['x-total-count'] ||
            e['X-Total-Count'] ||
            e.x_total ||
            e.X_TOTAL ||
            ''
        }
        d = parseInt(c || '0', 10)
      }
      return 0 === d && r.length > 0 && (d = r.length), { events: r, total: d }
    }
    /**
     * 获取缓存的用户信息
     */ getCachedUser() {
      return this.currentUser
    }
  }
  function me(e, t) {
    return new _e(e, t)
  }
  const pe = Object.freeze(
      Object.defineProperty(
        { __proto__: null, GitLabApiService: _e, createGitLabApiService: me },
        Symbol.toStringTag,
        { value: 'Module' },
      ),
    ),
    he = {
      projectSelector: 'index-module__project-selector__1-CU4',
      selectorTrigger: 'index-module__selector-trigger__p6K8D',
      open: 'index-module__open__eBdQd',
      disabled: 'index-module__disabled__wVRd6',
      projectName: 'index-module__project-name__zeNO2',
      projectPath: 'index-module__project-path__c0VnB',
      arrow: 'index-module__arrow__SO96I',
      down: 'index-module__down__fc2yF',
      up: 'index-module__up__X13CX',
      dropdown: 'index-module__dropdown__yr22p',
      searchSection: 'index-module__search-section__EHsZZ',
      filtersSection: 'index-module__filters-section__yQbV5',
      searchInput: 'index-module__search-input__G0qdM',
      searchIcon: 'index-module__search-icon__6sNjM',
      filterOptions: 'index-module__filter-options__DtiKx',
      filterOption: 'index-module__filter-option__-schj',
      sortOptions: 'index-module__sort-options__drMrx',
      projectList: 'index-module__project-list__wMLbm',
      loading: 'index-module__loading__Jo9tk',
      error: 'index-module__error__xjbeu',
      spinner: 'index-module__spinner__tkI8a',
      projectItem: 'index-module__project-item__UY9Nn',
      selected: 'index-module__selected__LX5fz',
      projectInfo: 'index-module__project-info__lH-Bx',
      projectDescription: 'index-module__project-description__lwCNx',
      starIcon: 'index-module__star-icon__KOGRH',
      checkIcon: 'index-module__check-icon__eEeX-',
      emptyState: 'index-module__empty-state__BkXac',
      emptyIcon: 'index-module__empty-icon__W0Opg',
      emptyText: 'index-module__empty-text__-QIhF',
      emptyHint: 'index-module__empty-hint__pdwSU',
      pagination: 'index-module__pagination__AFW-U',
      pageButton: 'index-module__page-button__dDr90',
      pageInfo: 'index-module__page-info__81boc',
      totalCount: 'index-module__total-count__ix0Nf',
    },
    xe = class e {
      constructor() {
        __publicField(this, 'cache', new Map()),
          __publicField(this, 'CACHE_DURATION', 3e5)
      }
      // 5分钟缓存
      static getInstance() {
        return e.instance || (e.instance = new e()), e.instance
      }
      getCacheKey(e, t, a, n, s) {
        return `${e}_${t}_${JSON.stringify(a)}_${n}_${s}`
      }
      get(e, t, a, n, s) {
        const l = this.getCacheKey(e, t, a, n, s),
          i = this.cache.get(l)
        return i && Date.now() - i.timestamp < this.CACHE_DURATION
          ? i
          : (this.cache.delete(l), null)
      }
      set(e, t, a, n, s, l, i) {
        const o = this.getCacheKey(e, t, a, n, s)
        this.cache.set(o, {
          projects: l,
          totalCount: i,
          timestamp: Date.now(),
          filters: a,
          sortBy: n,
          searchValue: s,
        })
      }
      clear() {
        this.cache.clear()
      }
      // 清理过期缓存
      cleanup() {
        const e = Date.now()
        for (const [t, a] of this.cache.entries())
          e - a.timestamp >= this.CACHE_DURATION && this.cache.delete(t)
      }
    }
  __publicField(xe, 'instance')
  let ge = xe
  const ve = ({
      gitlabService: t,
      selectedProjectId: a,
      onProjectSelect: n,
      isConfigValid: s,
      disabled: l = !1,
      autoLoad: i = !1,
    }) => {
      const { state: o } = G(),
        [r, d] = e.useState(!1),
        [c, u] = e.useState([]),
        [_, m] = e.useState(!1),
        [h, x] = e.useState(''),
        [g, v] = e.useState('last_activity_at'),
        [b, j] = e.useState({ starred: !1, membership: !0 }),
        [f, N] = e.useState(1),
        [y, C] = e.useState(0),
        [k, E] = e.useState(null),
        w = e.useRef(null),
        S = e.useRef(null),
        T = e.useRef(ge.getInstance()),
        I = e.useRef(null),
        M = e.useCallback(
          async (e, l) => {
            if (!s()) return
            const i = e || h || '',
              r = b,
              d = g,
              c = T.current.get(
                o.config.gitlabUrl,
                o.config.gitlabToken,
                r,
                d,
                i,
              )
            if (c && 1 === (l || f))
              return (
                u(c.projects),
                C(c.totalCount),
                void (!a && c.projects.length > 0 && n(c.projects[0].id))
              )
            m(!0), E(null)
            try {
              await t.init()
              const e = {
                  membership: r.membership || void 0,
                  starred: r.starred || void 0,
                  simple: !0,
                  order_by: d,
                  search: i || void 0,
                  page: l || f,
                  per_page: 20,
                },
                { projects: s, total: c } = await t.getProjectsWithTotal(e)
              1 === (l || f) &&
                T.current.set(
                  o.config.gitlabUrl,
                  o.config.gitlabToken,
                  r,
                  d,
                  i,
                  s,
                  c,
                ),
                u(s),
                C(c),
                !a && s.length > 0 && n(s[0].id)
            } catch (_) {
              E('获取项目列表失败'), u([]), C(0)
            } finally {
              m(!1)
            }
          },
          [s, t, b, g, h, f, a, n, o.config.gitlabUrl, o.config.gitlabToken],
        ),
        $ = e.useMemo(
          () => e => {
            I.current && clearTimeout(I.current),
              (I.current = setTimeout(() => {
                N(1), M(e, 1)
              }, 300))
          },
          [M],
        )
      e.useEffect(() => {
        r && M()
      }, [r, b, g, f, M]),
        e.useEffect(() => {
          i && s() && M()
        }, [i, s, M])
      const D = e.useCallback(
          e => {
            const t = e.target.value
            x(t), $(t)
          },
          [$],
        ),
        L = e.useCallback(e => {
          v(e), N(1)
        }, []),
        A = e.useCallback((e, t) => {
          j(a => ({ ...a, [e]: t })), N(1)
        }, []),
        P = e.useCallback(
          e => {
            n(e), d(!1)
          },
          [n],
        ),
        O = e.useCallback(e => {
          N(e)
        }, [])
      e.useEffect(() => {
        const e = e => {
          w.current && !w.current.contains(e.target) && d(!1)
        }
        return (
          document.addEventListener('mousedown', e),
          () => {
            document.removeEventListener('mousedown', e)
          }
        )
      }, []),
        e.useEffect(() => {
          r && S.current && S.current.focus()
        }, [r])
      const U = e.useMemo(() => c.find(e => e.id === a), [c, a]),
        R = Math.ceil(y / 20)
      return p.jsxs('div', {
        className: he.projectSelector,
        ref: w,
        children: [
          p.jsxs('div', {
            className: `${he.selectorTrigger} ${r ? he.open : ''} ${l ? he.disabled : ''}`,
            onClick: () => !l && d(!r),
            children: [
              p.jsx('span', {
                className: he.selectedText,
                children: U ? U.path_with_namespace : '请选择项目',
              }),
              p.jsx('span', {
                className: `${he.arrow} ${r ? he.up : he.down}`,
                children: '▼',
              }),
            ],
          }),
          r &&
            !l &&
            p.jsxs('div', {
              className: he.dropdown,
              children: [
                p.jsxs('div', {
                  className: he.searchSection,
                  children: [
                    p.jsxs('div', {
                      className: he.searchInput,
                      children: [
                        p.jsx('span', {
                          className: he.searchIcon,
                          children: '🔍',
                        }),
                        p.jsx('input', {
                          ref: S,
                          type: 'text',
                          placeholder: '搜索项目...',
                          value: h,
                          onChange: D,
                        }),
                      ],
                    }),
                    p.jsxs('div', {
                      className: he.filtersSection,
                      children: [
                        p.jsxs('div', {
                          className: he.filterOptions,
                          children: [
                            p.jsxs('label', {
                              className: he.filterOption,
                              children: [
                                p.jsx('input', {
                                  type: 'checkbox',
                                  checked: b.membership,
                                  onChange: e =>
                                    A('membership', e.target.checked),
                                }),
                                '我的项目',
                              ],
                            }),
                            p.jsxs('label', {
                              className: he.filterOption,
                              children: [
                                p.jsx('input', {
                                  type: 'checkbox',
                                  checked: b.starred,
                                  onChange: e => A('starred', e.target.checked),
                                }),
                                '已收藏',
                              ],
                            }),
                          ],
                        }),
                        p.jsxs('div', {
                          className: he.sortOptions,
                          children: [
                            p.jsx('label', { children: '排序：' }),
                            p.jsxs('select', {
                              value: g,
                              onChange: e => L(e.target.value),
                              children: [
                                p.jsx('option', {
                                  value: 'last_activity_at',
                                  children: '按活跃度排序',
                                }),
                                p.jsx('option', {
                                  value: 'name',
                                  children: '按名称排序',
                                }),
                                p.jsx('option', {
                                  value: 'created_at',
                                  children: '按创建时间排序',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                p.jsx('div', {
                  className: he.projectList,
                  children: _
                    ? p.jsxs('div', {
                        className: he.loading,
                        children: [
                          p.jsx('div', { className: he.spinner }),
                          '加载中...',
                        ],
                      })
                    : k
                      ? p.jsx('div', { className: he.error, children: k })
                      : 0 === c.length
                        ? p.jsxs('div', {
                            className: he.emptyState,
                            children: [
                              p.jsx('div', {
                                className: he.emptyIcon,
                                children: '📄',
                              }),
                              p.jsx('div', {
                                className: he.emptyText,
                                children: '暂无项目',
                              }),
                              p.jsx('div', {
                                className: he.emptyHint,
                                children: '请检查筛选条件或搜索关键词',
                              }),
                            ],
                          })
                        : c.map(e =>
                            p.jsxs(
                              'div',
                              {
                                className: `${he.projectItem} ${e.id === a ? he.selected : ''}`,
                                onClick: () => P(e.id),
                                children: [
                                  p.jsxs('div', {
                                    className: he.projectInfo,
                                    children: [
                                      p.jsx('div', {
                                        className: he.projectName,
                                        children: e.name,
                                      }),
                                      p.jsx('div', {
                                        className: he.projectPath,
                                        children: e.path_with_namespace,
                                      }),
                                      e.description &&
                                        p.jsx('div', {
                                          className: he.projectDescription,
                                          children: e.description,
                                        }),
                                    ],
                                  }),
                                  e.starred &&
                                    p.jsx('span', {
                                      className: he.starIcon,
                                      children: '⭐',
                                    }),
                                  e.id === a &&
                                    p.jsx('span', {
                                      className: he.checkIcon,
                                      children: '✓',
                                    }),
                                ],
                              },
                              e.id,
                            ),
                          ),
                }),
                R > 1 &&
                  p.jsxs('div', {
                    className: he.pagination,
                    children: [
                      p.jsx('button', {
                        className: he.pageButton,
                        disabled: f <= 1,
                        onClick: () => O(f - 1),
                        children: '上一页',
                      }),
                      p.jsxs('div', {
                        className: he.pageInfo,
                        children: [
                          p.jsxs('span', { children: [f, ' / ', R] }),
                          p.jsxs('div', {
                            className: he.totalCount,
                            children: ['共 ', y, ' 个项目'],
                          }),
                        ],
                      }),
                      p.jsx('button', {
                        className: he.pageButton,
                        disabled: f >= R,
                        onClick: () => O(f + 1),
                        children: '下一页',
                      }),
                    ],
                  }),
              ],
            }),
        ],
      })
    },
    be = 'index-module__changelogPanel__bsoH5',
    je = 'index-module__projectSelectorContainer__DVUJQ',
    fe = 'index-module__eventsListContainer__JlSig',
    Ne = 'gitlab-changelog-selected-project',
    ye = ({ onStateChange: t }) => {
      const { state: a, isConfigValid: n } = G(),
        {
          createRequest: s,
          isRequestCancelled: l,
          cleanupRequest: i,
          isAbortError: o,
        } = B(),
        r = e.useMemo(
          () => me(a.config.gitlabUrl, a.config.gitlabToken),
          [a.config.gitlabUrl, a.config.gitlabToken],
        ),
        [d, c] = e.useState(() => {
          const e = localStorage.getItem(Ne)
          return e ? parseInt(e, 10) : null
        }),
        [u, _] = e.useState([]),
        [m, h] = e.useState(0),
        [x, g] = e.useState(!1),
        [v, b] = e.useState({ field: 'created_at', order: 'desc' }),
        [j, f] = e.useState({ page: 1, pageSize: 20, total: 0 }),
        [N, y] = e.useState([]),
        C = e.useMemo(() => 1 === N.length && 0 === N[0] && m > 0, [N, m])
      e.useEffect(() => {
        t &&
          t({
            selectedEventIds: N,
            isAllEventsSelected: C,
            totalCount: m,
            events: u,
          })
      }, [N, C, m, u, t])
      const k = e.useCallback(e => {
          c(e),
            e
              ? localStorage.setItem(Ne, e.toString())
              : localStorage.removeItem(Ne),
            f(e => ({ ...e, page: 1 })),
            y([])
        }, []),
        E = e.useCallback(async () => {
          if (!n() || !d) return _([]), void h(0)
          const e = s()
          g(!0)
          try {
            await r.init()
            const t = {
                page: j.page,
                per_page: j.pageSize,
                sort: v.order,
                signal: e.signal,
              },
              { events: a, total: n } = await r.getProjectEventsWithTotal(d, t)
            if (l(e)) return
            _(a), y(e => (1 === e.length && 0 === e[0] ? e : [])), h(n)
          } catch (t) {
            if (o(t)) return
            _([]), h(0)
          } finally {
            l(e) || g(!1), i(e)
          }
        }, [n, r, d, j, v, s, l, o, i])
      e.useEffect(() => {
        E()
      }, [E])
      const w = e.useCallback(e => {
          b(e)
        }, []),
        S = e.useCallback(e => {
          f(e)
        }, [])
      return p.jsxs('div', {
        className: be,
        children: [
          p.jsx('div', {
            className: je,
            children: p.jsx(ve, {
              gitlabService: r,
              selectedProjectId: d,
              onProjectSelect: k,
              isConfigValid: n,
              autoLoad: !0,
            }),
          }),
          p.jsx('div', {
            className: fe,
            children: p.jsx(ue, {
              events: u,
              totalCount: m,
              loading: x,
              sortOptions: v,
              onSortChange: w,
              paginationOptions: j,
              onPaginationChange: S,
              selectedEventIds: N,
              onSelectionChange: (e, t) => {
                y(e), t && y([0])
              },
              isFullSelection: C,
              onEventSelect: e => {
                const t = N.includes(e)
                if (C && !t) {
                  const t = u.filter(t => t.id !== e).map(e => e.id)
                  y(t)
                } else {
                  if (C && t) return
                  y(a => (t ? a.filter(t => t !== e) : [...a, e]))
                }
              },
              onEventDetail: () => {},
              mode: 'changelog',
            }),
          }),
        ],
      })
    },
    Ce = {
      actionBtn: 'index-module__action-btn__To7Ms',
      versionBtn: 'index-module__version-btn__8d3di',
      hasUpdate: 'index-module__has-update__tNkZZ',
      icon: 'index-module__icon__EhhVu',
      text: 'index-module__text__4iX-h',
      notificationOverlay: 'index-module__notification-overlay__E4dh-',
      notification: 'index-module__notification__ckX1l',
      notificationHeader: 'index-module__notification-header__nJZ3Q',
      closeBtn: 'index-module__close-btn__9uULv',
      notificationBody: 'index-module__notification-body__nnab7',
      versionInfo: 'index-module__version-info__-pyIP',
      releaseNotes: 'index-module__release-notes__iU2jG',
      notesContent: 'index-module__notes-content__ZpxxA',
      notificationFooter: 'index-module__notification-footer__La-ia',
      laterBtn: 'index-module__later-btn__Q40Lc',
      updateBtn: 'index-module__update-btn__lD1V2',
    },
    ke = ({ currentVersion: a }) => {
      const [n, s] = e.useState(null),
        [l, i] = e.useState(!1),
        [o, r] = e.useState(!1),
        [d, c] = e.useState(!1),
        [u, _] = e.useState(null),
        [m, h] = e.useState(null),
        [g, v] = e.useState(!1),
        [b, j] = e.useState(new Set())
      e.useEffect(() => {
        try {
          const e = localStorage.getItem(
            'gitlab-weekly-report-dismissed-versions',
          )
          e && j(new Set(JSON.parse(e)))
        } catch (e) {}
      }, [])
      const f = e.useCallback((e, t) => {
          const a = e.split('.').map(Number),
            n = t.split('.').map(Number),
            s = Math.max(a.length, n.length)
          for (let l = 0; l < s; l++) {
            const e = a[l] || 0,
              t = n[l] || 0
            if (t > e) return !0
            if (t < e) return !1
          }
          return !1
        }, []),
        N = e.useCallback(
          async (e = !0) => {
            if (!l)
              if (g && n && o && e) (!e && b.has(n.version)) || c(!0)
              else {
                i(!0), h(null)
                try {
                  const t = new AbortController(),
                    n = setTimeout(() => t.abort(), 1e4),
                    l = Math.floor(Date.now() / 36e5),
                    i = 'undefined' != typeof GM_xmlhttpRequest,
                    o =
                      !1 && !i
                        ? '/api/github/imzusheng/tm_gitlabWeeklyReport/v2/package.json'
                        : 'https://raw.githubusercontent.com/imzusheng/tm_gitlabWeeklyReport/v2/package.json',
                    d = await x(`${o}?t=${l}`, {
                      method: 'GET',
                      headers: { Accept: 'application/json' },
                      signal: t.signal,
                      timeout: 1e4,
                    })
                  if ((clearTimeout(n), !d.ok))
                    throw new Error(`HTTP ${d.status}: ${d.statusText}`)
                  const u = await d.json(),
                    m = {
                      version: u.version,
                      downloadUrl:
                        'https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js',
                      releaseNotes: `版本 ${u.version} 已发布，请及时更新以获得最新功能和修复。`,
                    }
                  s(m), _(new Date()), v(!0)
                  const p = f(a, m.version)
                  r(p), p && ((!e && b.has(m.version)) || c(!0))
                } catch (t) {
                  const e = t instanceof Error ? t.message : '检查更新失败'
                  h(e)
                } finally {
                  i(!1)
                }
              }
          },
          [l, f, a, b, g, n, o],
        )
      e.useEffect(() => {
        const e = setTimeout(() => {
          N(!1)
        }, 1e3)
        return () => clearTimeout(e)
      }, [])
      const y = e.useCallback(async () => {
          ;(null == n ? void 0 : n.downloadUrl) &&
            (window.open(n.downloadUrl, '_blank'),
            c(!1),
            setTimeout(async () => {
              await N(!1)
              f(a, n.version)
            }, 1e3))
        }, [n, N, f, a]),
        C = e.useCallback(() => {
          j(new Set())
          try {
            localStorage.removeItem('gitlab-weekly-report-dismissed-versions')
          } catch (e) {}
        }, []),
        k = e.useCallback(() => {
          if ((c(!1), n)) {
            const t = new Set(b)
            t.add(n.version), j(t)
            try {
              localStorage.setItem(
                'gitlab-weekly-report-dismissed-versions',
                JSON.stringify(Array.from(t)),
              )
            } catch (e) {}
          }
        }, [n, b]),
        E = e.useCallback(
          e =>
            e.toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          [],
        ),
        w = e.useCallback(
          () =>
            l
              ? '检查中...'
              : m
                ? '检查失败'
                : o
                  ? '有更新'
                  : g && !o
                    ? '已是最新版本 🎉'
                    : '检查更新',
          [l, m, o, g],
        ),
        S = e.useCallback(
          () => (l ? '🔄' : m ? '⚠️' : o ? '🔴' : ''),
          [l, m, o],
        )
      e.useEffect(() => {}, [C])
      const T = e.useCallback(() => {
        const e = 'version-notification-root'
        let t = document.getElementById(e)
        return (
          t ||
            ((t = document.createElement('div')),
            (t.id = e),
            document.body.appendChild(t)),
          t
        )
      }, [])
      return (
        e.useEffect(
          () => () => {
            const e = document.getElementById('version-notification-root')
            e && 0 === e.children.length && document.body.removeChild(e)
          },
          [],
        ),
        p.jsxs(p.Fragment, {
          children: [
            p.jsxs('button', {
              className: `${Ce.actionBtn} ${Ce.versionBtn} ${l ? Ce.checking : ''} ${o ? Ce.hasUpdate : ''}`,
              onClick: () => N(!0),
              disabled: l,
              title: u
                ? `上次检查: ${E(u)}${m ? `\n错误: ${m}` : ''}`
                : '点击检查更新',
              children: [
                p.jsx('span', { className: Ce.icon, children: S() }),
                p.jsx('span', { className: Ce.text, children: w() }),
              ],
            }),
            d &&
              o &&
              n &&
              t.createPortal(
                p.jsx('div', {
                  className: Ce.notificationOverlay,
                  children: p.jsxs('div', {
                    className: Ce.notification,
                    children: [
                      p.jsxs('div', {
                        className: Ce.notificationHeader,
                        children: [
                          p.jsx('h3', { children: '发现新版本' }),
                          p.jsx('button', {
                            className: Ce.closeBtn,
                            onClick: k,
                            children: '×',
                          }),
                        ],
                      }),
                      p.jsxs('div', {
                        className: Ce.notificationBody,
                        children: [
                          p.jsxs('div', {
                            className: Ce.versionInfo,
                            children: [
                              p.jsxs('p', {
                                children: [
                                  p.jsx('strong', { children: '当前版本:' }),
                                  ' v',
                                  a,
                                ],
                              }),
                              p.jsxs('p', {
                                children: [
                                  p.jsx('strong', { children: '最新版本:' }),
                                  ' v',
                                  n.version,
                                ],
                              }),
                            ],
                          }),
                          n.releaseNotes &&
                            p.jsxs('div', {
                              className: Ce.releaseNotes,
                              children: [
                                p.jsx('h4', { children: '更新说明:' }),
                                p.jsx('div', {
                                  className: Ce.notesContent,
                                  children: n.releaseNotes,
                                }),
                              ],
                            }),
                        ],
                      }),
                      p.jsxs('div', {
                        className: Ce.notificationFooter,
                        children: [
                          p.jsx('button', {
                            className: Ce.laterBtn,
                            onClick: k,
                            children: '稍后更新',
                          }),
                          p.jsx('button', {
                            className: Ce.updateBtn,
                            onClick: y,
                            children: '立即更新',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                T(),
              ),
          ],
        })
      )
    },
    Ee = 'index-module__main-panel__82FLm',
    we = 'index-module__panel-header__kyx4p',
    Se = 'index-module__header-left__xT1T5',
    Te = 'index-module__header-right__7F8Bo',
    Ie = 'index-module__mode-toggle__9yafG',
    Me = 'index-module__toggle-track__82VKI',
    $e = 'index-module__toggle-slider__tkY4o',
    De = 'index-module__slide-right__qPOZu',
    Le = 'index-module__toggle-option__ZhXXU',
    Ae = 'index-module__active__Mr5KU',
    Pe = 'index-module__toggle-icon__AI6K7',
    Oe = 'index-module__toggle-label__1qZLz',
    Ue = 'index-module__divider__QXSgp',
    Re = 'index-module__action-buttons__xGRHl',
    Ge = 'index-module__action-btn__x4IAP',
    Be = 'index-module__btn-icon__ZaYHk',
    Fe = 'index-module__btn-label__tM2Rz',
    Ve = 'index-module__ai-btn__5kAV3',
    qe = 'index-module__config-incomplete__bLEHk',
    ze = 'index-module__config-badge__0znDE',
    He = 'index-module__changelog-section__afcqm',
    Ke = 'index-module__filter-section__gMBIz',
    Xe = 'index-module__events-section__gJwdk',
    Qe = ({
      appMode: t,
      events: a,
      totalCount: n,
      loading: s,
      filterConditions: l,
      sortOptions: i,
      paginationOptions: o,
      selectedEventIds: r,
      onModeChange: d,
      onFilterChange: c,
      onSortChange: u,
      onPaginationChange: _,
      onEventSelect: m,
      // onSelectAll, // 暂时不使用
      onSelectionChange: h,
      onEventDetail: x,
      onOpenSettings: g,
      onOpenAI: v,
      isAllEventsSelected: j = !1,
      onChangelogStateChange: f,
    }) => {
      const { state: N } = G(),
        y = e.useMemo(() => {
          const e = [
              'gitlabUrl',
              'gitlabToken',
              'deepseekApiKey',
              'defaultPrompt',
            ],
            t = e.filter(e => {
              const t = N.config[e]
              return 'string' == typeof t ? '' !== t.trim() : !!t
            }).length
          return {
            isValid: t === e.length,
            completedCount: t,
            totalCount: e.length,
          }
        }, [N.config])
      return p.jsxs('div', {
        className: Ee,
        children: [
          p.jsxs('div', {
            className: we,
            children: [
              p.jsx('div', {
                className: Se,
                children: p.jsx('div', {
                  className: Ie,
                  children: p.jsxs('div', {
                    className: Me,
                    children: [
                      p.jsx('div', {
                        className: `${$e} ${'changelog' === t ? De : ''}`,
                      }),
                      p.jsxs('button', {
                        className: `${Le} ${'events' === t ? Ae : ''}`,
                        onClick: () => d('events'),
                        children: [
                          p.jsx('span', { className: Pe, children: '📋' }),
                          p.jsx('span', { className: Oe, children: 'Events' }),
                        ],
                      }),
                      p.jsxs('button', {
                        className: `${Le} ${'changelog' === t ? Ae : ''}`,
                        onClick: () => d('changelog'),
                        children: [
                          p.jsx('span', { className: Pe, children: '📝' }),
                          p.jsx('span', {
                            className: Oe,
                            children: 'Changelog',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
              p.jsxs('div', {
                className: Te,
                children: [
                  p.jsx(ke, { currentVersion: b }),
                  p.jsx('div', { className: Ue }),
                  p.jsxs('div', {
                    className: Re,
                    children: [
                      p.jsxs('button', {
                        className: `${Ge} ${y.isValid ? '' : qe}`,
                        onClick: g,
                        title: y.isValid
                          ? '设置'
                          : `配置未完成 (${y.completedCount}/${y.totalCount})`,
                        children: [
                          p.jsx('span', {
                            className: Be,
                            children: p.jsxs('svg', {
                              viewBox: '0 0 24 24',
                              fill: 'none',
                              children: [
                                p.jsx('path', {
                                  d: 'M12 15a3 3 0 100-6 3 3 0 000 6z',
                                  stroke: 'currentColor',
                                  strokeWidth: '2',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                }),
                                p.jsx('path', {
                                  d: 'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
                                  stroke: 'currentColor',
                                  strokeWidth: '2',
                                  strokeLinecap: 'round',
                                  strokeLinejoin: 'round',
                                }),
                              ],
                            }),
                          }),
                          p.jsxs('span', {
                            className: Fe,
                            children: [
                              '设置',
                              !y.isValid &&
                                p.jsxs('span', {
                                  className: ze,
                                  children: [
                                    y.completedCount,
                                    '/',
                                    y.totalCount,
                                  ],
                                }),
                            ],
                          }),
                        ],
                      }),
                      p.jsxs('button', {
                        className: `${Ge} ${Ve}`,
                        onClick: v,
                        title:
                          'changelog' === t
                            ? w.changelog.title
                            : w['weekly-report'].title,
                        children: [
                          p.jsx('span', {
                            className: Be,
                            children: p.jsxs('svg', {
                              viewBox: '0 0 24 24',
                              fill: 'none',
                              children: [
                                p.jsx('path', {
                                  d: 'M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z',
                                  fill: 'currentColor',
                                }),
                                p.jsx('path', {
                                  d: 'M19 14L19.5 16.5L22 17L19.5 17.5L19 20L18.5 17.5L16 17L18.5 16.5L19 14Z',
                                  fill: 'currentColor',
                                }),
                                p.jsx('path', {
                                  d: 'M5 6L5.5 8.5L8 9L5.5 9.5L5 12L4.5 9.5L2 9L4.5 8.5L5 6Z',
                                  fill: 'currentColor',
                                }),
                              ],
                            }),
                          }),
                          p.jsx('span', {
                            className: Fe,
                            children:
                              'changelog' === t
                                ? w.changelog.buttonText
                                : w['weekly-report'].buttonText,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          'events' === t
            ? p.jsxs(p.Fragment, {
                children: [
                  p.jsx('div', {
                    className: Ke,
                    children: p.jsx(J, {
                      filterConditions: l,
                      onFilterChange: c,
                    }),
                  }),
                  p.jsx('div', {
                    className: Xe,
                    children: p.jsx(ue, {
                      events: a,
                      totalCount: n,
                      loading: s,
                      sortOptions: i,
                      onSortChange: u,
                      paginationOptions: o,
                      onPaginationChange: _,
                      selectedEventIds: r,
                      onSelectionChange: h,
                      isFullSelection: j,
                      onEventSelect: m,
                      onEventDetail: x,
                      mode: t,
                    }),
                  }),
                ],
              })
            : p.jsx('div', {
                className: He,
                children: p.jsx(ye, { onStateChange: f }),
              }),
        ],
      })
    },
    Ze = 'index-module__modal-mask__XYxyO',
    Je = 'index-module__modal-wrapper__bVZip',
    We = 'index-module__modal__QQS3u',
    Ye = 'index-module__modal-header__GdUjX',
    et = 'index-module__modal-title__cafB-',
    tt = 'index-module__modal-close__ZuUgf',
    at = 'index-module__modal-body__j5X3U',
    nt = 'index-module__modal-footer__3q-wn',
    st = ({
      visible: a,
      title: n,
      width: s = 520,
      maxHeight: l = window.innerHeight - 180,
      // 面板高度(100vh-120px)再减去60px上下边距
      children: i,
      footer: o,
      onClose: r,
      maskClosable: d = !0,
    }) => {
      if (
        (e.useEffect(() => {
          const e = e => {
            'Escape' === e.key && a && r()
          }
          return (
            a &&
              (document.addEventListener('keydown', e),
              (document.body.style.overflow = 'hidden')),
            () => {
              document.removeEventListener('keydown', e),
                (document.body.style.overflow = 'unset')
            }
          )
        }, [a, r]),
        e.useEffect(
          () => () => {
            const e = document.getElementById('gitlab-weekly-report-modal-root')
            e && 0 === e.children.length && document.body.removeChild(e)
          },
          [],
        ),
        !a)
      )
        return null
      const c = p.jsx('div', {
        id: 'gitlab-weekly-report-container',
        className: Ze,
        onClick: e => {
          e.target === e.currentTarget && d && r()
        },
        children: p.jsx('div', {
          className: Je,
          children: p.jsxs('div', {
            className: We,
            style: { width: s, maxHeight: l },
            children: [
              p.jsxs('div', {
                className: Ye,
                children: [
                  p.jsx('div', { className: et, children: n }),
                  p.jsx('button', {
                    className: tt,
                    onClick: r,
                    children: p.jsx('span', { children: '×' }),
                  }),
                ],
              }),
              p.jsx('div', { className: at, children: i }),
              o && p.jsx('div', { className: nt, children: o }),
            ],
          }),
        }),
      })
      return t.createPortal(
        c,
        (() => {
          let e = document.getElementById('gitlab-weekly-report-modal-root')
          return (
            e ||
              ((e = document.createElement('div')),
              (e.id = 'gitlab-weekly-report-modal-root'),
              document.body.appendChild(e)),
            e
          )
        })(),
      )
    },
    lt = 'index-module__config-status__0q8ZM',
    it = 'index-module__clickable__pZ86X',
    ot = 'index-module__compact__-QN-s',
    rt = 'index-module__compact-content__wSrCk',
    dt = 'index-module__status-icon__7jFiQ',
    ct = 'index-module__compact-text__7OyGG',
    ut = 'index-module__expand-button__NusWg',
    _t = 'index-module__expanded-content__Hih4c',
    mt = 'index-module__config-items__quryV',
    pt = 'index-module__compact-item__UCAOc',
    ht = 'index-module__item-label__24FVq',
    xt = 'index-module__item-icon__4yYRW',
    gt = 'index-module__valid__Xyroo',
    vt = 'index-module__invalid__Fn-hL',
    bt = 'index-module__status-header__AORn-',
    jt = 'index-module__status-title__6hAD6',
    ft = 'index-module__status-text__llRfw',
    Nt = 'index-module__progress-container__ofPka',
    yt = 'index-module__progress-bar__CFedX',
    Ct = 'index-module__progress-fill__w-23-',
    kt = 'index-module__complete__L0-gl',
    Et = 'index-module__progress-text__uoYK9',
    wt = 'index-module__config-item__m6pYF',
    St = 'index-module__item-info__BhIr5',
    Tt = 'index-module__item-status__3ppNU',
    It = [
      { key: 'gitlabUrl', label: 'GitLab', required: !0 },
      { key: 'gitlabToken', label: 'Token', required: !0 },
      { key: 'deepseekApiKey', label: 'API Key', required: !0 },
      { key: 'defaultPrompt', label: 'Prompt', required: !0 },
    ].filter(e => e.required),
    Mt = It.length,
    $t = ({
      config: t,
      className: a = '',
      showDetails: n = !0,
      onClick: s,
      compact: l = !1,
    }) => {
      const i = e.useMemo(() => {
          const e = It.map(e => {
              const a = t[e.key],
                n = 'string' == typeof a ? '' !== a.trim() : !!a
              return { ...e, isValid: n, value: n ? '已配置' : '未配置' }
            }),
            a = e.filter(e => e.isValid).length
          return {
            isValid: a === Mt,
            itemsStatus: e,
            completedCount: a,
            totalCount: Mt,
            progress: (a / Mt) * 100,
          }
        }, [t]),
        [o, r] = e.useState(!i.isValid)
      return l && i.isValid
        ? p.jsxs('div', {
            className: `${lt} ${ot} ${a} ${s ? it : ''}`,
            onClick: s,
            children: [
              p.jsxs('div', {
                className: rt,
                children: [
                  p.jsx('span', { className: dt, children: '✅' }),
                  p.jsx('span', { className: ct, children: '配置已完成' }),
                  n &&
                    p.jsx('button', {
                      className: ut,
                      onClick: e => {
                        e.stopPropagation(), r(!o)
                      },
                      children: o ? '收起' : '详情',
                    }),
                ],
              }),
              n &&
                o &&
                p.jsx('div', {
                  className: _t,
                  children: p.jsx('div', {
                    className: mt,
                    children: i.itemsStatus.map(e =>
                      p.jsxs(
                        'div',
                        {
                          className: `${wt} ${pt} ${e.isValid ? gt : vt}`,
                          children: [
                            p.jsx('span', { className: ht, children: e.label }),
                            p.jsx('span', {
                              className: xt,
                              children: e.isValid ? '✓' : '✗',
                            }),
                          ],
                        },
                        e.key,
                      ),
                    ),
                  }),
                }),
            ],
          })
        : p.jsxs('div', {
            className: `${lt} ${a} ${s ? it : ''}`,
            onClick: s,
            children: [
              p.jsxs('div', {
                className: bt,
                children: [
                  p.jsxs('div', {
                    className: jt,
                    children: [
                      p.jsx('span', {
                        className: dt,
                        children: i.isValid ? '✅' : '⚠️',
                      }),
                      p.jsxs('span', {
                        className: ft,
                        children: [
                          '配置状态 (',
                          i.completedCount,
                          '/',
                          i.totalCount,
                          ')',
                        ],
                      }),
                    ],
                  }),
                  p.jsxs('div', {
                    className: Nt,
                    children: [
                      p.jsx('div', {
                        className: yt,
                        children: p.jsx('div', {
                          className: `${Ct} ${i.isValid ? kt : ''}`,
                          style: { width: `${i.progress}%` },
                        }),
                      }),
                      p.jsxs('span', {
                        className: Et,
                        children: [Math.round(i.progress), '%'],
                      }),
                    ],
                  }),
                ],
              }),
              n &&
                p.jsx('div', {
                  className: mt,
                  children: i.itemsStatus.map(e =>
                    p.jsxs(
                      'div',
                      {
                        className: `${wt} ${e.isValid ? gt : vt}`,
                        children: [
                          p.jsxs('div', {
                            className: St,
                            children: [
                              p.jsx('span', {
                                className: ht,
                                children: e.label,
                              }),
                              p.jsx('span', {
                                className: Tt,
                                children: e.value,
                              }),
                            ],
                          }),
                          p.jsx('span', {
                            className: xt,
                            children: e.isValid ? '✓' : '✗',
                          }),
                        ],
                      },
                      e.key,
                    ),
                  ),
                }),
            ],
          })
    },
    Dt = 'index-module__settings-panel__UCg3H',
    Lt = 'index-module__settings-tabs__vPH-t',
    At = 'index-module__tab-button__FG9Nc',
    Pt = 'index-module__tab-icon__rBe-o',
    Ot = 'index-module__active__bsBC1',
    Ut = 'index-module__settings-content__TqQPH',
    Rt = 'index-module__tab-panel__Q2QUI',
    Gt = 'index-module__form-group__zKwiA',
    Bt = 'index-module__form-label__pwe7O',
    Ft = 'index-module__required__2vuyW',
    Vt = 'index-module__form-input__jGbRP',
    qt = 'index-module__form-select__jbXdq',
    zt = 'index-module__form-textarea__fAVMw',
    Ht = 'index-module__form-hint__F0dFQ',
    Kt = 'index-module__version-info__y0NZv',
    Xt = 'index-module__version-text__bx0HU',
    Qt = 'index-module__settings-footer__qA44X',
    Zt = 'index-module__footer-right__bslDg',
    Jt = 'index-module__btn-primary__ZzzFI',
    Wt = 'index-module__switch-container__5xk1J',
    Yt = 'index-module__switch-input__V-8fl',
    ea = 'index-module__switch-label__xrOeQ',
    ta = 'index-module__switch-slider__dG-6J',
    aa = 'index-module__btn-secondary__cRCpD',
    na = ({ isOpen: t, onClose: a, config: n, onSave: s, theme: l }) => {
      const [i, o] = e.useState(n),
        [r, d] = e.useState(l),
        [c, u] = e.useState('gitlab')
      e.useEffect(() => {
        o(n)
      }, [n]),
        e.useEffect(() => {
          d(l)
        }, [l]),
        e.useEffect(() => {
          t && (o(n), d(l))
        }, [t, n, l])
      const _ = (e, t) => {
        o(a => ({ ...a, [e]: t }))
      }
      return p.jsx(st, {
        visible: t,
        title: '系统设置',
        width: 600,
        onClose: a,
        footer: p.jsxs('div', {
          className: Qt,
          children: [
            p.jsx('button', {
              className: aa,
              onClick: () => {
                o(n), d(l)
              },
              children: '重置',
            }),
            p.jsxs('div', {
              className: Zt,
              children: [
                p.jsx('button', {
                  className: aa,
                  onClick: a,
                  children: '取消',
                }),
                p.jsx('button', {
                  className: Jt,
                  onClick: () => {
                    s(i, r), a()
                  },
                  disabled: !(
                    i.gitlabUrl.trim() &&
                    i.gitlabToken.trim() &&
                    i.deepseekApiKey.trim() &&
                    i.defaultPrompt.trim()
                  ),
                  children: '保存',
                }),
              ],
            }),
          ],
        }),
        children: p.jsxs('div', {
          className: Dt,
          children: [
            p.jsx($t, { config: i, showDetails: !0, compact: !0 }),
            p.jsxs('div', {
              className: Lt,
              children: [
                p.jsxs('button', {
                  className: `${At} ${'gitlab' === c ? Ot : ''}`,
                  onClick: () => u('gitlab'),
                  children: [
                    p.jsx('span', { className: Pt, children: '🦊' }),
                    'GitLab 配置',
                  ],
                }),
                p.jsxs('button', {
                  className: `${At} ${'deepseek' === c ? Ot : ''}`,
                  onClick: () => u('deepseek'),
                  children: [
                    p.jsx('span', { className: Pt, children: '🤖' }),
                    'DeepSeek 配置',
                  ],
                }),
                p.jsxs('button', {
                  className: `${At} ${'appearance' === c ? Ot : ''}`,
                  onClick: () => u('appearance'),
                  children: [
                    p.jsx('span', { className: Pt, children: '🎨' }),
                    '外观设置',
                  ],
                }),
              ],
            }),
            p.jsxs('div', {
              className: Ut,
              children: [
                'gitlab' === c &&
                  p.jsxs('div', {
                    className: Rt,
                    children: [
                      p.jsxs('div', {
                        className: Gt,
                        children: [
                          p.jsxs('label', {
                            className: Bt,
                            children: [
                              'GitLab 项目地址 ',
                              p.jsx('span', { className: Ft, children: '*' }),
                            ],
                          }),
                          p.jsx('input', {
                            type: 'text',
                            className: Vt,
                            placeholder: N,
                            value: i.gitlabUrl,
                            onChange: e => _('gitlabUrl', e.target.value),
                          }),
                          p.jsx('div', {
                            className: Ht,
                            children: '请输入完整的 GitLab 项目 URL',
                          }),
                        ],
                      }),
                      p.jsxs('div', {
                        className: Gt,
                        children: [
                          p.jsxs('label', {
                            className: Bt,
                            children: [
                              '个人访问令牌 ',
                              p.jsx('span', { className: Ft, children: '*' }),
                            ],
                          }),
                          p.jsx('input', {
                            type: 'text',
                            className: Vt,
                            placeholder: y,
                            value: i.gitlabToken,
                            onChange: e => _('gitlabToken', e.target.value),
                          }),
                          p.jsx('div', {
                            className: Ht,
                            children:
                              '在 GitLab 个人设置 → 访问令牌 中创建，需要 read_api 权限',
                          }),
                        ],
                      }),
                    ],
                  }),
                'deepseek' === c &&
                  p.jsxs('div', {
                    className: Rt,
                    children: [
                      p.jsxs('div', {
                        className: Gt,
                        children: [
                          p.jsxs('label', {
                            className: Bt,
                            children: [
                              'DeepSeek API Key ',
                              p.jsx('span', { className: Ft, children: '*' }),
                            ],
                          }),
                          p.jsx('input', {
                            type: 'text',
                            className: Vt,
                            placeholder: C,
                            value: i.deepseekApiKey,
                            onChange: e => _('deepseekApiKey', e.target.value),
                          }),
                          p.jsx('div', {
                            className: Ht,
                            children: '在 DeepSeek 平台获取 API Key',
                          }),
                        ],
                      }),
                      p.jsxs('div', {
                        className: Gt,
                        children: [
                          p.jsx('label', {
                            className: Bt,
                            children: '使用的模型',
                          }),
                          p.jsxs('select', {
                            className: qt,
                            value: i.model,
                            onChange: e => _('model', e.target.value),
                            children: [
                              p.jsx('option', {
                                value: 'deepseek-chat',
                                children: 'deepseek-chat',
                              }),
                              p.jsx('option', {
                                value: 'deepseek-coder',
                                children: 'deepseek-coder',
                              }),
                            ],
                          }),
                        ],
                      }),
                      p.jsxs('div', {
                        className: Gt,
                        children: [
                          p.jsx('label', {
                            className: Bt,
                            children: 'Token 数量限制',
                          }),
                          p.jsx('input', {
                            type: 'number',
                            className: Vt,
                            min: '1000',
                            max: '10000',
                            placeholder: '4000',
                            value: i.tokenLimit,
                            onChange: e =>
                              _('tokenLimit', parseInt(e.target.value)),
                          }),
                          p.jsx('div', {
                            className: Ht,
                            children: '单次生成的最大 Token 数量（1000-10000）',
                          }),
                        ],
                      }),
                      p.jsxs('div', {
                        className: Gt,
                        children: [
                          p.jsxs('label', {
                            className: Bt,
                            children: [
                              '默认提示词 ',
                              p.jsx('span', { className: Ft, children: '*' }),
                            ],
                          }),
                          p.jsx('textarea', {
                            className: zt,
                            rows: 6,
                            placeholder: k,
                            value: i.defaultPrompt,
                            onChange: e => _('defaultPrompt', e.target.value),
                          }),
                          p.jsx('div', {
                            className: Ht,
                            children: '用于生成周报的默认提示词模板',
                          }),
                        ],
                      }),
                    ],
                  }),
                'appearance' === c &&
                  p.jsxs('div', {
                    className: Rt,
                    children: [
                      p.jsxs('div', {
                        className: Gt,
                        children: [
                          p.jsx('label', {
                            className: Bt,
                            children: '主题模式',
                          }),
                          p.jsxs('select', {
                            className: qt,
                            value: r,
                            onChange: e => d(e.target.value),
                            children: [
                              p.jsx('option', {
                                value: 'system',
                                children: '🔄 跟随系统',
                              }),
                              p.jsx('option', {
                                value: 'light',
                                children: '☀️ 浅色模式',
                              }),
                              p.jsx('option', {
                                value: 'dark',
                                children: '🌙 深色模式',
                              }),
                            ],
                          }),
                          p.jsx('div', {
                            className: Ht,
                            children:
                              '选择应用的主题模式，跟随系统将根据系统设置自动切换',
                          }),
                        ],
                      }),
                      p.jsxs('div', {
                        className: Gt,
                        children: [
                          p.jsx('label', {
                            className: Bt,
                            children: '自动检查更新',
                          }),
                          p.jsxs('div', {
                            className: Wt,
                            children: [
                              p.jsx('input', {
                                type: 'checkbox',
                                id: 'autoCheckUpdate',
                                className: Yt,
                                checked: i.autoCheckUpdate ?? !0,
                                onChange: e =>
                                  _('autoCheckUpdate', e.target.checked),
                              }),
                              p.jsx('label', {
                                htmlFor: 'autoCheckUpdate',
                                className: ea,
                                children: p.jsx('span', { className: ta }),
                              }),
                            ],
                          }),
                          p.jsx('div', {
                            className: Ht,
                            children: '开启后将自动检查版本更新并提醒',
                          }),
                        ],
                      }),
                      p.jsxs('div', {
                        className: Gt,
                        children: [
                          p.jsx('label', {
                            className: Bt,
                            children: '检查更新间隔',
                          }),
                          p.jsxs('select', {
                            className: qt,
                            value: i.updateCheckInterval ?? 3e5,
                            onChange: e =>
                              _(
                                'updateCheckInterval',
                                parseInt(e.target.value),
                              ),
                            disabled: !(i.autoCheckUpdate ?? 1),
                            children: [
                              p.jsx('option', {
                                value: 6e4,
                                children: '1分钟',
                              }),
                              p.jsx('option', {
                                value: 3e5,
                                children: '5分钟',
                              }),
                              p.jsx('option', {
                                value: 6e5,
                                children: '10分钟',
                              }),
                              p.jsx('option', {
                                value: 18e5,
                                children: '30分钟',
                              }),
                              p.jsx('option', {
                                value: 36e5,
                                children: '1小时',
                              }),
                            ],
                          }),
                          p.jsx('div', {
                            className: Ht,
                            children: '设置自动检查版本更新的时间间隔',
                          }),
                        ],
                      }),
                    ],
                  }),
              ],
            }),
            p.jsx('div', {
              className: Kt,
              children: p.jsxs('span', { className: Xt, children: ['v', b] }),
            }),
          ],
        }),
      })
    },
    sa = {
      aiPanel: 'index-module__ai-panel__R0K19',
      dataOverview: 'index-module__data-overview__J-ZoM',
      overviewHeader: 'index-module__overview-header__ae0e8',
      overviewContent: 'index-module__overview-content__dhjh6',
      overviewItem: 'index-module__overview-item__20Ilu',
      overviewLabel: 'index-module__overview-label__k3QHX',
      overviewValue: 'index-module__overview-value__gbEnJ',
      ready: 'index-module__ready__f4MXX',
      waiting: 'index-module__waiting__orgl9',
      resultSection: 'index-module__result-section__esrDe',
      resultHeader: 'index-module__result-header__-sHRM',
      resultTitle: 'index-module__result-title__GYp3Q',
      titleIcon: 'index-module__title-icon__w1Z58',
      resultActions: 'index-module__result-actions__Lwz6b',
      actionBtn: 'index-module__action-btn__X81KS',
      btnIcon: 'index-module__btn-icon__bBkUh',
      resultContent: 'index-module__result-content__NBmXz',
      resultText: 'index-module__result-text__WX-aI',
      resultMeta: 'index-module__result-meta__zAR0J',
      metaLeft: 'index-module__meta-left__G7E6i',
      metaItem: 'index-module__meta-item__Mikx5',
      promptSection: 'index-module__prompt-section__Y1L-1',
      sectionHeader: 'index-module__section-header__WEXG-',
      headerActions: 'index-module__header-actions__phC5-',
      promptEditor: 'index-module__prompt-editor__N6csy',
      promptTextarea: 'index-module__prompt-textarea__ZeYSC',
      promptFooter: 'index-module__prompt-footer__NhJb8',
      charCount: 'index-module__char-count__qSePr',
      expanded: 'index-module__expanded__VY5Zd',
      loadingSection: 'index-module__loading-section__qmhp-',
      loadingSpinner: 'index-module__loading-spinner__FhbKe',
      loadingTips: 'index-module__loading-tips__TN0F6',
      emptyResult: 'index-module__empty-result__D1DxK',
      emptyIcon: 'index-module__empty-icon__RFmRa',
      emptyFeatures: 'index-module__empty-features__Y-XeR',
      featureItem: 'index-module__feature-item__zmC1K',
      featureIcon: 'index-module__feature-icon__aCith',
      fetchProgress: 'index-module__fetch-progress__u65Rg',
      progressHeader: 'index-module__progress-header__hilxF',
      progressBar: 'index-module__progress-bar__upGJZ',
      progressFill: 'index-module__progress-fill__qzGhB',
      progressTip: 'index-module__progress-tip__SZdKA',
      btnPrimary: 'index-module__btn-primary__NTwQw',
      regenerate: 'index-module__regenerate__MPpEF',
      btnText: 'index-module__btn-text__f3PZM',
    },
    la = e.memo(
      ({
        visible: t,
        config: a,
        taskType: n,
        onClose: s,
        onGenerate: l,
        isLoading: i,
        selectedEventsCount: o = 0,
        allEventsCount: r = 0,
        dateRange: d,
        onFetchAllEvents: c,
        isAllSelected: u = !1,
      }) => {
        const _ = e.useMemo(() => w[n], [n]),
          [m, h] = e.useState(_.defaultPrompt),
          [x, g] = e.useState(!1),
          [v, b] = e.useState(!1),
          [j, f] = e.useState(!1),
          [N, y] = e.useState(0),
          [C, k] = e.useState(null),
          [E, S] = e.useState(!1),
          [T, I] = e.useState('')
        e.useEffect(() => {
          h(_.defaultPrompt)
        }, [_.defaultPrompt])
        const M = e.useCallback(async () => {
          if (c && !j) {
            f(!0), y(0), I('正在初始化数据获取...'), S(!0)
            try {
              let e
              const t = () => {
                y(t => {
                  if (t >= 85) return clearTimeout(e), t
                  const a = t + 8 * Math.random()
                  return (
                    I(
                      a < 30
                        ? '正在连接GitLab API...'
                        : a < 60
                          ? '正在分批获取事件数据...'
                          : '正在处理数据...',
                    ),
                    a
                  )
                }),
                  (e = setTimeout(t, 400))
              }
              t()
              const a = await c()
              clearTimeout(e),
                y(100),
                I(`数据获取完成！共获取 ${a.length} 条事件`),
                k(a),
                setTimeout(() => {
                  f(!1), I('')
                }, 1e3)
            } catch (e) {
              f(!1),
                y(0),
                I('数据获取失败，请稍后重试'),
                setTimeout(() => I(''), 3e3)
            }
          }
        }, [c, j])
        e.useEffect(() => {
          t && u && !E && c && M()
        }, [t, u, E, c, M])
        const $ = e.useMemo(
            () =>
              !(i || !m.trim()) && (u && o !== r ? !j && null !== C : o > 0),
            [i, m, u, o, r, j, C],
          ),
          D = e.useCallback(async () => {
            if (null == a ? void 0 : a.result)
              try {
                await navigator.clipboard.writeText(a.result),
                  b(!0),
                  setTimeout(() => b(!1), 2e3)
              } catch (e) {
                const n = document.createElement('textarea')
                ;(n.value = a.result), document.body.appendChild(n), n.select()
                try {
                  document.execCommand('copy'),
                    b(!0),
                    setTimeout(() => b(!1), 2e3)
                } catch (t) {}
                document.body.removeChild(n)
              }
          }, [null == a ? void 0 : a.result]),
          L = e.useCallback(() => {
            h(_.defaultPrompt)
          }, [_.defaultPrompt])
        return p.jsx(st, {
          visible: t,
          title: _.title,
          width: 800,
          onClose: s,
          maskClosable: !i,
          children: p.jsxs('div', {
            className: sa.aiPanel,
            children: [
              p.jsxs('div', {
                className: sa.dataOverview,
                children: [
                  p.jsx('div', {
                    className: sa.overviewHeader,
                    children: p.jsx('h4', { children: '📊 数据概览' }),
                  }),
                  p.jsxs('div', {
                    className: sa.overviewContent,
                    children: [
                      p.jsxs('div', {
                        className: sa.overviewItem,
                        children: [
                          p.jsx('span', {
                            className: sa.overviewLabel,
                            children: '已选择事件：',
                          }),
                          p.jsxs('span', {
                            className: sa.overviewValue,
                            children: [u && C ? C.length : o, ' ', '条'],
                          }),
                        ],
                      }),
                      d &&
                        p.jsxs('div', {
                          className: sa.overviewItem,
                          children: [
                            p.jsx('span', {
                              className: sa.overviewLabel,
                              children: '时间范围：',
                            }),
                            p.jsxs('span', {
                              className: sa.overviewValue,
                              children: [d.startDate, ' 至 ', d.endDate],
                            }),
                          ],
                        }),
                      p.jsxs('div', {
                        className: sa.overviewItem,
                        children: [
                          p.jsx('span', {
                            className: sa.overviewLabel,
                            children: '状态：',
                          }),
                          p.jsx('span', {
                            className: `${sa.overviewValue} ${o > 0 ? sa.ready : sa.waiting}`,
                            children: j
                              ? '🔄 获取数据中...'
                              : C
                                ? '✅ 数据已就绪'
                                : o > 0
                                  ? '✅ 数据就绪'
                                  : '⏳ 等待选择事件',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              j &&
                p.jsxs('div', {
                  className: sa.fetchProgress,
                  children: [
                    p.jsxs('div', {
                      className: sa.progressHeader,
                      children: [
                        p.jsx('span', { children: T }),
                        p.jsxs('span', { children: [Math.round(N), '%'] }),
                      ],
                    }),
                    p.jsx('div', {
                      className: sa.progressBar,
                      children: p.jsx('div', {
                        className: sa.progressFill,
                        style: { width: `${N}%` },
                      }),
                    }),
                    p.jsx('p', {
                      className: sa.progressTip,
                      children:
                        '正在分批获取事件数据（每批最多100条），请稍候...',
                    }),
                  ],
                }),
              p.jsxs('div', {
                className: sa.promptSection,
                children: [
                  p.jsxs('div', {
                    className: sa.sectionHeader,
                    children: [
                      p.jsx('h3', { children: '提示词' }),
                      p.jsxs('div', {
                        className: sa.headerActions,
                        children: [
                          p.jsx('button', {
                            className: sa.btnText,
                            onClick: () => g(!x),
                            children: x ? '收起' : '展开',
                          }),
                          p.jsx('button', {
                            className: sa.btnText,
                            onClick: L,
                            children: '重置',
                          }),
                        ],
                      }),
                    ],
                  }),
                  p.jsxs('div', {
                    className: `${sa.promptEditor} ${x ? sa.expanded : ''}`,
                    children: [
                      p.jsx('textarea', {
                        className: sa.promptTextarea,
                        value: m,
                        onChange: e => h(e.target.value),
                        placeholder: _.placeholder,
                        rows: x ? 15 : 6,
                        disabled: i,
                      }),
                      p.jsxs('div', {
                        className: sa.promptFooter,
                        children: [
                          p.jsxs('span', {
                            className: sa.charCount,
                            children: [m.length, ' 字符'],
                          }),
                          p.jsx('button', {
                            className: `${sa.btnPrimary} ${(null == a ? void 0 : a.result) ? sa.regenerate : ''}`,
                            onClick: () => {
                              $ && l(m)
                            },
                            disabled: i || !m.trim() || 0 === o,
                            children: i
                              ? '生成中...'
                              : (null == a ? void 0 : a.result)
                                ? _.regenerateButtonText
                                : _.generateButtonText,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              i &&
                p.jsxs('div', {
                  className: sa.loadingSection,
                  children: [
                    p.jsx('div', { className: sa.loadingSpinner }),
                    p.jsx('p', { children: _.loadingText }),
                    p.jsx('div', {
                      className: sa.loadingTips,
                      children: p.jsx('span', {
                        children: '💡 生成时间通常为 10-30 秒',
                      }),
                    }),
                  ],
                }),
              (null == a ? void 0 : a.result) &&
                p.jsxs('div', {
                  className: sa.resultSection,
                  children: [
                    p.jsxs('div', {
                      className: sa.resultHeader,
                      children: [
                        p.jsxs('h3', {
                          className: sa.resultTitle,
                          children: [
                            p.jsx('span', {
                              className: sa.titleIcon,
                              children: '✨',
                            }),
                            '生成结果',
                          ],
                        }),
                        p.jsx('div', {
                          className: sa.resultActions,
                          children: p.jsxs('button', {
                            className: `${sa.actionBtn} ${v ? sa.copied : ''}`,
                            onClick: D,
                            title: '一键复制',
                            disabled: v,
                            children: [
                              p.jsx('span', {
                                className: sa.btnIcon,
                                children: v ? '✅' : '📋',
                              }),
                              v ? '已复制' : '复制',
                            ],
                          }),
                        }),
                      ],
                    }),
                    p.jsx('div', {
                      className: sa.resultContent,
                      children: p.jsx('div', {
                        className: sa.resultText,
                        children: a.result,
                      }),
                    }),
                    p.jsx('div', {
                      className: sa.resultMeta,
                      children: p.jsxs('div', {
                        className: sa.metaLeft,
                        children: [
                          p.jsx('div', {
                            className: sa.metaItem,
                            children: p.jsxs('span', {
                              children: [a.result.split('\n').length, ' 行'],
                            }),
                          }),
                          p.jsx('div', {
                            className: sa.metaItem,
                            children: p.jsxs('span', {
                              children: [a.result.length, ' 字符'],
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              p.jsxs('div', {
                className: sa.emptyResult,
                children: [
                  p.jsx('div', { className: sa.emptyIcon, children: '🤖' }),
                  p.jsx('h3', { children: _.emptyTitle }),
                  p.jsx('p', { children: _.emptyDescription }),
                  p.jsxs('div', {
                    className: sa.emptyFeatures,
                    children: [
                      p.jsxs('div', {
                        className: sa.featureItem,
                        children: [
                          p.jsx('span', {
                            className: sa.featureIcon,
                            children: '📊',
                          }),
                          p.jsx('span', { children: '智能分析工作数据' }),
                        ],
                      }),
                      p.jsxs('div', {
                        className: sa.featureItem,
                        children: [
                          p.jsx('span', {
                            className: sa.featureIcon,
                            children: '📝',
                          }),
                          p.jsx('span', { children: '自动生成专业内容' }),
                        ],
                      }),
                      p.jsxs('div', {
                        className: sa.featureItem,
                        children: [
                          p.jsx('span', {
                            className: sa.featureIcon,
                            children: '🎯',
                          }),
                          p.jsx('span', { children: '突出重点信息' }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        })
      },
    ),
    ia = {
      'event-detail-modal-overlay':
        'EventDetailModal-module__event-detail-modal-overlay__kSKR4',
      eventDetailModalOverlay:
        'EventDetailModal-module__event-detail-modal-overlay__kSKR4',
      'fade-in': 'EventDetailModal-module__fade-in__gcFok',
      fadeIn: 'EventDetailModal-module__fade-in__gcFok',
      'event-detail-modal':
        'EventDetailModal-module__event-detail-modal__mBc4j',
      eventDetailModal: 'EventDetailModal-module__event-detail-modal__mBc4j',
      'modal-slide-in': 'EventDetailModal-module__modal-slide-in__wtFi2',
      modalSlideIn: 'EventDetailModal-module__modal-slide-in__wtFi2',
      'modal-header': 'EventDetailModal-module__modal-header__YHEvM',
      modalHeader: 'EventDetailModal-module__modal-header__YHEvM',
      'close-btn': 'EventDetailModal-module__close-btn__0KmQE',
      closeBtn: 'EventDetailModal-module__close-btn__0KmQE',
      'modal-content': 'EventDetailModal-module__modal-content__V4tyk',
      modalContent: 'EventDetailModal-module__modal-content__V4tyk',
      'detail-section': 'EventDetailModal-module__detail-section__09YJG',
      detailSection: 'EventDetailModal-module__detail-section__09YJG',
      compact: 'EventDetailModal-module__compact__GlU0K',
      'detail-grid': 'EventDetailModal-module__detail-grid__lP-Rl',
      detailGrid: 'EventDetailModal-module__detail-grid__lP-Rl',
      'detail-content': 'EventDetailModal-module__detail-content__b-wBI',
      detailContent: 'EventDetailModal-module__detail-content__b-wBI',
      'project-info': 'EventDetailModal-module__project-info__BF-ji',
      projectInfo: 'EventDetailModal-module__project-info__BF-ji',
      'push-info': 'EventDetailModal-module__push-info__CiBtf',
      pushInfo: 'EventDetailModal-module__push-info__CiBtf',
      'compact-content': 'EventDetailModal-module__compact-content__Zl-xn',
      compactContent: 'EventDetailModal-module__compact-content__Zl-xn',
      'compact-project': 'EventDetailModal-module__compact-project__W-Pxu',
      compactProject: 'EventDetailModal-module__compact-project__W-Pxu',
      'compact-author': 'EventDetailModal-module__compact-author__bJeyL',
      compactAuthor: 'EventDetailModal-module__compact-author__bJeyL',
      'detail-item': 'EventDetailModal-module__detail-item__gTUiL',
      detailItem: 'EventDetailModal-module__detail-item__gTUiL',
      label: 'EventDetailModal-module__label__q-vpJ',
      value: 'EventDetailModal-module__value__U4voT',
      'action-badge': 'EventDetailModal-module__action-badge__Bxghx',
      actionBadge: 'EventDetailModal-module__action-badge__Bxghx',
      'status-badge': 'EventDetailModal-module__status-badge__mP8CY',
      statusBadge: 'EventDetailModal-module__status-badge__mP8CY',
      'status-opened': 'EventDetailModal-module__status-opened__0o3-j',
      statusOpened: 'EventDetailModal-module__status-opened__0o3-j',
      'status-closed': 'EventDetailModal-module__status-closed__axB54',
      statusClosed: 'EventDetailModal-module__status-closed__axB54',
      'status-merged': 'EventDetailModal-module__status-merged__jrAZc',
      statusMerged: 'EventDetailModal-module__status-merged__jrAZc',
      'commit-hash': 'EventDetailModal-module__commit-hash__T82Gy',
      commitHash: 'EventDetailModal-module__commit-hash__T82Gy',
      labels: 'EventDetailModal-module__labels__FfkpP',
      'label-tag': 'EventDetailModal-module__label-tag__1eJTi',
      labelTag: 'EventDetailModal-module__label-tag__1eJTi',
      'author-info': 'EventDetailModal-module__author-info__QU8GM',
      authorInfo: 'EventDetailModal-module__author-info__QU8GM',
      'author-avatar': 'EventDetailModal-module__author-avatar__UktK4',
      authorAvatar: 'EventDetailModal-module__author-avatar__UktK4',
      'author-details': 'EventDetailModal-module__author-details__CSNcN',
      authorDetails: 'EventDetailModal-module__author-details__CSNcN',
      'author-name': 'EventDetailModal-module__author-name__Aop-h',
      authorName: 'EventDetailModal-module__author-name__Aop-h',
      'author-username': 'EventDetailModal-module__author-username__7f29y',
      authorUsername: 'EventDetailModal-module__author-username__7f29y',
      'author-link': 'EventDetailModal-module__author-link__qdJ8G',
      authorLink: 'EventDetailModal-module__author-link__qdJ8G',
      'note-info': 'EventDetailModal-module__note-info__xsh-2',
      noteInfo: 'EventDetailModal-module__note-info__xsh-2',
      'note-body': 'EventDetailModal-module__note-body__h5kYR',
      noteBody: 'EventDetailModal-module__note-body__h5kYR',
      'note-meta': 'EventDetailModal-module__note-meta__CSOAr',
      noteMeta: 'EventDetailModal-module__note-meta__CSOAr',
      'modal-footer': 'EventDetailModal-module__modal-footer__bMVTG',
      modalFooter: 'EventDetailModal-module__modal-footer__bMVTG',
      'source-link-btn': 'EventDetailModal-module__source-link-btn__lCMP7',
      sourceLinkBtn: 'EventDetailModal-module__source-link-btn__lCMP7',
      'close-modal-btn': 'EventDetailModal-module__close-modal-btn__u4I23',
      closeModalBtn: 'EventDetailModal-module__close-modal-btn__u4I23',
      app: 'EventDetailModal-module__app__GneYG',
      dark: 'EventDetailModal-module__dark__4O-jE',
    },
    oa = ({ event: e, visible: t, onClose: a }) => {
      if (!t || !e) return null
      const n = e =>
          new Date(e).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        s = () => {
          var t, a
          if (!e.project && !e.project_id) return ''
          const n = 'https://www.lejuhub.com'
          if (!e.project) return n
          const s = e.project.path_with_namespace
          if (!e.target_type || '' === e.target_type.trim()) return `${n}/${s}`
          switch (e.target_type) {
            case 'MergeRequest':
              return `${n}/${s}/-/merge_requests/${e.target_iid}`
            case 'Issue':
              return `${n}/${s}/-/issues/${e.target_iid}`
            case 'Note':
              return 'Issue' ===
                (null == (t = e.note) ? void 0 : t.noteable_type)
                ? `${n}/${s}/-/issues/${e.note.noteable_iid}`
                : 'MergeRequest' ===
                    (null == (a = e.note) ? void 0 : a.noteable_type)
                  ? `${n}/${s}/-/merge_requests/${e.note.noteable_iid}`
                  : `${n}/${s}`
            default:
              return `${n}/${s}`
          }
        }
      return p.jsx('div', {
        className: ia.eventDetailModalOverlay,
        onClick: a,
        children: p.jsxs('div', {
          className: ia.eventDetailModal,
          onClick: e => e.stopPropagation(),
          children: [
            p.jsxs('div', {
              className: ia.modalHeader,
              children: [
                p.jsx('h2', { children: '事件详情' }),
                p.jsx('button', {
                  className: ia.closeBtn,
                  onClick: a,
                  children: '×',
                }),
              ],
            }),
            p.jsxs('div', {
              className: ia.modalContent,
              children: [
                p.jsxs('div', {
                  className: `${ia.detailSection} ${ia.compact}`,
                  children: [
                    p.jsx('h3', { children: '基本信息' }),
                    p.jsxs('div', {
                      className: `${ia.detailGrid} ${ia.compactGrid}`,
                      children: [
                        p.jsxs('div', {
                          className: ia.detailItem,
                          children: [
                            p.jsx('span', {
                              className: ia.label,
                              children: 'ID:',
                            }),
                            p.jsx('span', {
                              className: ia.value,
                              children: e.id,
                            }),
                          ],
                        }),
                        p.jsxs('div', {
                          className: ia.detailItem,
                          children: [
                            p.jsx('span', {
                              className: ia.label,
                              children: '类型:',
                            }),
                            p.jsx('span', {
                              className: ia.value,
                              children: (e => {
                                if (!e || '' === e.trim()) return '未知类型'
                                return (
                                  {
                                    MergeRequest: 'Merge Request',
                                    Issue: 'Issue',
                                    Push: '代码推送',
                                    Note: '评论',
                                    DiscussionNote: '讨论-评论',
                                    DiffNote: '代码-评论',
                                    Commit: '提交',
                                  }[e] || e
                                )
                              })(e.target_type),
                            }),
                          ],
                        }),
                        p.jsxs('div', {
                          className: ia.detailItem,
                          children: [
                            p.jsx('span', {
                              className: ia.label,
                              children: '操作:',
                            }),
                            p.jsx('span', {
                              className: `${ia.value} ${ia.actionBadge}`,
                              children:
                                ((l = e.action_name),
                                {
                                  opened: '开启',
                                  closed: '关闭',
                                  merged: '合并',
                                  'pushed new': '推送新分支',
                                  'pushed to': '推送到分支',
                                  'commented on': '评论',
                                  joined: '加入',
                                }[l] || l),
                            }),
                          ],
                        }),
                        p.jsxs('div', {
                          className: ia.detailItem,
                          children: [
                            p.jsx('span', {
                              className: ia.label,
                              children: '时间:',
                            }),
                            p.jsx('span', {
                              className: ia.value,
                              children: n(e.created_at),
                            }),
                          ],
                        }),
                        e.state &&
                          p.jsxs('div', {
                            className: ia.detailItem,
                            children: [
                              p.jsx('span', {
                                className: ia.label,
                                children: '状态:',
                              }),
                              p.jsx('span', {
                                className: `${ia.value} ${ia.statusBadge} ${ia[`status-${e.state}`]}`,
                                children: e.state,
                              }),
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
                (e.title ||
                  e.target_title ||
                  (e.labels && e.labels.length > 0)) &&
                  p.jsxs('div', {
                    className: `${ia.detailSection} ${ia.compact}`,
                    children: [
                      p.jsx('h3', { children: '内容' }),
                      p.jsxs('div', {
                        className: `${ia.detailContent} ${ia.compactContent}`,
                        children: [
                          e.title &&
                            p.jsxs('div', {
                              className: ia.detailItem,
                              children: [
                                p.jsx('span', {
                                  className: ia.label,
                                  children: '标题:',
                                }),
                                p.jsx('span', {
                                  className: ia.value,
                                  children: e.title,
                                }),
                              ],
                            }),
                          e.target_title &&
                            p.jsxs('div', {
                              className: ia.detailItem,
                              children: [
                                p.jsx('span', {
                                  className: ia.label,
                                  children: '目标:',
                                }),
                                p.jsx('span', {
                                  className: ia.value,
                                  children: e.target_title,
                                }),
                              ],
                            }),
                          e.labels &&
                            e.labels.length > 0 &&
                            p.jsxs('div', {
                              className: ia.detailItem,
                              children: [
                                p.jsx('span', {
                                  className: ia.label,
                                  children: '标签:',
                                }),
                                p.jsx('div', {
                                  className: ia.labels,
                                  children: e.labels.map((e, t) =>
                                    p.jsx(
                                      'span',
                                      { className: ia.labelTag, children: e },
                                      t,
                                    ),
                                  ),
                                }),
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                e.author &&
                  p.jsxs('div', {
                    className: `${ia.detailSection} ${ia.compact}`,
                    children: [
                      p.jsx('h3', { children: '作者' }),
                      p.jsxs('div', {
                        className: `${ia.authorInfo} ${ia.compactAuthor}`,
                        children: [
                          e.author.avatar_url &&
                            p.jsx('img', {
                              src: `${e.author.avatar_url}?width=100`,
                              alt: e.author.name,
                              className: ia.authorAvatar,
                            }),
                          p.jsxs('div', {
                            className: ia.authorDetails,
                            children: [
                              p.jsx('div', {
                                className: ia.authorName,
                                children: e.author.name,
                              }),
                              p.jsxs('div', {
                                className: ia.authorUsername,
                                children: ['@', e.author.username],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                (e.project || e.project_id) &&
                  p.jsxs('div', {
                    className: `${ia.detailSection} ${ia.compact}`,
                    children: [
                      p.jsx('h3', { children: '项目' }),
                      p.jsx('div', {
                        className: `${ia.projectInfo} ${ia.compactProject}`,
                        children: e.project
                          ? p.jsxs(p.Fragment, {
                              children: [
                                p.jsxs('div', {
                                  className: ia.detailItem,
                                  children: [
                                    p.jsx('span', {
                                      className: ia.label,
                                      children: '名称:',
                                    }),
                                    p.jsx('span', {
                                      className: ia.value,
                                      children: e.project.name,
                                    }),
                                  ],
                                }),
                                p.jsxs('div', {
                                  className: ia.detailItem,
                                  children: [
                                    p.jsx('span', {
                                      className: ia.label,
                                      children: '路径:',
                                    }),
                                    p.jsx('span', {
                                      className: ia.value,
                                      children: e.project.path_with_namespace,
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : p.jsxs('div', {
                              className: ia.detailItem,
                              children: [
                                p.jsx('span', {
                                  className: ia.label,
                                  children: '项目ID:',
                                }),
                                p.jsx('span', {
                                  className: ia.value,
                                  children: e.project_id,
                                }),
                              ],
                            }),
                      }),
                    ],
                  }),
                e.push_data &&
                  p.jsxs('div', {
                    className: ia.detailSection,
                    children: [
                      p.jsx('h3', { children: '推送信息' }),
                      p.jsxs('div', {
                        className: ia.pushInfo,
                        children: [
                          p.jsxs('div', {
                            className: ia.detailItem,
                            children: [
                              p.jsx('span', {
                                className: ia.label,
                                children: '分支:',
                              }),
                              p.jsx('span', {
                                className: ia.value,
                                children: e.push_data.ref,
                              }),
                            ],
                          }),
                          p.jsxs('div', {
                            className: ia.detailItem,
                            children: [
                              p.jsx('span', {
                                className: ia.label,
                                children: '提交数量:',
                              }),
                              p.jsx('span', {
                                className: ia.value,
                                children: e.push_data.commit_count,
                              }),
                            ],
                          }),
                          p.jsxs('div', {
                            className: ia.detailItem,
                            children: [
                              p.jsx('span', {
                                className: ia.label,
                                children: '提交标题:',
                              }),
                              p.jsx('span', {
                                className: ia.value,
                                children: e.push_data.commit_title,
                              }),
                            ],
                          }),
                          p.jsxs('div', {
                            className: ia.detailItem,
                            children: [
                              p.jsx('span', {
                                className: ia.label,
                                children: '提交哈希:',
                              }),
                              p.jsx('span', {
                                className: `${ia.value} ${ia.commitHash}`,
                                children: e.push_data.commit_to,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                e.note &&
                  p.jsxs('div', {
                    className: ia.detailSection,
                    children: [
                      p.jsx('h3', { children: '评论信息' }),
                      p.jsxs('div', {
                        className: ia.noteInfo,
                        children: [
                          p.jsx('div', {
                            className: ia.noteBody,
                            children: e.note.body,
                          }),
                          p.jsxs('div', {
                            className: ia.noteMeta,
                            children: [
                              p.jsxs('span', {
                                children: ['创建时间: ', n(e.note.created_at)],
                              }),
                              e.note.updated_at !== e.note.created_at &&
                                p.jsxs('span', {
                                  children: [
                                    '更新时间: ',
                                    n(e.note.updated_at),
                                  ],
                                }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
              ],
            }),
            p.jsxs('div', {
              className: ia.modalFooter,
              children: [
                s() &&
                  p.jsx('a', {
                    href: s(),
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: ia.sourceLinkBtn,
                    children: '打开源页面',
                  }),
                p.jsx('button', {
                  className: ia.closeModalBtn,
                  onClick: a,
                  children: '关闭',
                }),
              ],
            }),
          ],
        }),
      })
      var l
    },
    ra = 'App-module__app__ZYOJd',
    da = 'App-module__web-mode__2hnFp',
    ca = 'App-module__userscript-mode__5Dbvp',
    ua = ({ isUserscript: t = !1 }) => {
      const {
          state: a,
          updateConfig: n,
          setTheme: l,
          setActivePanel: i,
          setAppMode: o,
          setProjects: r,
          updateFilterConditions: d,
          updateSortOptions: c,
          updatePaginationOptions: u,
          setEvents: _,
          setTotal: m,
          setAIGenerationConfig: h,
          setLoading: x,
          setError: g,
          isConfigValid: v,
          getTimeRange: b,
        } = G(),
        {
          createRequest: j,
          isRequestCancelled: f,
          cleanupRequest: N,
          isAbortError: y,
        } = B(),
        C = e.useMemo(
          () => me(a.config.gitlabUrl, a.config.gitlabToken),
          [a.config.gitlabUrl, a.config.gitlabToken],
        ),
        [k, E] = e.useState(null),
        [w, S] = e.useState(!1),
        [T, M] = e.useState([]),
        [$, D] = e.useState({
          selectedEventIds: [],
          isAllEventsSelected: !1,
          totalCount: 0,
          events: [],
        }),
        L = e.useMemo(
          () => ('events' === a.appMode ? T : $.selectedEventIds),
          [a.appMode, T, $.selectedEventIds],
        ),
        R = e.useCallback(
          e => {
            'events' === a.appMode && M(e)
          },
          [a.appMode],
        ),
        F = e.useMemo(
          () =>
            'system' === a.theme
              ? window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
              : a.theme,
          [a.theme],
        )
      e.useEffect(() => {
        if (
          ((document.body.className = document.body.className
            .replace(/\b(light|dark)\b/g, '')
            .trim()),
          document.body.classList.add(F),
          'system' === a.theme)
        ) {
          const e = window.matchMedia('(prefers-color-scheme: dark)'),
            t = () => {
              window.dispatchEvent(new Event('resize'))
            }
          return (
            e.addEventListener('change', t),
            () => {
              e.removeEventListener('change', t)
            }
          )
        }
      }, [a.theme, F])
      const V = e.useCallback(async () => {
        var e, t
        if (!v()) return void g(U)
        const n = j()
        x(!0), g(null)
        try {
          await C.init()
          const { startDate: s, endDate: l } = b(),
            i =
              (null == (e = a.filterConditions.targetType)
                ? void 0
                : e.length) > 0
                ? a.filterConditions.targetType
                : void 0,
            o =
              (null == (t = a.filterConditions.action) ? void 0 : t.length) > 0
                ? a.filterConditions.action
                : void 0,
            r = a.sortOptions.order || 'desc',
            d = await C.getCurrentUser(),
            c = {
              after: s,
              before: l,
              target_type: i,
              action: o,
              page: a.paginationOptions.page,
              per_page: a.paginationOptions.pageSize,
              sort: r,
              signal: n.signal,
            },
            { events: u, total: p } = await C.getUserEventsWithTotal(d.id, c)
          if (f(n)) return
          _(u), M(e => (1 === e.length && 0 === e[0] ? e : [])), m(p)
        } catch (s) {
          if (y(s)) return
          const e = I.formatErrorMessage(s)
          g(e), _([]), m(0)
        } finally {
          f(n) || x(!1), N(n)
        }
      }, [
        a.paginationOptions.page,
        a.paginationOptions.pageSize,
        a.sortOptions,
        a.filterConditions,
        b,
        _,
        m,
        x,
        g,
        v,
        C,
        j,
        f,
        y,
        N,
      ])
      e.useEffect(() => {
        v() && V()
      }, [v, V])
      const q = e.useCallback(() => {
          i('settings')
        }, [i]),
        z = e.useCallback(() => {
          i('main')
        }, [i]),
        H = e.useCallback(
          (e, t) => {
            n(e), l(t)
          },
          [n, l],
        ),
        K = e.useCallback(() => {
          v() ? i('ai') : g(A)
        }, [v, g, i]),
        X = e.useCallback(() => {
          i('main')
        }, [i]),
        Q = e.useCallback(async () => {
          if (!v()) throw new Error('配置不完整')
          const { createGitLabApiService: e } = await s(async () => {
              const { createGitLabApiService: e } =
                await Promise.resolve().then(() => pe)
              return { createGitLabApiService: e }
            }),
            t = e(a.config.gitlabUrl, a.config.gitlabToken)
          await t.init()
          let n = []
          const l = 100
          let i = 1,
            o = !0
          if ('events' === a.appMode) {
            const e = await t.getCurrentUser()
            for (; o; ) {
              const { events: s, total: r } = await t.getUserEventsWithTotal(
                e.id,
                {
                  per_page: l,
                  page: i,
                  after: b().startDate,
                  before: b().endDate,
                  sort: a.sortOptions.order,
                },
              )
              if (
                ((n = [...n, ...s]),
                (o = s.length === l && n.length < r),
                i++,
                i > 100)
              )
                break
            }
          } else if ('changelog' === a.appMode && a.selectedProjectId)
            for (; o; ) {
              const { events: e, total: s } = await t.getProjectEventsWithTotal(
                a.selectedProjectId,
                { per_page: l, page: i, sort: a.sortOptions.order },
              )
              if (
                ((n = [...n, ...e]),
                (o = e.length === l && n.length < s),
                i++,
                i > 100)
              )
                break
            }
          return n
        }, [
          v,
          a.config.gitlabUrl,
          a.config.gitlabToken,
          a.appMode,
          a.sortOptions.order,
          a.selectedProjectId,
          b,
        ]),
        Z = e.useCallback(
          e => {
            R(e ? [0] : [])
          },
          [R],
        ),
        J = e.useMemo(
          () =>
            'events' === a.appMode
              ? T.includes(-1) && a.totalCount > 0
              : $.isAllEventsSelected,
          [a.appMode, T, a.totalCount, $.isAllEventsSelected],
        ),
        W = e.useMemo(
          () =>
            'events' === a.appMode
              ? T.includes(-1)
                ? a.totalCount
                : T.filter(e => -1 !== e).length
              : $.isAllEventsSelected
                ? $.totalCount
                : $.selectedEventIds.length,
          [a.appMode, T, a.totalCount, $],
        ),
        Y = e.useCallback(
          e => {
            D(e)
          },
          [D],
        ),
        ee = e.useCallback(
          async e => {
            if (v())
              if (0 !== L.length) {
                x(!0), g(null)
                try {
                  let t
                  t = J
                    ? await Q()
                    : 'events' === a.appMode
                      ? a.events.filter(e => L.includes(e.id))
                      : $.events.filter(e => L.includes(e.id))
                  const n =
                      'changelog' === a.appMode ? 'changelog' : 'weekly-report',
                    l = t
                      .map(e => {
                        var t
                        return `${new Date(e.created_at).toLocaleDateString('zh-CN')} - ${e.action_name}: ${e.target_title || (null == (t = e.push_data) ? void 0 : t.commit_title) || '无标题'}`
                      })
                      .join('\n'),
                    { createDeepSeekApiService: i } = await s(async () => {
                      const { createDeepSeekApiService: e } =
                        await Promise.resolve().then(() => ga)
                      return { createDeepSeekApiService: e }
                    }),
                    o = i(a.config.deepseekApiKey),
                    r = await o.generateWeeklyReport(
                      l,
                      e,
                      a.config.model,
                      a.config.tokenLimit,
                    )
                  h({
                    taskType: n,
                    prompt: e,
                    tokensUsed: r.tokensUsed,
                    result: r.content,
                  }),
                    x(!1)
                } catch (t) {
                  const e = I.formatErrorMessage(t)
                  g(e), x(!1)
                }
              } else g(O)
            else g(P)
          },
          [
            v,
            L,
            J,
            Q,
            a.events,
            a.appMode,
            a.config.deepseekApiKey,
            a.config.model,
            a.config.tokenLimit,
            $.events,
            g,
            x,
            h,
          ],
        ),
        te = e.useCallback(
          e => {
            u(e)
          },
          [u],
        ),
        ae = e.useCallback(
          e => {
            d(e)
          },
          [d],
        ),
        ne = e.useCallback(
          e => {
            c(e)
          },
          [c],
        ),
        se = e.useCallback(
          (e, t) => {
            R(t ? [-1] : e)
          },
          [R],
        ),
        le = e.useCallback(
          e => {
            const t = J || T.includes(e)
            if (J) {
              if (t) {
                const t = a.events.filter(t => t.id !== e).map(e => e.id)
                R(t)
              }
            } else R(a => (t ? a.filter(t => t !== e) : [...a, e]))
          },
          [J, T, a.events, R],
        ),
        ie = e.useCallback(e => {
          E(e), S(!0)
        }, []),
        oe = e.useCallback(() => {
          S(!1), E(null)
        }, []),
        re = e.useCallback(async () => {
          if (v()) {
            x(!0), g(null)
            try {
              await C.init()
              const e = await C.getProjects({
                membership: !0,
                per_page: 100,
                starred: !1,
                simple: !0,
                order_by: 'last_activity_at',
                search: '',
              })
              r(e)
            } catch (e) {
              const t = I.formatErrorMessage(e)
              g(t), r([])
            } finally {
              x(!1)
            }
          } else g(U)
        }, [C, v, r, x, g]),
        de = e.useCallback(
          async e => {
            o(e), 'changelog' === e ? await re() : v() && V()
          },
          [o, re, v, V],
        )
      return p.jsxs('div', {
        id: 'gitlab-weekly-report-app',
        className: `${ra} ${t ? ca : da}`,
        children: [
          p.jsx(Qe, {
            appMode: a.appMode,
            events: a.events,
            totalCount: a.totalCount,
            loading: a.isLoading,
            filterConditions: a.filterConditions,
            sortOptions: a.sortOptions,
            paginationOptions: a.paginationOptions,
            selectedEventIds: L,
            onModeChange: de,
            onFilterChange: ae,
            onSortChange: ne,
            onPaginationChange: te,
            onEventSelect: le,
            onSelectAll: Z,
            onSelectionChange: se,
            onEventDetail: ie,
            onOpenSettings: q,
            onOpenAI: K,
            isAllEventsSelected: J,
            onChangelogStateChange: Y,
          }),
          p.jsx(oa, { event: k, visible: w, onClose: oe }),
          p.jsx(na, {
            isOpen: 'settings' === a.activePanel,
            config: a.config,
            theme: a.theme,
            onClose: z,
            onSave: H,
          }),
          'ai' === a.activePanel &&
            p.jsx(la, {
              visible: 'ai' === a.activePanel,
              config: a.aiGenerationConfig,
              taskType:
                'changelog' === a.appMode ? 'changelog' : 'weekly-report',
              onClose: X,
              onGenerate: ee,
              isLoading: a.isLoading,
              selectedEventsCount: W,
              allEventsCount:
                'events' === a.appMode ? a.totalCount : $.totalCount,
              dateRange: b(),
              onFetchAllEvents: Q,
              isAllSelected: J,
            }),
        ],
      })
    },
    _a = () => {
      if (document.getElementById('gitlab-weekly-report-userscript-container'))
        return
      const t = document.createElement('div')
      ;(t.id = 'gitlab-weekly-report-trigger'),
        (t.innerHTML = '📊'),
        (t.style.cssText =
          "\n    position: fixed;\n    bottom: 110px;\n    right: 50px;\n    width: 50px;\n    height: 50px;\n    background: var(--color-primary);\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    z-index: 999998;\n    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);\n    font-size: 20px;\n    transition: all 0.3s ease;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;\n  ")
      const n = document.createElement('div')
      ;(n.id = 'gitlab-weekly-report-userscript-container'),
        (n.style.cssText =
          "\n    position: fixed;\n    top: 60px;\n    left: 60px;\n    right: 60px;\n    bottom: 60px;\n    z-index: 999999;\n    background: white;\n    border-radius: 12px;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;\n    display: none;\n    overflow: hidden;\n    isolation: isolate;\n  ")
      const s = document.createElement('div')
      ;(s.id = 'gitlab-weekly-report-overlay'),
        (s.style.cssText =
          '\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.5);\n    z-index: 999997;\n    display: none;\n  ')
      const l = () => {
        'none' !== n.style.display
          ? ((n.style.display = 'none'),
            (s.style.display = 'none'),
            (t.style.transform = 'scale(1)'),
            s.removeEventListener('click', l))
          : ((n.style.display = 'block'),
            (s.style.display = 'block'),
            (t.style.transform = 'scale(0.9)'),
            s.addEventListener('click', l))
      }
      t.addEventListener('mouseenter', () => {
        'none' === n.style.display &&
          ((t.style.transform = 'scale(1.1)'),
          (t.style.boxShadow = '0 6px 16px rgba(25, 118, 210, 0.4)'))
      }),
        t.addEventListener('mouseleave', () => {
          'none' === n.style.display &&
            ((t.style.transform = 'scale(1)'),
            (t.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)'))
        }),
        t.addEventListener('click', l),
        document.body.appendChild(s),
        document.body.appendChild(n),
        document.body.appendChild(t)
      a.createRoot(n).render(e.createElement(ua, { isUserscript: !0 }))
    },
    ma = () => {
      ;(window.location.hostname.includes('gitlab') ||
        window.location.pathname.includes('gitlab') ||
        null !== document.querySelector('meta[content*="GitLab"]') ||
        null !== document.querySelector('[data-page*="gitlab"]')) &&
        ('loading' === document.readyState
          ? document.addEventListener('DOMContentLoaded', _a)
          : _a())
    }
  ma()
  let pa = location.href,
    ha = new MutationObserver(() => {
      const e = location.href
      e !== pa &&
        ((pa = e),
        (() => {
          const e = document.getElementById('gitlab-weekly-report-trigger'),
            t = document.getElementById('gitlab-weekly-report-overlay'),
            a = document.getElementById(
              'gitlab-weekly-report-userscript-container',
            )
          if (a) {
            const e = a._reactRootContainer
            e && e.unmount()
          }
          e && e.remove(),
            t && t.remove(),
            a && a.remove(),
            ha && (ha.disconnect(), (ha = null))
        })(),
        setTimeout(ma, 1e3))
    })
  ha.observe(document, { subtree: !0, childList: !0 })
  class xa {
    constructor(e) {
      __publicField(this, 'apiKey'),
        __publicField(this, 'baseUrl'),
        (this.apiKey = e),
        (this.baseUrl = j.DEEPSEEK_BASE_URL)
    }
    async chatRequest(e, t, a) {
      const n = await x(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: t,
          messages: e,
          max_tokens: a,
          temperature: 0.7,
        }),
        timeout: j.REQUEST_TIMEOUT,
      })
      if (!n.ok) throw I.createApiError(n.status, n.statusText, 'DeepSeek API')
      const s = await n.json()
      if (!s.choices || 0 === s.choices.length)
        throw I.createResponseError('空的响应', 'DeepSeek API')
      return s
    }
    /**
     * 生成聊天回复
     */ async generateChat(e, t = 'deepseek-chat', a = 4e3) {
      return (await this.chatRequest(e, t, a)).choices[0].message.content
    }
    /**
     * 生成周报
     */ async generateWeeklyReport(e, t, a = 'deepseek-chat', n = 4e3) {
      var s
      const l = [
          { role: 'system', content: t },
          {
            role: 'user',
            content: `以下是GitLab事件数据：\n\n${e}\n\n请根据这些数据生成工作周报。`,
          },
        ],
        i = await this.chatRequest(l, a, n)
      return {
        content: i.choices[0].message.content,
        tokensUsed: (null == (s = i.usage) ? void 0 : s.total_tokens) || 0,
      }
    }
    /**
     * 验证API Key有效性
     */ async validateApiKey() {
      try {
        return (
          await this.generateChat(
            [{ role: 'user', content: 'Hello' }],
            'deepseek-chat',
            10,
          ),
          !0
        )
      } catch (e) {
        return !1
      }
    }
  }
  const ga = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        DeepSeekApiService: xa,
        createDeepSeekApiService: function (e) {
          return new xa(e)
        },
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
})(React, ReactDOM)
