// ==UserScript==
// @name         GitLab 周报生成器
// @namespace    https://github.com/imzusheng/tm_gitlabWeeklyReport
// @version      1.5.2
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
          '.index-module__main-panel__82FLm{--panel-padding: 16px;height:100%;display:flex;flex-direction:column;background:var(--bg-primary);border-radius:12px;overflow:hidden;box-shadow:var(--shadow-md);gap:16px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p{display:flex;align-items:center;justify-content:space-between;padding:var(--panel-padding)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5{display:flex;align-items:flex-end;gap:12px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 h1{margin:0;font-size:28px;font-weight:700;color:var(--text-primary);letter-spacing:-.02em;line-height:1}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__event-count__N-oT3{font-size:14px;color:var(--text-secondary);font-weight:500;background:transparent}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__config-status__CgP3u .index-module__status-indicator__-GO2B{display:flex;align-items:center;gap:4px;font-size:12px;font-weight:500;padding:4px 8px;border-radius:6px;white-space:nowrap}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__config-status__CgP3u .index-module__status-indicator__-GO2B .index-module__status-icon__fpfqN{font-size:10px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__config-status__CgP3u .index-module__status-indicator__-GO2B .index-module__user-avatar__c9pJN{width:16px;height:16px;border-radius:50%;object-fit:cover;border:1px solid var(--color-success-light)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__config-status__CgP3u .index-module__status-indicator__-GO2B.index-module__config-valid__3xaIL{background:var(--color-success-light);color:var(--color-success)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 .index-module__config-status__CgP3u .index-module__status-indicator__-GO2B.index-module__config-invalid__-eGA8{background:var(--color-error-light);color:var(--color-error)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo{display:flex;align-items:center;gap:8px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-btn__x4IAP{display:flex;align-items:center;gap:6px;padding:8px 12px;background:var(--color-primary-lighter);color:var(--color-primary);border:none;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s ease;white-space:nowrap;outline:none}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-btn__x4IAP:hover{background:var(--color-primary-light);transform:translateY(-1px)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-btn__x4IAP .index-module__icon__tX8wX{font-size:14px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-btn__x4IAP.index-module__settings-btn__vsg3u{background:var(--color-info-light);color:var(--color-info)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-btn__x4IAP.index-module__settings-btn__vsg3u:hover{background:#5856d626}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3{background:var(--color-success-light);color:var(--color-success)}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-btn__x4IAP.index-module__ai-btn__5kAV3:hover{background:#34c75926}.index-module__main-panel__82FLm .index-module__filter-section__gMBIz{flex-shrink:0;padding:16px 20px;background:var(--bg-quaternary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-bottom:1px solid var(--border-secondary)}.index-module__main-panel__82FLm .index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq{margin-bottom:16px}.index-module__main-panel__82FLm .index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq:last-child{margin-bottom:0}.index-module__main-panel__82FLm .index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq .index-module__filter-label__TDZ3H{display:block;font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:8px}.index-module__main-panel__82FLm .index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq .index-module__filter-options__4AUEQ{display:flex;flex-wrap:wrap;gap:8px}.index-module__main-panel__82FLm .index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq .index-module__filter-options__4AUEQ .index-module__filter-option__-CSf1{padding:6px 12px;border:1px solid var(--btn-border);border-radius:8px;background:var(--input-bg);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);color:var(--text-primary);font-size:13px;font-weight:500;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);outline:none}.index-module__main-panel__82FLm .index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq .index-module__filter-options__4AUEQ .index-module__filter-option__-CSf1:hover{border-color:#007aff80;background:var(--color-primary-light);transform:translateY(-1px);box-shadow:0 4px 12px #007aff26}.index-module__main-panel__82FLm .index-module__filter-section__gMBIz .index-module__filter-section-content__A3AOe .index-module__filter-group__hk7qq .index-module__filter-options__4AUEQ .index-module__filter-option__-CSf1.index-module__active__Mr5KU{border-color:var(--color-primary);background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-info) 100%);color:#fff;box-shadow:0 4px 12px #007aff4d}.index-module__main-panel__82FLm .index-module__events-section__gJwdk{flex:1;min-height:0}@media (width <= 768px){.index-module__main-panel__82FLm{padding:16px;gap:12px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p{flex-direction:column;align-items:stretch;gap:12px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5{justify-content:center}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-left__xT1T5 h1{font-size:24px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo{justify-content:center;flex-wrap:wrap}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-btn__x4IAP{font-size:12px;padding:6px 10px}.index-module__main-panel__82FLm .index-module__panel-header__kyx4p .index-module__header-right__7F8Bo .index-module__action-btn__x4IAP .index-module__icon__tX8wX{font-size:12px}}.index-module__pagination__5dauU{display:flex!important;justify-content:space-between!important;align-items:center!important;gap:16px!important;position:relative!important;z-index:1!important;isolation:isolate!important;contain:layout style!important;box-sizing:border-box!important;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif!important}.index-module__pagination__5dauU .index-module__pagination-info__xbUbw{font-size:13px!important;color:var(--text-secondary)!important;box-sizing:border-box!important;margin:0!important;padding:0!important}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL{display:flex!important;align-items:center!important;gap:4px!important;box-sizing:border-box!important;margin:0!important;padding:0!important}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-btn__P1OCG{display:flex!important;align-items:center!important;justify-content:center!important;width:32px!important;height:32px!important;border:1px solid var(--border-color)!important;background:var(--bg-primary)!important;-webkit-backdrop-filter:blur(10px)!important;backdrop-filter:blur(10px)!important;border-radius:8px!important;font-size:13px!important;font-weight:500!important;color:var(--text-primary)!important;cursor:pointer!important;transition:all .3s cubic-bezier(.4,0,.2,1)!important;box-sizing:border-box!important;margin:0!important;padding:0!important;outline:none!important;text-decoration:none!important;font-family:inherit!important}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-btn__P1OCG:hover:not(.index-module__disabled__BywdX){border-color:var(--primary-color);background:var(--primary-bg-hover);transform:translateY(-1px);box-shadow:0 4px 12px var(--primary-shadow)}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-btn__P1OCG.index-module__active__lSJu-{border-color:var(--primary-color);background:var(--primary-color);color:#fff;box-shadow:0 4px 12px var(--primary-shadow)}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-btn__P1OCG.index-module__disabled__BywdX{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-btn__P1OCG span{font-size:14px}.index-module__pagination__5dauU .index-module__pagination-controls__q2hqL .index-module__pagination-ellipsis__gQnax{display:flex;align-items:center;justify-content:center;width:32px;height:32px;color:var(--text-secondary);font-size:13px}.index-module__pagination__5dauU .index-module__pagination-size-changer__SufyI{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-secondary)}.index-module__pagination__5dauU .index-module__pagination-size-changer__SufyI .index-module__pagination-select__JwvbH{padding:4px 8px;border:1px solid var(--border-color);border-radius:6px;background:var(--bg-primary);color:var(--text-primary);font-size:13px;cursor:pointer;transition:border-color .2s ease}.index-module__pagination__5dauU .index-module__pagination-size-changer__SufyI .index-module__pagination-select__JwvbH:hover{border-color:var(--primary-color)}.index-module__pagination__5dauU .index-module__pagination-size-changer__SufyI .index-module__pagination-select__JwvbH:focus{outline:none;border-color:var(--primary-color);box-shadow:0 0 0 2px var(--primary-shadow)}.EventsList-module__events-list__Z2gnl{display:flex;flex-direction:column;height:100%;background:var(--bg-quaternary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-radius:12px;overflow:hidden;box-shadow:var(--shadow-sm)}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs{display:flex;align-items:center;padding:16px 20px;background:var(--bg-tertiary);border-bottom:1px solid var(--border-secondary);font-weight:600;font-size:13px;color:var(--text-primary);letter-spacing:-.08px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU{display:flex;align-items:center;gap:4px;cursor:pointer;transition:all .2s ease;padding:4px 0;border-radius:6px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU:hover{color:var(--color-primary)}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU.EventsList-module__checkbox-cell__YvmEK{width:40px;justify-content:center;cursor:default}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU.EventsList-module__checkbox-cell__YvmEK:hover{color:var(--text-primary)}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU.EventsList-module__content-cell__aiH0X{flex:1;min-width:0}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU.EventsList-module__action-cell__BBBS7,.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU.EventsList-module__time-cell__F02or{width:120px;justify-content:center}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU.EventsList-module__detail-cell__soty-{width:80px;justify-content:center;cursor:default}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU.EventsList-module__detail-cell__soty-:hover{color:var(--text-primary)}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU .EventsList-module__sort-icon__OkgLv{font-size:12px;color:var(--color-primary);opacity:.8}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk{flex:1;overflow-y:auto}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q{display:flex;align-items:center;padding:12px 20px;border-bottom:1px solid var(--border-secondary);transition:all .15s ease;cursor:default}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q:hover,.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q.EventsList-module__selected__YUioo{background:var(--color-primary-lighter)}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q.EventsList-module__selected__YUioo:hover{background:var(--color-primary-light)}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q:last-child{border-bottom:none}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC{display:flex;align-items:center}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__checkbox-cell__YvmEK{width:40px;justify-content:center}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__content-cell__aiH0X{flex:1;min-width:0;display:flex;align-items:center;gap:12px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__content-cell__aiH0X .EventsList-module__event-icon__52LqG{font-size:18px;flex-shrink:0;width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:6px;background:var(--color-primary-lighter)}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__content-cell__aiH0X .EventsList-module__event-content__I8le1{flex:1;min-width:0}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__content-cell__aiH0X .EventsList-module__event-content__I8le1 .EventsList-module__event-title__wVvqr{font-size:14px;font-weight:500;color:var(--text-primary);line-height:1.3;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__content-cell__aiH0X .EventsList-module__event-content__I8le1 .EventsList-module__event-description__GZfW0{font-size:12px;color:var(--text-secondary);line-height:1.3;overflow:hidden;text-overflow:ellipsis}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__action-cell__BBBS7{width:120px;justify-content:center}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__action-cell__BBBS7 .EventsList-module__action-tag__IBpm0{padding:4px 8px;border-radius:6px;font-size:11px;font-weight:500;background:var(--color-success-lighter);color:var(--color-success);text-align:center;white-space:nowrap}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__time-cell__F02or{width:120px;justify-content:center}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__time-cell__F02or .EventsList-module__event-time__RCPoO{font-size:12px;color:var(--text-secondary);font-weight:500;text-align:center}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty-{width:80px;justify-content:center;gap:8px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty- .EventsList-module__detail-btn__PLLL4,.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty- .EventsList-module__source-btn__8pKfW{width:28px;height:28px;border:none;border-radius:6px;background:var(--color-primary-lighter);cursor:pointer;transition:all .15s ease;display:flex;align-items:center;justify-content:center;text-decoration:none}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty- .EventsList-module__detail-btn__PLLL4:hover,.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty- .EventsList-module__source-btn__8pKfW:hover{background:var(--color-primary-light);transform:scale(1.05)}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty- .EventsList-module__detail-btn__PLLL4 .EventsList-module__detail-icon__eATZo,.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty- .EventsList-module__source-btn__8pKfW .EventsList-module__detail-icon__eATZo,.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty- .EventsList-module__detail-btn__PLLL4 .EventsList-module__source-icon__FaubV,.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty- .EventsList-module__source-btn__8pKfW .EventsList-module__source-icon__FaubV{font-size:12px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty- .EventsList-module__source-btn__8pKfW{background:var(--color-warning-lighter)}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty- .EventsList-module__source-btn__8pKfW:hover{background:var(--color-warning-light)}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__empty-state__Z-gwH{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;text-align:center}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__empty-state__Z-gwH .EventsList-module__empty-icon__R7-ij{font-size:48px;margin-bottom:16px;opacity:.6}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__empty-state__Z-gwH p{font-size:16px;font-weight:500;color:var(--text-primary);margin-bottom:8px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__empty-state__Z-gwH span{font-size:14px;color:var(--text-secondary)}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-footer__7LiRc{flex-shrink:0;padding:16px 20px;border-top:1px solid var(--border-secondary);background:var(--bg-tertiary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}.EventsList-module__events-list-loading__pcl-h{display:flex;flex-direction:column;align-items:center;justify-content:center;height:300px;background:var(--bg-quaternary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border-radius:12px}.EventsList-module__events-list-loading__pcl-h .EventsList-module__loading-spinner__rJ-Jy{width:32px;height:32px;border:3px solid var(--color-primary-lighter);border-top:3px solid var(--color-primary);border-radius:50%;animation:EventsList-module__spin__WBDfl 1s linear infinite;margin-bottom:16px}.EventsList-module__events-list-loading__pcl-h p{font-size:14px;color:var(--text-secondary);font-weight:500}@keyframes EventsList-module__spin__WBDfl{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@media (width <= 768px){.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs,.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q{padding:12px 16px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU{font-size:12px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU.EventsList-module__time-cell__F02or{width:100px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-header__i8ZCs .EventsList-module__header-cell__tSGKU.EventsList-module__detail-cell__soty-{width:60px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__content-cell__aiH0X{gap:8px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__content-cell__aiH0X .EventsList-module__event-icon__52LqG{font-size:16px;width:20px;height:20px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__content-cell__aiH0X .EventsList-module__event-content__I8le1 .EventsList-module__event-title__wVvqr{font-size:13px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__content-cell__aiH0X .EventsList-module__event-content__I8le1 .EventsList-module__event-description__GZfW0{font-size:11px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__action-cell__BBBS7{width:80px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__action-cell__BBBS7 .EventsList-module__action-tag__IBpm0{font-size:10px;padding:3px 6px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__time-cell__F02or{width:100px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__time-cell__F02or .EventsList-module__event-time__RCPoO{font-size:11px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty-{width:60px;gap:4px}.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty- .EventsList-module__detail-btn__PLLL4,.EventsList-module__events-list__Z2gnl .EventsList-module__events-list-body__Pcosk .EventsList-module__event-row__ka77Q .EventsList-module__cell__5Y8iC.EventsList-module__detail-cell__soty- .EventsList-module__source-btn__8pKfW{width:24px;height:24px}}.EventsList-module__checkbox-container__L1if8{position:relative;display:inline-block;cursor:pointer;-webkit-user-select:none;user-select:none;margin:0}.EventsList-module__checkbox-container__L1if8 input[type=checkbox]{position:absolute;opacity:0;cursor:pointer;height:0;width:0}.EventsList-module__checkbox-container__L1if8 .EventsList-module__checkmark__-GyO9{position:relative;display:inline-block;width:16px;height:16px;background-color:var(--bg-primary);border:1.5px solid var(--border-primary);border-radius:3px;transition:all .2s ease}.EventsList-module__checkbox-container__L1if8 .EventsList-module__checkmark__-GyO9:after{content:"";position:absolute;display:none;left:4px;top:1px;width:4px;height:8px;border:solid var(--bg-primary);border-width:0 2px 2px 0;transform:rotate(45deg)}.EventsList-module__checkbox-container__L1if8:hover .EventsList-module__checkmark__-GyO9{border-color:var(--color-primary);background-color:var(--color-primary-lighter)}.EventsList-module__checkbox-container__L1if8 input:checked~.EventsList-module__checkmark__-GyO9{background-color:var(--color-primary);border-color:var(--color-primary)}.EventsList-module__checkbox-container__L1if8 input:checked~.EventsList-module__checkmark__-GyO9:after{display:block}.EventsList-module__checkbox-container__L1if8 input:indeterminate~.EventsList-module__checkmark__-GyO9{background-color:var(--color-primary);border-color:var(--color-primary)}.EventsList-module__checkbox-container__L1if8 input:indeterminate~.EventsList-module__checkmark__-GyO9:after{display:block;left:2px;top:6px;width:8px;height:2px;border:none;background-color:var(--bg-primary);transform:none;border-radius:1px}.index-module__action-btn__To7Ms{display:flex;align-items:center;gap:6px;padding:8px 12px;background:var(--color-primary-lighter);color:var(--color-primary);border:none;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;transition:all .15s ease;white-space:nowrap;outline:none}.index-module__action-btn__To7Ms:hover{background:var(--color-primary-light);transform:translateY(-1px)}.index-module__action-btn__To7Ms:disabled{cursor:not-allowed;opacity:.6;transform:none}.index-module__action-btn__To7Ms.index-module__version-btn__8d3di{background:var(--color-warning-light);color:var(--color-warning)}.index-module__action-btn__To7Ms.index-module__version-btn__8d3di:hover{background:#ffc10726}.index-module__action-btn__To7Ms.index-module__version-btn__8d3di.index-module__has-update__tNkZZ{background:var(--color-error-light);color:var(--color-error)}.index-module__action-btn__To7Ms.index-module__version-btn__8d3di.index-module__has-update__tNkZZ:hover{background:#dc354526}.index-module__icon__EhhVu{font-size:14px;line-height:1}.index-module__text__4iX-h{font-weight:500}.index-module__error__AUGjJ{font-size:12px;color:#dc3545;cursor:help}.index-module__notification-overlay__E4dh-{position:fixed;top:0;right:0;bottom:0;left:0;background:var(--overlay);display:flex;align-items:center;justify-content:center;z-index:10000;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.index-module__notification__ckX1l{background:var(--bg-primary);border-radius:12px;box-shadow:var(--shadow-xl);max-width:480px;width:90vw;max-height:80vh;overflow:hidden;animation:index-module__slide-in__qJkKL .3s ease-out;border:1px solid var(--border-primary)}.index-module__notification-header__nJZ3Q{display:flex;align-items:center;justify-content:space-between;padding:20px 24px 16px;border-bottom:1px solid var(--border-primary)}.index-module__notification-header__nJZ3Q h3{margin:0;font-size:18px;font-weight:600;color:var(--text-primary)}.index-module__close-btn__9uULv{background:none;border:none;font-size:24px;color:var(--text-secondary);cursor:pointer;padding:4px;border-radius:4px;transition:all .2s ease}.index-module__close-btn__9uULv:hover{background:var(--btn-hover-bg);color:var(--text-primary)}.index-module__notification-body__nnab7{padding:20px 24px}.index-module__version-info__-pyIP{margin-bottom:16px}.index-module__version-info__-pyIP p{margin:8px 0;font-size:14px;color:var(--text-primary)}.index-module__version-info__-pyIP p strong{font-weight:600}.index-module__release-notes__iU2jG h4{margin:0 0 12px;font-size:14px;font-weight:600;color:var(--text-primary)}.index-module__notes-content__ZpxxA{background:var(--bg-secondary);border:1px solid var(--border-primary);border-radius:6px;padding:12px;font-size:13px;line-height:1.5;color:var(--text-secondary);max-height:200px;overflow-y:auto;white-space:pre-wrap}.index-module__notification-footer__La-ia{display:flex;gap:12px;padding:16px 24px 20px;border-top:1px solid var(--border-primary);justify-content:flex-end}.index-module__later-btn__Q40Lc,.index-module__update-btn__lD1V2{padding:8px 16px;border-radius:6px;font-size:14px;font-weight:500;cursor:pointer;transition:all .2s ease;border:1px solid}.index-module__later-btn__Q40Lc{background:var(--bg-primary);border-color:var(--border-primary);color:var(--text-primary)}.index-module__later-btn__Q40Lc:hover{background:var(--btn-hover-bg);border-color:var(--border-secondary)}.index-module__update-btn__lD1V2{background:var(--color-primary);border-color:var(--color-primary);color:var(--btn-primary-text)}.index-module__update-btn__lD1V2:hover{background:var(--color-primary-hover);border-color:var(--color-primary-hover)}@keyframes index-module__slide-in__qJkKL{0%{opacity:0;transform:translateY(-20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}@media (width <= 768px){.index-module__notification__ckX1l{margin:20px;width:calc(100vw - 40px)}.index-module__notification-header__nJZ3Q,.index-module__notification-body__nnab7,.index-module__notification-footer__La-ia{padding-left:16px;padding-right:16px}.index-module__action-btn__To7Ms .index-module__text__4iX-h{display:none}}.index-module__modal-mask__XYxyO{position:fixed;top:0;right:0;bottom:0;left:0;width:100vw;height:100vh;background:var(--overlay);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);z-index:9999;display:flex;align-items:center;justify-content:center;animation:index-module__modal-mask-fade-in__R7ZBs .3s cubic-bezier(.4,0,.2,1)}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip{display:flex;align-items:flex-start;justify-content:center;width:100%;height:100%;padding:24px}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u{background:var(--bg-quaternary);-webkit-backdrop-filter:blur(40px);backdrop-filter:blur(40px);border-radius:16px;border:1px solid var(--border-secondary);box-shadow:var(--shadow-lg);max-height:90vh;display:flex;flex-direction:column;overflow:hidden;animation:index-module__modal-slide-in__VC-Dp .4s cubic-bezier(.34,1.56,.64,1)}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-header__GdUjX{display:flex;justify-content:space-between;align-items:center;padding:20px 24px 16px;border-bottom:1px solid var(--border-secondary);flex-shrink:0}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-header__GdUjX .index-module__modal-title__cafB-{font-size:18px;font-weight:600;color:var(--text-primary);margin:0}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-header__GdUjX .index-module__modal-close__ZuUgf{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border:none;background:var(--bg-secondary);border-radius:6px;color:var(--text-secondary);cursor:pointer;transition:all .2s ease}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-header__GdUjX .index-module__modal-close__ZuUgf:hover{background:var(--bg-tertiary);color:var(--text-primary)}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-header__GdUjX .index-module__modal-close__ZuUgf span{font-size:18px;line-height:1}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-body__j5X3U{flex:1;overflow-y:auto;padding:20px 24px}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-body__j5X3U::-webkit-scrollbar{width:6px}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-body__j5X3U::-webkit-scrollbar-track{background:transparent}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-body__j5X3U::-webkit-scrollbar-thumb{background:var(--border-primary);border-radius:3px}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-body__j5X3U::-webkit-scrollbar-thumb:hover{background:#b4b4b9}.index-module__modal-mask__XYxyO .index-module__modal-wrapper__bVZip .index-module__modal__QQS3u .index-module__modal-footer__3q-wn{flex-shrink:0;padding:16px 24px 20px;border-top:1px solid var(--border-secondary);background:var(--bg-secondary)}.index-module__btn-primary__OwgHI{padding:8px 16px;border:none;border-radius:10px;background:var(--color-primary);color:var(--btn-primary-text);font-size:14px;font-weight:600;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:var(--shadow-sm)}.index-module__btn-primary__OwgHI:hover:not(:disabled){background:var(--color-primary-dark);transform:translateY(-1px);box-shadow:var(--shadow-md)}.index-module__btn-primary__OwgHI:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-sm)}.index-module__btn-primary__OwgHI:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__btn-secondary__o1dNd{padding:8px 16px;border:1px solid var(--border-primary);border-radius:10px;background:var(--bg-quaternary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);color:var(--text-primary);font-size:14px;font-weight:500;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1)}.index-module__btn-secondary__o1dNd:hover:not(:disabled){border-color:var(--color-primary);background:var(--color-primary-lighter);transform:translateY(-1px);box-shadow:var(--shadow-sm)}.index-module__btn-secondary__o1dNd:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-xs)}.index-module__btn-secondary__o1dNd:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__btn-text__s61zq{padding:4px 8px;border:none;background:transparent;color:var(--color-primary);font-size:13px;font-weight:500;cursor:pointer;border-radius:4px;transition:all .2s ease}.index-module__btn-text__s61zq:hover:not(:disabled){background:var(--color-primary-lighter)}.index-module__btn-text__s61zq:disabled{opacity:.5;cursor:not-allowed}@keyframes index-module__modal-mask-fade-in__R7ZBs{0%{opacity:0}to{opacity:1}}@keyframes index-module__modal-slide-in__VC-Dp{0%{opacity:0;transform:translateY(-20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}.index-module__settings-panel__UCg3H .index-module__settings-tabs__vPH-t{display:flex;border-bottom:1px solid var(--border-light);margin-bottom:24px}.index-module__settings-panel__UCg3H .index-module__settings-tabs__vPH-t .index-module__tab-button__FG9Nc{display:flex;align-items:center;gap:8px;padding:12px 16px;border:none;background:transparent;color:var(--text-secondary);font-size:14px;font-weight:500;cursor:pointer;border-bottom:2px solid transparent;transition:all .2s ease;outline:none;border-radius:0}.index-module__settings-panel__UCg3H .index-module__settings-tabs__vPH-t .index-module__tab-button__FG9Nc .index-module__tab-icon__rBe-o{font-size:16px}.index-module__settings-panel__UCg3H .index-module__settings-tabs__vPH-t .index-module__tab-button__FG9Nc:hover{color:var(--text-primary);background:var(--bg-secondary)}.index-module__settings-panel__UCg3H .index-module__settings-tabs__vPH-t .index-module__tab-button__FG9Nc.index-module__active__bsBC1{color:var(--primary-color);border-bottom-color:var(--primary-color)}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH{min-height:400px}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA{margin-bottom:20px}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA:last-child{margin-bottom:0}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-label__pwe7O{display:block;font-size:14px;font-weight:500;color:var(--text-primary);margin-bottom:8px}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-label__pwe7O .index-module__required__2vuyW{color:var(--color-error);margin-left:4px}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-input__jGbRP,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-select__jbXdq,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-textarea__fAVMw{width:100%;padding:10px 12px;border:1px solid var(--border-color);border-radius:8px;font-size:14px;color:var(--text-primary);background:var(--bg-primary);transition:all .2s ease;box-sizing:border-box}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-input__jGbRP:hover,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-select__jbXdq:hover,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-textarea__fAVMw:hover{border-color:var(--primary-color)}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-input__jGbRP:focus,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-select__jbXdq:focus,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-textarea__fAVMw:focus{outline:none;border-color:var(--primary-color);box-shadow:0 0 0 3px var(--primary-shadow)}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-input__jGbRP::placeholder,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-select__jbXdq::placeholder,.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-textarea__fAVMw::placeholder{color:var(--text-secondary)}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-textarea__fAVMw{resize:vertical;min-height:80px;font-family:inherit;line-height:1.5}.index-module__settings-panel__UCg3H .index-module__settings-content__TqQPH .index-module__tab-panel__Q2QUI .index-module__form-group__zKwiA .index-module__form-hint__F0dFQ{font-size:12px;color:var(--text-secondary);margin-top:6px;line-height:1.4}.index-module__settings-panel__UCg3H .index-module__version-info__y0NZv{margin-top:24px;padding-top:16px;border-top:1px solid var(--border-light);text-align:center}.index-module__settings-panel__UCg3H .index-module__version-info__y0NZv .index-module__version-text__bx0HU{font-size:12px;color:var(--text-secondary);opacity:.7}.index-module__settings-footer__qA44X{display:flex;justify-content:space-between;align-items:center}.index-module__settings-footer__qA44X .index-module__footer-right__bslDg{display:flex;gap:8px}.index-module__btn-primary__ZzzFI{padding:8px 16px;border:none;border-radius:10px;background:var(--color-primary);color:var(--btn-primary-text);font-size:14px;font-weight:600;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:var(--shadow-sm)}.index-module__btn-primary__ZzzFI:hover:not(:disabled){background:var(--color-primary-dark);transform:translateY(-1px);box-shadow:var(--shadow-md)}.index-module__btn-primary__ZzzFI:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-sm)}.index-module__btn-primary__ZzzFI:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__switch-container__5xk1J{display:flex;align-items:center;gap:8px}.index-module__switch-input__V-8fl{display:none}.index-module__switch-label__xrOeQ{position:relative;display:inline-block;width:44px;height:24px;cursor:pointer}.index-module__switch-slider__dG-6J{position:absolute;top:0;right:0;bottom:0;left:0;background-color:var(--border-primary);border-radius:24px;transition:all .3s ease}.index-module__switch-slider__dG-6J:before{content:"";position:absolute;height:18px;width:18px;left:3px;bottom:3px;background-color:#fff;border-radius:50%;transition:all .3s ease;box-shadow:0 1px 3px #0003}.index-module__switch-input__V-8fl:checked+.index-module__switch-label__xrOeQ .index-module__switch-slider__dG-6J{background-color:var(--primary-color)}.index-module__switch-input__V-8fl:checked+.index-module__switch-label__xrOeQ .index-module__switch-slider__dG-6J:before{transform:translate(20px)}.index-module__switch-input__V-8fl:focus+.index-module__switch-label__xrOeQ .index-module__switch-slider__dG-6J{box-shadow:0 0 0 2px var(--primary-color-lighter)}.index-module__switch-input__V-8fl:disabled+.index-module__switch-label__xrOeQ{opacity:.5;cursor:not-allowed}.index-module__switch-input__V-8fl:disabled+.index-module__switch-label__xrOeQ .index-module__switch-slider__dG-6J{background-color:var(--border-light)}.index-module__btn-secondary__cRCpD{padding:8px 16px;border:1px solid var(--border-primary);border-radius:10px;background:var(--bg-quaternary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);color:var(--text-primary);font-size:14px;font-weight:500;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1)}.index-module__btn-secondary__cRCpD:hover:not(:disabled){border-color:var(--color-primary);background:var(--color-primary-lighter);transform:translateY(-1px);box-shadow:var(--shadow-sm)}.index-module__btn-secondary__cRCpD:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-xs)}.index-module__btn-secondary__cRCpD:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM{margin-bottom:24px;border:1px solid var(--border-color);border-radius:8px;background:var(--bg-secondary);overflow:hidden}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-header__ae0e8{padding:12px 16px;border-bottom:1px solid var(--border-color)}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-header__ae0e8 h4{font-size:14px;font-weight:600;color:var(--text-primary);margin:0;display:flex;align-items:center;gap:8px}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-content__dhjh6{padding:16px;display:flex;flex-direction:column;gap:12px}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-content__dhjh6 .index-module__overview-item__20Ilu{display:flex;justify-content:space-between;align-items:center;font-size:14px}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-content__dhjh6 .index-module__overview-item__20Ilu .index-module__overview-label__k3QHX{color:var(--text-secondary);font-weight:500}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-content__dhjh6 .index-module__overview-item__20Ilu .index-module__overview-value__gbEnJ{color:var(--text-primary);font-weight:600}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-content__dhjh6 .index-module__overview-item__20Ilu .index-module__overview-value__gbEnJ.index-module__ready__f4MXX{color:var(--success-color)}.index-module__ai-panel__R0K19 .index-module__data-overview__J-ZoM .index-module__overview-content__dhjh6 .index-module__overview-item__20Ilu .index-module__overview-value__gbEnJ.index-module__waiting__orgl9{color:var(--warning-color)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe{background:var(--bg-primary);border:1px solid var(--border-secondary);border-radius:12px;padding:20px;margin-bottom:20px;box-shadow:var(--shadow-sm);transition:all .2s ease}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs:hover,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe:hover{box-shadow:var(--shadow-md)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--border-secondary)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-title__GYp3Q,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-title__GYp3Q{display:flex;align-items:center;gap:8px;margin:0;font-size:15px;font-weight:600;color:var(--text-primary)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-title__GYp3Q .index-module__title-icon__w1Z58,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-title__GYp3Q .index-module__title-icon__w1Z58{font-size:16px;color:var(--color-success)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b{display:flex;align-items:center;gap:8px}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS{display:flex;align-items:center;gap:4px;padding:6px 10px;border:1px solid var(--border-primary);border-radius:6px;background:var(--bg-secondary);color:var(--text-primary);font-size:12px;font-weight:500;cursor:pointer;transition:all .15s ease;outline:none}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS:hover,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS:hover{background:var(--bg-tertiary);border-color:var(--color-primary)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS.index-module__primary__Uwxt8,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS.index-module__primary__Uwxt8{background:var(--color-primary);color:#fff;border-color:var(--color-primary)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS.index-module__primary__Uwxt8:hover,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS.index-module__primary__Uwxt8:hover{background:var(--color-primary-hover)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS .index-module__btn-icon__bBkUh,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-btn__X81KS .index-module__btn-icon__bBkUh{font-size:12px}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-content__NBmXz .index-module__result-text__WX-aI,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-content__NBmXz .index-module__result-text__WX-aI{background:var(--bg-secondary);border:1px solid var(--border-primary);border-radius:8px;padding:16px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:14px;line-height:1.6;color:var(--text-primary);white-space:pre-wrap;word-wrap:break-word;max-height:400px;overflow-y:auto;transition:border-color .15s ease}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-content__NBmXz .index-module__result-text__WX-aI:hover,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-content__NBmXz .index-module__result-text__WX-aI:hover{border-color:var(--border-tertiary)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar{width:6px}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-track,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-track{background:transparent}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-thumb,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:3px}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-thumb:hover,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-thumb:hover{background:var(--scrollbar-thumb-hover)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-meta__zAR0J,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-meta__zAR0J{display:flex;align-items:center;justify-content:space-between;margin-top:12px;padding-top:12px;border-top:1px solid var(--border-secondary);font-size:12px;color:var(--text-secondary)}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-meta__zAR0J .index-module__meta-left__G7E6i,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-meta__zAR0J .index-module__meta-left__G7E6i{display:flex;align-items:center;gap:12px}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs .index-module__result-meta__zAR0J .index-module__meta-left__G7E6i .index-module__meta-item__Mikx5,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-meta__zAR0J .index-module__meta-left__G7E6i .index-module__meta-item__Mikx5{display:flex;align-items:center;gap:4px}.index-module__ai-panel__R0K19 .index-module__config-section__DsjHs h2,.index-module__ai-panel__R0K19 .index-module__result-section__esrDe h2{margin-bottom:15px;color:var(--text-primary);font-size:1.3em}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1{margin-bottom:24px}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1:last-child{margin-bottom:0}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__section-header__WEXG-{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__section-header__WEXG- h3{font-size:16px;font-weight:600;color:var(--text-primary);margin:0}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__section-header__WEXG- .index-module__header-actions__phC5-{display:flex;align-items:center;gap:12px}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__section-header__WEXG- .index-module__header-actions__phC5- .index-module__token-count__bZx1v{font-size:12px;color:var(--text-secondary);background:var(--bg-secondary);padding:4px 8px;border-radius:4px}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy{border:1px solid var(--border-color);border-radius:8px;background:var(--bg-primary);transition:all .2s ease}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy:hover{border-color:var(--primary-color)}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy:focus-within{border-color:var(--primary-color);box-shadow:0 0 0 3px var(--primary-shadow)}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy .index-module__prompt-textarea__ZeYSC{width:100%;padding:12px;border:none;border-radius:8px;font-size:14px;color:var(--text-primary);background:transparent;resize:none;box-sizing:border-box;font-family:inherit;line-height:1.5}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy .index-module__prompt-textarea__ZeYSC:focus{outline:none}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy .index-module__prompt-textarea__ZeYSC::placeholder{color:var(--text-secondary)}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy .index-module__prompt-footer__NhJb8{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;border-top:1px solid var(--border-light);background:var(--bg-secondary);border-radius:0 0 8px 8px}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy .index-module__prompt-footer__NhJb8 .index-module__char-count__qSePr{font-size:12px;color:var(--text-secondary)}.index-module__ai-panel__R0K19 .index-module__prompt-section__Y1L-1 .index-module__prompt-editor__N6csy.index-module__expanded__VY5Zd .index-module__prompt-textarea__ZeYSC{min-height:300px}.index-module__ai-panel__R0K19 .index-module__loading-section__qmhp-{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;text-align:center;gap:16px}.index-module__ai-panel__R0K19 .index-module__loading-section__qmhp- .index-module__loading-spinner__FhbKe{width:40px;height:40px;border:4px solid var(--border-light);border-top:4px solid var(--primary-color);border-radius:50%;animation:index-module__spin__NTQZe 1s linear infinite}.index-module__ai-panel__R0K19 .index-module__loading-section__qmhp- p{font-size:16px;font-weight:500;color:var(--text-primary);margin:0}.index-module__ai-panel__R0K19 .index-module__loading-section__qmhp- .index-module__loading-tips__TN0F6{font-size:13px;color:var(--text-secondary)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe{background:var(--bg-secondary);border-radius:16px;border:1px solid var(--border-color);overflow:hidden;box-shadow:var(--shadow-lg);margin-bottom:24px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM{display:flex;justify-content:space-between;align-items:flex-start;background:linear-gradient(135deg,var(--bg-primary) 0%,var(--bg-secondary) 100%);border-bottom:1px solid var(--border-light);gap:20px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-title__GYp3Q{display:flex;align-items:center;gap:12px;flex:1}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-title__GYp3Q .index-module__title-icon__w1Z58{font-size:24px;margin-top:2px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.1))}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-title__GYp3Q .index-module__title-content__qCIUv h3{font-size:18px;font-weight:700;color:var(--text-primary);margin:0 0 4px;background:linear-gradient(135deg,var(--text-primary) 0%,var(--primary-color) 100%);-webkit-text-fill-color:transparent;-webkit-background-clip:text;background-clip:text}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-title__GYp3Q .index-module__title-content__qCIUv .index-module__result-meta__zAR0J{font-size:12px;color:var(--text-secondary);font-weight:500}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b{display:flex;align-items:center;gap:16px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__token-info__IvG7g{display:flex;align-items:center;gap:6px;padding:6px 12px;background:var(--bg-tertiary);border-radius:20px;border:1px solid var(--border-light)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__token-info__IvG7g .index-module__token-icon__1P1bc{font-size:14px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__token-info__IvG7g .index-module__token-text__RWskI{font-size:12px;font-weight:600;color:var(--text-primary)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-buttons__SWxAg{display:flex;gap:8px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b .index-module__action-buttons__SWxAg .index-module__btn-icon__bBkUh{margin-right:6px;font-size:14px}@media (width <= 768px){.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM{flex-direction:column;align-items:stretch;gap:16px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-header__-sHRM .index-module__result-actions__Lwz6b{justify-content:space-between}}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI{padding:24px;font-size:14px;line-height:1.7;color:var(--text-primary);max-height:500px;overflow-y:auto;background:var(--bg-primary)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-paragraph__D6REa{margin:0 0 12px;color:var(--text-primary)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-paragraph__D6REa:last-child{margin-bottom:0}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-heading__voqzC{font-weight:700;color:var(--text-primary);margin:20px 0 12px;padding-bottom:8px;border-bottom:2px solid var(--border-light)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-heading__voqzC.index-module__heading1__eVaM0{font-size:20px;color:var(--primary-color)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-heading__voqzC.index-module__heading2__EgSC5{font-size:18px;color:var(--primary-color)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-heading__voqzC.index-module__heading3__gXHpl{font-size:16px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-heading__voqzC:first-child{margin-top:0}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-list-item__9keYT{display:flex;align-items:flex-start;gap:8px;margin:6px 0;padding-left:16px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-list-item__9keYT .index-module__list-bullet__5e-IY{color:var(--primary-color);font-weight:700;margin-top:1px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-numbered-item__IXzIR{display:flex;align-items:flex-start;gap:8px;margin:6px 0;padding-left:16px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-numbered-item__IXzIR .index-module__number-bullet__KKVqC{color:var(--primary-color);font-weight:700;min-width:20px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI .index-module__result-spacing__lk3vv{height:12px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar{width:8px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-track{background:var(--bg-secondary);border-radius:4px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:4px;border:2px solid var(--bg-secondary)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-content__NBmXz .index-module__result-text__WX-aI::-webkit-scrollbar-thumb:hover{background:var(--scrollbar-thumb-hover)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;background:var(--bg-tertiary);border-top:1px solid var(--border-light)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__result-stats__RMcsG{display:flex;gap:20px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__result-stats__RMcsG .index-module__stat-item__z6Cev{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-secondary);font-weight:500}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__result-stats__RMcsG .index-module__stat-item__z6Cev .index-module__stat-icon__jcDOw{font-size:14px}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__quality-badge__8BKyM{display:flex;align-items:center;gap:4px;padding:4px 10px;background:linear-gradient(135deg,var(--primary-color) 0%,var(--primary-color-dark) 100%);color:#fff;border-radius:12px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;box-shadow:var(--shadow-sm)}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__quality-badge__8BKyM .index-module__badge-icon__1YRBa{font-size:12px}@media (width <= 600px){.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v{flex-direction:column;gap:12px;align-items:stretch}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__result-stats__RMcsG{justify-content:center}.index-module__ai-panel__R0K19 .index-module__result-section__esrDe .index-module__result-container__Rh1b2 .index-module__result-footer__lC3-v .index-module__quality-badge__8BKyM{align-self:center}}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 20px;text-align:center;gap:20px;background:linear-gradient(135deg,var(--bg-secondary) 0%,var(--bg-tertiary) 100%);border-radius:16px;border:1px solid var(--border-primary);position:relative;overflow:hidden}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;background:radial-gradient(circle at 30% 20%,var(--color-primary-lighter) 0%,transparent 50%),radial-gradient(circle at 70% 80%,var(--color-success-lighter) 0%,transparent 50%);pointer-events:none}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-icon__RFmRa{font-size:72px;opacity:.8;filter:drop-shadow(0 4px 8px rgba(0,0,0,.1));animation:index-module__float__FahY4 3s ease-in-out infinite;position:relative;z-index:1}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK h3{font-size:20px;font-weight:700;color:var(--text-primary);margin:0;position:relative;z-index:1;background:linear-gradient(135deg,var(--text-primary) 0%,var(--color-primary) 100%);-webkit-text-fill-color:transparent;-webkit-background-clip:text;background-clip:text}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK p{font-size:15px;color:var(--text-secondary);margin:0;max-width:420px;line-height:1.6;position:relative;z-index:1;opacity:.9}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR{display:flex;gap:32px;margin-top:24px;position:relative;z-index:1}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K{display:flex;flex-direction:column;align-items:center;gap:10px;padding:16px 12px;border-radius:12px;background:var(--bg-primary);border:1px solid var(--border-secondary);transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:var(--shadow-sm)}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K:hover{transform:translateY(-2px);box-shadow:var(--shadow-md);border-color:var(--color-primary-light)}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K .index-module__feature-icon__aCith{font-size:28px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.1))}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K span{font-size:13px;color:var(--text-secondary);font-weight:500;text-align:center;line-height:1.3}@media (width <= 600px){.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR{flex-direction:column;gap:16px}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K{flex-direction:row;text-align:left;padding:12px 16px}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K .index-module__feature-icon__aCith{font-size:24px}.index-module__ai-panel__R0K19 .index-module__empty-result__D1DxK .index-module__empty-features__Y-XeR .index-module__feature-item__zmC1K span{text-align:left}}.index-module__btn-primary__NTwQw{padding:8px 16px;border:none;border-radius:10px;background:var(--color-primary);color:var(--btn-primary-text);font-size:14px;font-weight:600;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:var(--shadow-sm)}.index-module__btn-primary__NTwQw:hover:not(:disabled){background:var(--color-primary-dark);transform:translateY(-1px);box-shadow:var(--shadow-md)}.index-module__btn-primary__NTwQw:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-sm)}.index-module__btn-primary__NTwQw:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__btn-primary__NTwQw.index-module__regenerate__MPpEF{background:var(--color-warning);color:#fff}.index-module__btn-primary__NTwQw.index-module__regenerate__MPpEF:hover:not(:disabled){background:var(--color-warning-dark)}.index-module__btn-secondary__aSTHl{padding:8px 16px;border:1px solid var(--border-primary);border-radius:10px;background:var(--bg-quaternary);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);color:var(--text-primary);font-size:14px;font-weight:500;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1)}.index-module__btn-secondary__aSTHl:hover:not(:disabled){border-color:var(--color-primary);background:var(--color-primary-lighter);transform:translateY(-1px);box-shadow:var(--shadow-sm)}.index-module__btn-secondary__aSTHl:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-xs)}.index-module__btn-secondary__aSTHl:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}.index-module__btn-text__f3PZM{padding:4px 8px;border:none;background:transparent;color:var(--color-primary);font-size:13px;font-weight:500;cursor:pointer;border-radius:4px;transition:all .2s ease}.index-module__btn-text__f3PZM:hover:not(:disabled){background:var(--color-primary-lighter)}.index-module__btn-text__f3PZM:disabled{opacity:.5;cursor:not-allowed}@keyframes index-module__spin__NTQZe{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes index-module__float__FahY4{0%,to{transform:translateY(0)}50%{transform:translateY(-8px)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4{position:fixed;top:0;left:0;width:100%;height:100%;background:#00000080;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;animation:EventDetailModal-module__fade-in__gcFok .2s ease-out}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j{background:var(--bg-color, #fff);border:1px solid var(--border-color, rgba(0, 0, 0, .08));border-radius:20px;box-shadow:0 20px 60px #00000026,0 8px 25px #0000001a;max-width:900px;width:100%;max-height:85vh;overflow:hidden;display:flex;flex-direction:column;animation:EventDetailModal-module__modal-slide-in__wtFi2 .3s cubic-bezier(.34,1.56,.64,1)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j{--bg-color: #1c1c1e;--border-color: rgba(255, 255, 255, .1)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM{display:flex;align-items:center;justify-content:space-between;padding:24px 28px;border-bottom:1px solid var(--header-border, rgba(0, 0, 0, .08));background:var(--header-bg, rgba(248, 248, 248, .9));-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM{--header-bg: rgba(28, 28, 30, .9);--header-border: rgba(255, 255, 255, .1)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM h2{margin:0;font-size:20px;font-weight:700;color:var(--text-primary, #1d1d1f);letter-spacing:-.03em}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM h2{--text-primary: #f2f2f7}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE{width:36px;height:36px;border:none;border-radius:10px;background:var(--close-btn-bg, rgba(0, 0, 0, .06));cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--close-btn-color, #86868b);transition:all .2s cubic-bezier(.25,.46,.45,.94)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE{--close-btn-bg: rgba(255, 255, 255, .1);--close-btn-color: #98989d}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE:hover{background:var(--close-btn-hover-bg, rgba(0, 0, 0, .12));color:var(--close-btn-hover-color, #1d1d1f);transform:scale(1.05)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE:hover{--close-btn-hover-bg: rgba(255, 255, 255, .15);--close-btn-hover-color: #f2f2f7}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE:active{transform:scale(.95)}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk{flex:1;overflow-y:auto;padding:28px;background:var(--content-bg, #fff)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk{--content-bg: #1c1c1e}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar{width:6px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-track{background:transparent}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb, rgba(0, 0, 0, .2));border-radius:3px}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb{--scrollbar-thumb: rgba(255, 255, 255, .3)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb:hover{background:var(--scrollbar-thumb-hover, rgba(0, 0, 0, .3))}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb:hover{--scrollbar-thumb-hover: rgba(255, 255, 255, .4)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG{margin-bottom:36px;padding:20px;background:var(--section-bg, rgba(248, 248, 248, .5));border-radius:16px;border:1px solid var(--section-border, rgba(0, 0, 0, .04));transition:all .2s ease}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG{--section-bg: rgba(28, 28, 30, .6);--section-border: rgba(255, 255, 255, .08)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG:last-child{margin-bottom:0}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG:hover{background:var(--section-hover-bg, rgba(248, 248, 248, .8));border-color:var(--section-hover-border, rgba(0, 0, 0, .08))}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG:hover{--section-hover-bg: rgba(28, 28, 30, .8);--section-hover-border: rgba(255, 255, 255, .12)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG.EventDetailModal-module__compact__GlU0K{margin-bottom:20px;padding:16px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG.EventDetailModal-module__compact__GlU0K h3{margin-bottom:12px;font-size:15px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG h3{margin:0 0 18px;font-size:17px;font-weight:700;color:var(--section-title, #1d1d1f);letter-spacing:-.03em;display:flex;align-items:center;gap:8px}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG h3{--section-title: #f2f2f7}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG h3:before{content:"";width:4px;height:18px;background:linear-gradient(135deg,#007aff,#5ac8fa);border-radius:2px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-grid__lP-Rl,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-content__b-wBI,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__project-info__BF-ji,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__push-info__CiBtf{display:flex;flex-direction:column;gap:12px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-content__Zl-xn,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-project__W-Pxu,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-author__bJeyL{gap:8px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL{display:flex;align-items:flex-start;gap:16px;padding:12px 0;border-bottom:1px solid var(--item-border, rgba(0, 0, 0, .04))}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL{--item-border: rgba(255, 255, 255, .06)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL:last-child{border-bottom:none}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-content__Zl-xn .EventDetailModal-module__detail-item__gTUiL,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-project__W-Pxu .EventDetailModal-module__detail-item__gTUiL{padding:8px 0;gap:12px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-content__Zl-xn .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__label__q-vpJ,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-project__W-Pxu .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__label__q-vpJ{min-width:60px;font-size:13px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-content__Zl-xn .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-project__W-Pxu .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT{font-size:13px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__compact-author__bJeyL .EventDetailModal-module__detail-item__gTUiL{padding:6px 0;gap:10px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__label__q-vpJ{font-size:14px;font-weight:600;color:var(--label-color, #86868b);min-width:100px;flex-shrink:0}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__label__q-vpJ{--label-color: #98989d}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT{font-size:14px;color:var(--value-color, #1d1d1f);flex:1;word-break:break-word;line-height:1.4}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT{--value-color: #f2f2f7}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__action-badge__Bxghx{flex:0;white-space:nowrap;display:inline-block;padding:6px 12px;background:linear-gradient(135deg,#34c75926,#34c75914);color:#30d158;border-radius:8px;font-size:12px;font-weight:600;border:1px solid rgba(52,199,89,.2)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__action-badge__Bxghx{background:linear-gradient(135deg,#34c75933,#34c7591a);border-color:#34c7594d}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY{display:inline-block;padding:4px 8px;border-radius:6px;font-size:11px;font-weight:500}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY.EventDetailModal-module__status-opened__0o3-j{background:#34c7591f;color:#30d158}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY.EventDetailModal-module__status-closed__axB54{background:#ff453a1f;color:#ff453a}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY.EventDetailModal-module__status-merged__jrAZc{background:#007aff1f;color:#007aff}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__value__U4voT.EventDetailModal-module__commit-hash__T82Gy{font-family:SF Mono,Monaco,Cascadia Code,Roboto Mono,Consolas,Courier New,monospace;font-size:12px;background:#0000000a;padding:4px 8px;border-radius:4px;word-break:break-all}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__labels__FfkpP{display:flex;flex-wrap:wrap;gap:6px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__labels__FfkpP .EventDetailModal-module__label-tag__1eJTi{padding:3px 8px;background:#007aff14;color:#007aff;border-radius:4px;font-size:11px;font-weight:500}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM{display:flex;align-items:center;gap:12px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-avatar__UktK4{width:72px;height:72px;border-radius:12px;object-fit:cover}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN{flex:1}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-name__Aop-h{font-size:15px;font-weight:600;color:#1d1d1f;margin-bottom:2px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-username__7f29y{font-size:13px;color:#86868b;margin-bottom:6px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-link__qdJ8G{font-size:12px;color:#007aff;text-decoration:none;font-weight:500}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-link__qdJ8G:hover{text-decoration:underline}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__note-info__xsh-2 .EventDetailModal-module__note-body__h5kYR{background:#00000005;padding:16px;border-radius:8px;font-size:13px;line-height:1.5;color:#1d1d1f;white-space:pre-wrap;word-break:break-word;margin-bottom:12px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__note-info__xsh-2 .EventDetailModal-module__note-meta__CSOAr{display:flex;flex-direction:column;gap:4px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__note-info__xsh-2 .EventDetailModal-module__note-meta__CSOAr span{font-size:12px;color:#86868b}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG{display:flex;align-items:center;justify-content:flex-end;gap:16px;padding:20px 28px;border-top:1px solid var(--footer-border, rgba(0, 0, 0, .08));background:var(--footer-bg, rgba(248, 248, 248, .9));-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG{--footer-bg: rgba(28, 28, 30, .9);--footer-border: rgba(255, 255, 255, .1)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__source-link-btn__lCMP7{padding:12px 20px;background:linear-gradient(135deg,#007aff,#5ac8fa);color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;transition:all .2s cubic-bezier(.25,.46,.45,.94);box-shadow:0 4px 12px #007aff4d;display:flex;align-items:center;gap:8px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__source-link-btn__lCMP7:before{content:"🔗";font-size:16px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__source-link-btn__lCMP7:hover{transform:translateY(-2px);box-shadow:0 6px 20px #007aff66;background:linear-gradient(135deg,#0056d6,#4aa3f0)}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__source-link-btn__lCMP7:active{transform:translateY(0)}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23{padding:12px 20px;background:var(--close-modal-bg, rgba(0, 0, 0, .06));color:var(--close-modal-color, #1d1d1f);border:1px solid var(--close-modal-border, rgba(0, 0, 0, .1));border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s cubic-bezier(.25,.46,.45,.94)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23{--close-modal-bg: rgba(255, 255, 255, .1);--close-modal-color: #f2f2f7;--close-modal-border: rgba(255, 255, 255, .2)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23:hover{background:var(--close-modal-hover-bg, rgba(0, 0, 0, .12));border-color:var(--close-modal-hover-border, rgba(0, 0, 0, .15));transform:translateY(-1px)}@media (prefers-color-scheme: dark){.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23:hover{--close-modal-hover-bg: rgba(255, 255, 255, .15);--close-modal-hover-border: rgba(255, 255, 255, .25)}}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23:active{transform:translateY(0)}@keyframes EventDetailModal-module__fade-in__gcFok{0%{opacity:0}to{opacity:1}}@keyframes EventDetailModal-module__modal-slide-in__wtFi2{0%{opacity:0;transform:scale(.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4{background:#0009}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j{background:#1c1c1ef2;box-shadow:0 8px 32px #0000004d}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM{background:#2c2c2ecc;border-bottom:1px solid rgba(255,255,255,.1)}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM h2{color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE{background:#ffffff1a;color:#8e8e93}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM .EventDetailModal-module__close-btn__0KmQE:hover{background:#fff3;color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG h3{color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__label__q-vpJ{color:#8e8e93}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT{color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT.EventDetailModal-module__action-badge__Bxghx,.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY.EventDetailModal-module__status-opened__0o3-j{background:#34c75933;color:#32d74b}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY.EventDetailModal-module__status-closed__axB54{background:#ff453a33;color:#ff6961}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT.EventDetailModal-module__status-badge__mP8CY.EventDetailModal-module__status-merged__jrAZc{background:#007aff33;color:#0a84ff}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__value__U4voT.EventDetailModal-module__commit-hash__T82Gy{background:#ffffff1a;color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__labels__FfkpP .EventDetailModal-module__label-tag__1eJTi{background:#007aff33;color:#0a84ff}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-name__Aop-h{color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-username__7f29y{color:#8e8e93}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__author-info__QU8GM .EventDetailModal-module__author-details__CSNcN .EventDetailModal-module__author-link__qdJ8G{color:#0a84ff}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__note-info__xsh-2 .EventDetailModal-module__note-body__h5kYR{background:#ffffff14;color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__note-info__xsh-2 .EventDetailModal-module__note-meta__CSOAr span{color:#8e8e93}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-footer__bMVTG{background:#2c2c2ecc;border-top:1px solid rgba(255,255,255,.1)}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__source-link-btn__lCMP7{background:#007aff33;color:#0a84ff}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__source-link-btn__lCMP7:hover{background:#007aff4d}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23{background:#ffffff1a;color:#f2f2f7}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-footer__bMVTG .EventDetailModal-module__close-modal-btn__u4I23:hover{background:#fff3}@media (width <= 768px){.EventDetailModal-module__event-detail-modal-overlay__kSKR4{padding:12px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-header__YHEvM,.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-footer__bMVTG{padding:16px 20px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk{padding:20px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG{margin-bottom:24px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL{flex-direction:column;gap:4px}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__detail-item__gTUiL .EventDetailModal-module__label__q-vpJ{min-width:auto}.EventDetailModal-module__event-detail-modal-overlay__kSKR4 .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk .EventDetailModal-module__detail-section__09YJG .EventDetailModal-module__author-info__QU8GM{flex-direction:column;align-items:flex-start;text-align:center}}.EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar{width:4px}.EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-track{background:transparent}.EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb{background:#0003;border-radius:2px}.EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb:hover{background:#0000004d}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb{background:#fff3}.EventDetailModal-module__app__GneYG.EventDetailModal-module__dark__4O-jE .EventDetailModal-module__event-detail-modal__mBc4j .EventDetailModal-module__modal-content__V4tyk::-webkit-scrollbar-thumb:hover{background:#ffffff4d}.App-module__app__ZYOJd{width:100%;height:100vh;background:var(--bg-secondary);font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;color:var(--text-primary);position:relative;overflow:hidden}.App-module__app__ZYOJd.App-module__web-mode__2hnFp{display:flex;align-items:stretch;justify-content:center}.App-module__app__ZYOJd.App-module__web-mode__2hnFp>*{width:100%;height:100vh}.App-module__app__ZYOJd.App-module__userscript-mode__5Dbvp{position:relative;width:100%;height:100%;z-index:999999;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;isolation:isolate;contain:layout style}.App-module__app__ZYOJd.App-module__userscript-mode__5Dbvp>*{width:100%;height:100%}.App-module__app__ZYOJd.App-module__userscript-mode__5Dbvp .App-module__events-list-footer__M6fFx{flex-shrink:0!important;display:block!important;visibility:visible!important;opacity:1!important;position:relative!important;z-index:1!important}.App-module__app__ZYOJd.App-module__userscript-mode__5Dbvp .App-module__pagination__8MYcc{display:flex!important;visibility:visible!important;opacity:1!important;position:relative!important;z-index:1!important}.App-module__app__ZYOJd.App-module__light__-2YM7{background:var(--bg-secondary);color:var(--text-primary)}.App-module__app__ZYOJd.App-module__dark__zl6FN{background:var(--bg-primary);color:var(--text-primary)}@media (width <= 768px){.App-module__app__ZYOJd.App-module__web-mode__2hnFp>*{height:100vh}.App-module__app__ZYOJd.App-module__userscript-mode__5Dbvp{top:10px;right:10px;left:10px;width:auto;height:calc(100vh - 20px)}}*::-webkit-scrollbar{width:8px;height:8px}*::-webkit-scrollbar-track{background:transparent}*::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:4px}*::-webkit-scrollbar-thumb:hover{background:var(--scrollbar-thumb-hover)}@keyframes App-module__fade-in__hmOGT{0%{opacity:0}to{opacity:1}}@keyframes App-module__slide-in-up__3G2dj{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes App-module__slide-in-down__yp8xa{0%{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}.App-module__fade-in__hmOGT{animation:App-module__fade-in__hmOGT .3s ease-out}.App-module__slide-in-up__3G2dj{animation:App-module__slide-in-up__3G2dj .3s ease-out}.App-module__slide-in-down__yp8xa{animation:App-module__slide-in-down__yp8xa .3s ease-out}.App-module__userscript-header__Gd9rb{display:flex;justify-content:space-between;align-items:center;padding:15px 20px;border-bottom:1px solid #eee;background:#f8f9fa;border-radius:8px}.App-module__userscript-header__Gd9rb h3{margin:0;color:#333;font-size:16px}.App-module__userscript-header__Gd9rb .App-module__toggle-btn__1QXY6{padding:4px 12px;font-size:12px;background:#007bff;color:#fff;border:none;border-radius:4px;cursor:pointer}.App-module__userscript-header__Gd9rb .App-module__toggle-btn__1QXY6:hover{background:#0056b3}.App-module__app-content__41BC0{transition:all .3s ease}.App-module__app-content__41BC0.App-module__collapsed__-W0B6{display:none}.App-module__app-content__41BC0.App-module__expanded__4oZSa{display:block}.App-module__app-header__uzDwt{text-align:center;margin-bottom:30px}.App-module__app-header__uzDwt h1{margin-bottom:10px;color:#333;font-size:2.5em}@media (prefers-color-scheme: dark){.App-module__app-header__uzDwt h1{color:#fff}}.App-module__app-header__uzDwt p{color:#666;font-size:1.1em}@media (prefers-color-scheme: dark){.App-module__app-header__uzDwt p{color:#ccc}}.App-module__app-main__Vb-mE{display:flex;flex-direction:column;gap:25px}.App-module__error-banner__lzzyc{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:#f8d7da;border:1px solid #f5c6cb;border-radius:6px;color:#721c24;margin-bottom:20px}.App-module__error-banner__lzzyc button{background:none;border:none;color:#721c24;font-size:18px;cursor:pointer;padding:0;width:20px;height:20px;display:flex;align-items:center;justify-content:center}.App-module__error-banner__lzzyc button:hover{opacity:.7}.App-module__config-form__3qfiF{display:flex;flex-direction:column;gap:15px}.App-module__form-group__HjqOW{display:flex;flex-direction:column;gap:5px}.App-module__form-group__HjqOW label{font-weight:500;color:#555}@media (prefers-color-scheme: dark){.App-module__form-group__HjqOW label{color:#e2e8f0}}.App-module__form-group__HjqOW input{padding:8px 12px;border:1px solid #ddd;border-radius:4px;font-size:14px;transition:border-color .2s}.App-module__form-group__HjqOW input:focus{outline:none;border-color:#007bff;box-shadow:0 0 0 2px #007bff40}@media (prefers-color-scheme: dark){.App-module__form-group__HjqOW input{background:#4a5568;border-color:#6b7280;color:#fff}}.App-module__date-range__a4twt{display:flex;align-items:center;gap:10px}.App-module__date-range__a4twt input{flex:1}.App-module__date-range__a4twt span{color:#666;font-size:14px}@media (prefers-color-scheme: dark){.App-module__date-range__a4twt span{color:#ccc}}.App-module__action-section__PNqvo{display:flex;gap:15px;justify-content:center}.App-module__primary-btn__7Yh0h,.App-module__secondary-btn__rYZob{padding:12px 24px;border-radius:6px;font-size:16px;font-weight:500;cursor:pointer;transition:all .2s}.App-module__primary-btn__7Yh0h:disabled,.App-module__secondary-btn__rYZob:disabled{opacity:.6;cursor:not-allowed}.App-module__primary-btn__7Yh0h{background:var(--color-primary);color:var(--btn-text);border:none;box-shadow:var(--shadow-sm)}.App-module__primary-btn__7Yh0h:hover:not(:disabled){background:var(--color-primary-hover);transform:translateY(-1px);box-shadow:var(--shadow-md)}.App-module__primary-btn__7Yh0h:active:not(:disabled){transform:translateY(0);box-shadow:var(--shadow-sm)}.App-module__secondary-btn__rYZob{background:transparent;color:#007bff;border:1px solid #007bff}.App-module__secondary-btn__rYZob:hover:not(:disabled){background:#007bff;color:#fff;transform:translateY(-1px)}.App-module__preview-area__eSphl{min-height:200px;background:#fff;border:1px solid #ddd;border-radius:4px;padding:15px}@media (prefers-color-scheme: dark){.App-module__preview-area__eSphl{background:#4a5568;border-color:#6b7280}}.App-module__preview-area__eSphl .App-module__placeholder__64NFK{color:#999;text-align:center;margin-top:80px;font-style:italic}@media (prefers-color-scheme: dark){.App-module__preview-area__eSphl .App-module__placeholder__64NFK{color:#a0aec0}}.App-module__preview-area__eSphl .App-module__loading__nhcml{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px;gap:16px}.App-module__preview-area__eSphl .App-module__loading__nhcml .App-module__spinner__DX3IN{width:32px;height:32px;border:3px solid #f3f3f3;border-top:3px solid #007bff;border-radius:50%;animation:App-module__spin__cTQvR 1s linear infinite}.App-module__preview-area__eSphl .App-module__loading__nhcml p{color:#666;margin:0}@media (prefers-color-scheme: dark){.App-module__preview-area__eSphl .App-module__loading__nhcml p{color:#ccc}}.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-meta__Jmys5{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #eee;margin-bottom:15px;font-size:12px;color:#666}@media (prefers-color-scheme: dark){.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-meta__Jmys5{border-color:#555;color:#ccc}}.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-meta__Jmys5 span:not(:last-child):after{content:"•";margin:0 8px;opacity:.5}@media (width <= 600px){.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-meta__Jmys5{flex-direction:column;gap:5px;align-items:flex-start}.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-meta__Jmys5 span:after{display:none}}.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-text__DiDz5{line-height:1.6;color:#333;white-space:pre-wrap;word-wrap:break-word}@media (prefers-color-scheme: dark){.App-module__preview-area__eSphl .App-module__report-content__qtrdb .App-module__report-text__DiDz5{color:#e2e8f0}}@media (width <= 768px){.App-module__app__ZYOJd{padding:15px}.App-module__app__ZYOJd.App-module__userscript-mode__5Dbvp{max-width:350px}.App-module__app-header__uzDwt h1{font-size:2em}.App-module__action-section__PNqvo,.App-module__date-range__a4twt{flex-direction:column}.App-module__date-range__a4twt span{display:none}}*{margin:0;padding:0;box-sizing:border-box}:root{font-family:Inter,system-ui,Avenir,Helvetica,Arial,sans-serif;line-height:1.5;font-weight:400;color-scheme:light dark;font-synthesis:none;text-rendering:optimizelegibility;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-size-adjust:100%;--bg-primary: #fff;--bg-secondary: #f5f5f7;--bg-tertiary: #f8f9fa;--bg-quaternary: rgba(248, 248, 248, .8);--text-primary: #1d1d1f;--text-secondary: #86868b;--text-tertiary: #666;--text-quaternary: #8e8e93;--border-primary: rgba(0, 0, 0, .08);--border-secondary: rgba(0, 0, 0, .05);--border-tertiary: #e5e5e7;--border-quaternary: #d2d2d7;--color-primary: #007aff;--color-primary-hover: #0051d5;--color-primary-dark: #0051d5;--color-primary-light: rgba(0, 122, 255, .1);--color-primary-lighter: rgba(0, 122, 255, .05);--color-success: #34c759;--color-success-light: rgba(52, 199, 89, .1);--color-success-lighter: rgba(52, 199, 89, .05);--color-warning: #ff9500;--color-warning-light: rgba(255, 149, 0, .1);--color-warning-lighter: rgba(255, 149, 0, .05);--color-error: #ff3b30;--color-error-light: rgba(255, 59, 48, .1);--color-danger: #ff3b30;--color-danger-light: rgba(255, 59, 48, .1);--color-danger-lighter: rgba(255, 59, 48, .05);--color-info: #5856d6;--color-info-light: rgba(88, 86, 214, .1);--shadow-sm: 0 2px 8px rgba(0, 0, 0, .06);--shadow-md: 0 4px 16px rgba(0, 0, 0, .1);--shadow-lg: 0 8px 32px rgba(0, 0, 0, .15);--shadow-xl: 0 20px 60px rgba(0, 0, 0, .15);--scrollbar-thumb: #d1d1d6;--scrollbar-thumb-hover: #b4b4b9;--overlay: rgba(0, 0, 0, .5);--overlay-light: rgba(0, 0, 0, .5);--overlay-heavy: rgba(0, 0, 0, .6);--btn-bg: #f9f9f9;--btn-text: #213547;--btn-primary-text: #fff;--btn-border: rgba(0, 0, 0, .1);--btn-hover-bg: rgba(0, 0, 0, .06);--border-color: rgba(0, 0, 0, .08);--border-light: rgba(0, 0, 0, .05);--primary-color: #007aff;--primary-bg-hover: rgba(0, 122, 255, .1);--primary-shadow: rgba(0, 122, 255, .25);--success-color: #34c759;--warning-color: #ff9500;--shadow-xs: 0 1px 4px rgba(0, 0, 0, .04);--input-bg: #fff;--input-border: #ddd;--input-focus-border: #007bff;--input-focus-shadow: rgba(0, 123, 255, .1);--link-color: #646cff;--link-hover: #535bf2;color:var(--text-primary);background-color:var(--bg-primary)}html,body{height:100%;margin:0;padding:0}#root{width:100%;min-height:100vh;display:flex;flex-direction:column}a{font-weight:500;color:var(--link-color);text-decoration:inherit}a:hover{color:var(--link-hover)}body{margin:0;min-width:320px;min-height:100vh}h1{font-size:3.2em;line-height:1.1}button{border-radius:8px;border:1px solid transparent;padding:.6em 1.2em;font-size:1em;font-weight:500;font-family:inherit;background-color:var(--btn-bg);color:var(--btn-text);cursor:pointer;transition:border-color .25s;outline:none!important}button:hover{border-color:var(--color-primary)}@media (prefers-color-scheme: dark){:root{--bg-primary: #1a1a1a;--bg-secondary: #1c1c1e;--bg-tertiary: #2c2c2e;--bg-quaternary: rgba(28, 28, 30, .8);--text-primary: #fff;--text-secondary: #8e8e93;--text-tertiary: #98989d;--text-quaternary: #636366;--border-primary: rgba(255, 255, 255, .1);--border-secondary: rgba(255, 255, 255, .08);--border-tertiary: #424245;--border-quaternary: #48484a;--color-primary: #0a84ff;--color-primary-hover: #64b5f6;--color-primary-dark: #06c;--color-primary-light: rgba(0, 122, 255, .2);--color-primary-lighter: rgba(0, 122, 255, .1);--color-success: #32d74b;--color-success-light: rgba(52, 199, 89, .2);--color-warning: #ff9f0a;--color-warning-light: rgba(255, 149, 0, .2);--color-error: #ff453a;--color-error-light: rgba(255, 69, 58, .2);--color-info: #5e5ce6;--color-info-light: rgba(88, 86, 214, .2);--shadow-sm: 0 2px 8px rgba(0, 0, 0, .2);--shadow-md: 0 4px 16px rgba(0, 0, 0, .3);--shadow-lg: 0 8px 32px rgba(0, 0, 0, .4);--shadow-xl: 0 20px 60px rgba(0, 0, 0, .5);--scrollbar-thumb: #48484a;--scrollbar-thumb-hover: #636366;--overlay: rgba(0, 0, 0, .6);--overlay-light: rgba(0, 0, 0, .6);--overlay-heavy: rgba(0, 0, 0, .8);--btn-bg: #1a1a1a;--btn-text: rgba(255, 255, 255, .87);--btn-primary-text: #fff;--btn-border: rgba(255, 255, 255, .2);--btn-hover-bg: rgba(255, 255, 255, .1);--border-color: rgba(255, 255, 255, .1);--border-light: rgba(255, 255, 255, .08);--primary-color: #0a84ff;--primary-bg-hover: rgba(0, 122, 255, .2);--primary-shadow: rgba(0, 122, 255, .3);--success-color: #32d74b;--warning-color: #ff9f0a;--shadow-xs: 0 1px 4px rgba(0, 0, 0, .1);--input-bg: #2c2c2e;--input-border: #48484a;--input-focus-border: #64b5f6;--input-focus-shadow: rgba(100, 181, 246, .1);--link-color: #646cff;--link-hover: #535bf2;color:var(--text-primary);background-color:var(--bg-primary)}}.dark{--bg-primary: #1a1a1a;--bg-secondary: #1c1c1e;--bg-tertiary: #2c2c2e;--bg-quaternary: rgba(28, 28, 30, .8);--text-primary: #fff;--text-secondary: #8e8e93;--text-tertiary: #98989d;--text-quaternary: #636366;--border-primary: rgba(255, 255, 255, .1);--border-secondary: rgba(255, 255, 255, .08);--border-tertiary: #424245;--border-quaternary: #48484a;--color-primary: #0a84ff;--color-primary-hover: #64b5f6;--color-primary-dark: #06c;--color-primary-light: rgba(0, 122, 255, .2);--color-primary-lighter: rgba(0, 122, 255, .1);--color-success: #32d74b;--color-success-light: rgba(52, 199, 89, .2);--color-success-lighter: rgba(52, 199, 89, .1);--color-warning: #ff9f0a;--color-warning-light: rgba(255, 149, 0, .2);--color-warning-lighter: rgba(255, 149, 0, .1);--color-error: #ff453a;--color-error-light: rgba(255, 69, 58, .2);--color-danger: #ff453a;--color-danger-light: rgba(255, 69, 58, .2);--color-danger-lighter: rgba(255, 69, 58, .1);--color-info: #5e5ce6;--color-info-light: rgba(88, 86, 214, .2);--shadow-sm: 0 2px 8px rgba(0, 0, 0, .2);--shadow-md: 0 4px 16px rgba(0, 0, 0, .3);--shadow-lg: 0 8px 32px rgba(0, 0, 0, .4);--shadow-xl: 0 20px 60px rgba(0, 0, 0, .5);--scrollbar-thumb: #48484a;--scrollbar-thumb-hover: #636366;--overlay: rgba(0, 0, 0, .6);--overlay-light: rgba(0, 0, 0, .6);--overlay-heavy: rgba(0, 0, 0, .8);--btn-bg: #1a1a1a;--btn-text: rgba(255, 255, 255, .87);--btn-primary-text: #fff;--btn-border: rgba(255, 255, 255, .2);--btn-hover-bg: rgba(255, 255, 255, .1);--border-color: rgba(255, 255, 255, .1);--border-light: rgba(255, 255, 255, .08);--primary-color: #0a84ff;--primary-bg-hover: rgba(0, 122, 255, .2);--primary-shadow: rgba(0, 122, 255, .3);--success-color: #32d74b;--warning-color: #ff9f0a;--shadow-xs: 0 1px 4px rgba(0, 0, 0, .1);--input-bg: #2c2c2e;--input-border: #48484a;--input-focus-border: #64b5f6;--input-focus-shadow: rgba(100, 181, 246, .1);--link-color: #646cff;--link-hover: #535bf2}.light{--bg-primary: #fff;--bg-secondary: #f5f5f7;--bg-tertiary: #f8f9fa;--bg-quaternary: rgba(248, 248, 248, .8);--text-primary: #1d1d1f;--text-secondary: #86868b;--text-tertiary: #666;--text-quaternary: #8e8e93;--border-primary: rgba(0, 0, 0, .08);--border-secondary: rgba(0, 0, 0, .05);--border-tertiary: #e5e5e7;--border-quaternary: #d2d2d7;--color-primary: #007aff;--color-primary-hover: #0051d5;--color-primary-dark: #0051d5;--color-primary-light: rgba(0, 122, 255, .1);--color-primary-lighter: rgba(0, 122, 255, .05);--color-success: #34c759;--color-success-light: rgba(52, 199, 89, .1);--color-success-lighter: rgba(52, 199, 89, .05);--color-warning: #ff9500;--color-warning-light: rgba(255, 149, 0, .1);--color-warning-lighter: rgba(255, 149, 0, .05);--color-error: #ff3b30;--color-error-light: rgba(255, 59, 48, .1);--color-danger: #ff3b30;--color-danger-light: rgba(255, 59, 48, .1);--color-danger-lighter: rgba(255, 59, 48, .05);--color-info: #5856d6;--color-info-light: rgba(88, 86, 214, .1);--shadow-sm: 0 2px 8px rgba(0, 0, 0, .06);--shadow-md: 0 4px 16px rgba(0, 0, 0, .1);--shadow-lg: 0 8px 32px rgba(0, 0, 0, .15);--shadow-xl: 0 20px 60px rgba(0, 0, 0, .15);--scrollbar-thumb: #d1d1d6;--scrollbar-thumb-hover: #b4b4b9;--overlay: rgba(0, 0, 0, .5);--overlay-light: rgba(0, 0, 0, .5);--overlay-heavy: rgba(0, 0, 0, .6);--btn-bg: #f9f9f9;--btn-text: #213547;--btn-primary-text: #fff;--btn-border: rgba(0, 0, 0, .1);--btn-hover-bg: rgba(0, 0, 0, .06);--border-color: rgba(0, 0, 0, .08);--border-light: rgba(0, 0, 0, .05);--primary-color: #007aff;--primary-bg-hover: rgba(0, 122, 255, .1);--primary-shadow: rgba(0, 122, 255, .25);--success-color: #34c759;--warning-color: #ff9500;--shadow-xs: 0 1px 4px rgba(0, 0, 0, .04);--input-bg: #fff;--input-border: #ddd;--input-focus-border: #007bff;--input-focus-shadow: rgba(0, 123, 255, .1);--link-color: #646cff;--link-hover: #535bf2}',
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
    s = t
  ;(a.createRoot = s.createRoot), (a.hydrateRoot = s.hydrateRoot)
  var n = { exports: {} },
    l = {},
    i = e,
    o = Symbol.for('react.element'),
    r = Symbol.for('react.fragment'),
    d = Object.prototype.hasOwnProperty,
    c = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    _ = { key: !0, ref: !0, __self: !0, __source: !0 }
  function m(e, t, a) {
    var s,
      n = {},
      l = null,
      i = null
    for (s in (void 0 !== a && (l = '' + a),
    void 0 !== t.key && (l = '' + t.key),
    void 0 !== t.ref && (i = t.ref),
    t))
      d.call(t, s) && !_.hasOwnProperty(s) && (n[s] = t[s])
    if (e && e.defaultProps)
      for (s in (t = e.defaultProps)) void 0 === n[s] && (n[s] = t[s])
    return { $$typeof: o, type: e, key: l, ref: i, props: n, _owner: c.current }
  }
  ;(l.Fragment = r), (l.jsx = m), (l.jsxs = m), (n.exports = l)
  var u = n.exports
  const p = () =>
    'undefined' != typeof window && 'undefined' != typeof GM_xmlhttpRequest
  async function h(e, t = {}) {
    const {
      method: a = 'GET',
      headers: s = {},
      body: n,
      timeout: l = 3e4,
      signal: i,
    } = t
    if (p())
      return new Promise((t, o) => {
        const r = { 'Content-Type': 'application/json', ...s }
        let d
        if (
          (l > 0 &&
            (d = window.setTimeout(() => {
              o(new Error('Request timeout'))
            }, l)),
          null == i ? void 0 : i.aborted)
        )
          return void o(new Error('Request aborted'))
        const c = () => {
          d && clearTimeout(d), o(new Error('Request aborted'))
        }
        null == i || i.addEventListener('abort', c),
          GM_xmlhttpRequest({
            method: a.toUpperCase(),
            url: e,
            headers: r,
            data: n,
            timeout: l,
            onload: e => {
              d && clearTimeout(d),
                null == i || i.removeEventListener('abort', c)
              const a = {
                ok: e.status >= 200 && e.status < 300,
                status: e.status,
                statusText: e.statusText,
                headers: v(e.responseHeaders),
                json: async () => {
                  try {
                    return JSON.parse(e.responseText)
                  } catch (t) {
                    throw new Error('Invalid JSON response')
                  }
                },
                text: async () => e.responseText,
              }
              t(a)
            },
            onerror: e => {
              d && clearTimeout(d),
                null == i || i.removeEventListener('abort', c),
                o(new Error(`Network error: ${e.error || 'Unknown error'}`))
            },
            ontimeout: () => {
              d && clearTimeout(d),
                null == i || i.removeEventListener('abort', c),
                o(new Error('Request timeout'))
            },
          })
      })
    {
      const t = {
        method: a,
        headers: { 'Content-Type': 'application/json', ...s },
        body: n,
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
  const v = e => {
      const t = {}
      return e
        ? (e.split('\n').forEach(e => {
            const a = e.split(': ')
            2 === a.length && (t[a[0].toLowerCase()] = a[1])
          }),
          t)
        : t
    },
    x = (e, t) => {
      try {
        p() && 'undefined' != typeof GM_setValue
          ? GM_setValue(e, t)
          : 'undefined' != typeof localStorage && localStorage.setItem(e, t)
      } catch (a) {}
    },
    g = e => {
      try {
        return p() && 'undefined' != typeof GM_getValue
          ? GM_getValue(e, null)
          : 'undefined' != typeof localStorage
            ? localStorage.getItem(e)
            : null
      } catch (t) {
        return null
      }
    },
    b = e => {
      try {
        p() && 'undefined' != typeof GM_deleteValue
          ? GM_deleteValue(e)
          : 'undefined' != typeof localStorage && localStorage.removeItem(e)
      } catch (t) {}
    },
    j = '1.5.2',
    f = {
      DEEPSEEK_BASE_URL: 'https://api.deepseek.com/v1',
      REQUEST_TIMEOUT: 3e4,
    },
    N = {
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
    y = 'https://gitlab.example.com',
    E = '请输入您的GitLab Personal Access Token',
    k = '请输入您的DeepSeek API Key',
    w = '请根据以下GitLab事件数据生成工作周报...',
    C = 'gitlab_weekly_report_config'
  class T {
    /**
     * 创建API错误
     */
    static createApiError(e, t, a) {
      const s = new Error(`[${a}] ${t}`)
      return (s.name = 'ApiError'), (s.status = e), (s.service = a), s
    }
    /**
     * 创建响应错误
     */ static createResponseError(e, t) {
      const a = new Error(`[${t}] ${e}`)
      return (a.name = 'ResponseError'), (a.service = t), a
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
      return e instanceof Error
        ? 'ApiError' === e.name ||
          'NetworkError' === e.name ||
          'ConfigError' === e.name
          ? e.message
          : e.message.includes('fetch')
            ? '网络连接失败，请检查网络连接后重试'
            : e.message.includes('timeout')
              ? '请求超时，请稍后重试'
              : e.message.includes('CORS')
                ? '跨域请求被阻止，请检查服务器配置'
                : e.message
        : 'string' == typeof e
          ? e
          : '发生未知错误，请稍后重试'
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
      } catch (s) {
        return this.logError(s, a), t
      }
    }
    /**
     * 安全地执行同步操作，自动处理错误
     */ static safeSync(e, t, a) {
      try {
        return e()
      } catch (s) {
        return this.logError(s, a), t
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
      return (
        e instanceof Error &&
        ('NetworkError' === e.name ||
          e.message.includes('fetch') ||
          e.message.includes('network') ||
          e.message.includes('timeout'))
      )
    }
  }
  const S = e => {
      try {
        x(C, JSON.stringify(e))
      } catch (t) {
        'undefined' != typeof localStorage &&
          localStorage.setItem(C, JSON.stringify(e))
      }
    },
    D = () => {
      try {
        const e = g(C)
        return e ? JSON.parse(e) : null
      } catch (e) {
        try {
          if ('undefined' != typeof localStorage) {
            const e = localStorage.getItem(C)
            return e ? JSON.parse(e) : null
          }
        } catch (t) {}
        return null
      }
    },
    M = () => {
      try {
        b(C)
      } catch (e) {
        'undefined' != typeof localStorage && localStorage.removeItem(C)
      }
    },
    $ = '请先完善GitLab和DeepSeek配置信息',
    A = '请先完善配置信息',
    L = '请至少选择一个事件来生成周报',
    I = '请检查筛选条件或GitLab配置',
    O = {
      config: N,
      reportData: null,
      isLoading: !1,
      error: null,
      theme: N.theme,
      activePanel: 'main',
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
    }
  function U() {
    const [t, a] = e.useState(O)
    e.useEffect(() => {
      ;(async () => {
        try {
          const e = await D()
          a(t => {
            const a = e ? { ...N, ...e } : N
            return { ...t, config: a, theme: a.theme || N.theme }
          })
        } catch (e) {
          a(e => ({ ...e, config: N, theme: N.theme }))
        }
      })()
    }, [])
    const s = e.useCallback(e => {
        a(t => {
          const a = { ...t.config, ...e }
          try {
            S(a)
          } catch (s) {}
          return { ...t, config: a }
        })
      }, []),
      n = e.useCallback(e => {
        a(t => ({ ...t, activePanel: e }))
      }, []),
      l = e.useCallback(e => {
        a(t => ({
          ...t,
          filterConditions: e,
          paginationOptions: { ...t.paginationOptions, page: 1 },
        }))
      }, []),
      i = e.useCallback(e => {
        a(t => ({ ...t, sortOptions: e }))
      }, []),
      o = e.useCallback(e => {
        a(t => ({ ...t, paginationOptions: { ...t.paginationOptions, ...e } }))
      }, []),
      r = e.useCallback(e => {
        a(t => ({ ...t, events: e }))
      }, []),
      d = e.useCallback(e => {
        a(t => ({
          ...t,
          totalCount: e,
          paginationOptions: { ...t.paginationOptions, total: e },
        }))
      }, []),
      c = e.useCallback(e => {
        a(t => ({ ...t, aiGenerationConfig: e }))
      }, []),
      _ = e.useCallback(e => {
        a(t => ({ ...t, isLoading: e }))
      }, []),
      m = e.useCallback(e => {
        a(t => ({ ...t, error: e }))
      }, []),
      u = e.useCallback(e => {
        a(t => ({ ...t, reportData: e }))
      }, []),
      p = e.useCallback(e => {
        a(t => {
          const a = { ...t.config, theme: e }
          try {
            S(a)
          } catch (s) {}
          return { ...t, config: a, theme: e }
        })
      }, []),
      h = e.useCallback(() => {
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
            S(a)
          } catch (s) {}
          return { ...e, config: a, theme: t }
        })
      }, []),
      v = e.useCallback(() => {
        a(O), M()
      }, []),
      x = e.useCallback(() => {
        const {
          gitlabUrl: e,
          gitlabToken: a,
          deepseekApiKey: s,
          defaultPrompt: n,
        } = t.config
        return !!(e.trim() && a.trim() && s.trim() && n.trim())
      }, [t.config]),
      g = e.useCallback(() => {
        const e = new Date(),
          a = t.filterConditions.timeRange,
          s = 864e5,
          n = new Date(e.getTime() + s)
        if ('week' === a) {
          const t = e.getDay()
          let a = 0 === t ? 6 : t - 1
          1 === t && (a += 1)
          return {
            startDate: new Date(e.getTime() - a * s)
              .toISOString()
              .split('T')[0],
            endDate: n.toISOString().split('T')[0],
          }
        }
        let l = 7
        l = { '7d': 7, '30d': 30, '90d': 90, '180d': 180, '365d': 365 }[a] || 7
        return {
          startDate: new Date(e.getTime() - l * s).toISOString().split('T')[0],
          endDate: n.toISOString().split('T')[0],
        }
      }, [t.filterConditions.timeRange])
    return {
      state: t,
      updateConfig: s,
      setActivePanel: n,
      updateFilterConditions: l,
      updateSortOptions: i,
      updatePaginationOptions: o,
      setEvents: r,
      setTotal: d,
      setAIGenerationConfig: c,
      setLoading: _,
      setError: m,
      setReportData: u,
      setTheme: p,
      toggleTheme: h,
      resetState: v,
      isConfigValid: x,
      getTimeRange: g,
    }
  }
  const R = 'index-module__main-panel__82FLm',
    P = 'index-module__panel-header__kyx4p',
    G = 'index-module__header-left__xT1T5',
    q = 'index-module__config-status__CgP3u',
    B = 'index-module__status-indicator__-GO2B',
    F = 'index-module__status-icon__fpfqN',
    z = 'index-module__config-valid__3xaIL',
    K = 'index-module__config-invalid__-eGA8',
    J = 'index-module__header-right__7F8Bo',
    Y = 'index-module__action-btn__x4IAP',
    H = 'index-module__icon__tX8wX',
    Q = 'index-module__settings-btn__vsg3u',
    V = 'index-module__ai-btn__5kAV3',
    X = 'index-module__filter-section__gMBIz',
    Z = 'index-module__filter-section-content__A3AOe',
    W = 'index-module__filter-group__hk7qq',
    ee = 'index-module__filter-label__TDZ3H',
    te = 'index-module__filter-options__4AUEQ',
    ae = 'index-module__filter-option__-CSf1',
    se = 'index-module__active__Mr5KU',
    ne = 'index-module__events-section__gJwdk',
    le = [
      { value: 'week', label: '本周' },
      { value: '7d', label: '最近7天' },
      { value: '30d', label: '最近30天' },
      { value: '90d', label: '最近90天' },
      { value: '180d', label: '最近180天' },
      { value: '365d', label: '最近365天' },
    ],
    ie = [
      // { value: 'epic', label: 'Epic (需要启用新外观)' },
      { value: 'issue', label: 'Issue' },
      { value: 'merge_request', label: 'Merge Request' },
      { value: 'milestone', label: 'Milestone' },
      { value: 'note', label: 'Note' },
      { value: 'project', label: 'Project' },
      { value: 'snippet', label: 'Snippet' },
      { value: 'user', label: 'User' },
    ],
    oe = [
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
    re = ({ filterConditions: e, onFilterChange: t }) =>
      u.jsxs('div', {
        className: Z,
        children: [
          u.jsxs('div', {
            className: W,
            children: [
              u.jsx('label', { className: ee, children: '时间范围' }),
              u.jsx('div', {
                className: te,
                children: le.map(a =>
                  u.jsx(
                    'button',
                    {
                      className: `${ae} ${e.timeRange === a.value ? se : ''}`,
                      onClick: () => {
                        return (s = a.value), void t({ ...e, timeRange: s })
                        var s
                      },
                      children: a.label,
                    },
                    a.value,
                  ),
                ),
              }),
            ],
          }),
          u.jsxs('div', {
            className: W,
            children: [
              u.jsx('label', { className: ee, children: '目标类型' }),
              u.jsxs('div', {
                className: te,
                children: [
                  u.jsx('button', {
                    className: `${ae} ${0 === e.targetType.length ? se : ''}`,
                    onClick: () => t({ ...e, targetType: [] }),
                    children: '全部',
                  }),
                  ie.map(a =>
                    u.jsx(
                      'button',
                      {
                        className: `${ae} ${e.targetType.includes(a.value) ? se : ''}`,
                        onClick: () =>
                          ((a, s) => {
                            const n = s
                              ? [...e.targetType, a]
                              : e.targetType.filter(e => e !== a)
                            t({ ...e, targetType: n })
                          })(a.value, !e.targetType.includes(a.value)),
                        children: a.label,
                      },
                      a.value,
                    ),
                  ),
                ],
              }),
            ],
          }),
          u.jsxs('div', {
            className: W,
            children: [
              u.jsx('label', { className: ee, children: '操作类型' }),
              u.jsxs('div', {
                className: te,
                children: [
                  u.jsx('button', {
                    className: `${ae} ${0 === e.action.length ? se : ''}`,
                    onClick: () => t({ ...e, action: [] }),
                    children: '全部',
                  }),
                  oe.map(a =>
                    u.jsx(
                      'button',
                      {
                        className: `${ae} ${e.action.includes(a.value) ? se : ''}`,
                        onClick: () =>
                          ((a, s) => {
                            const n = s
                              ? [...e.action, a]
                              : e.action.filter(e => e !== a)
                            t({ ...e, action: n })
                          })(a.value, !e.action.includes(a.value)),
                        children: a.label,
                      },
                      a.value,
                    ),
                  ),
                ],
              }),
            ],
          }),
        ],
      }),
    de = 'index-module__pagination__5dauU',
    ce = 'index-module__pagination-info__xbUbw',
    _e = 'index-module__pagination-controls__q2hqL',
    me = 'index-module__pagination-btn__P1OCG',
    ue = 'index-module__disabled__BywdX',
    pe = 'index-module__active__lSJu-',
    he = 'index-module__pagination-ellipsis__gQnax',
    ve = 'index-module__pagination-size-changer__SufyI',
    xe = 'index-module__pagination-select__JwvbH',
    ge = ({
      current: t,
      pageSize: a,
      total: s,
      onChange: n,
      showSizeChanger: l = !0,
      pageSizeOptions: i = [20, 50, 100, 200],
      onShowSizeChange: o,
      selectedCount: r = 0,
    }) => {
      const d = Math.ceil(s / a),
        c = (t - 1) * a + 1,
        _ = Math.min(t * a, s),
        m = e => {
          e >= 1 && e <= d && e !== t && n(e)
        }
      return 0 === s
        ? u.jsx('div', {
            className: de,
            children: u.jsx('div', { className: ce, children: '暂无数据' }),
          })
        : u.jsxs('div', {
            className: de,
            children: [
              u.jsxs('div', {
                className: ce,
                children: [
                  '显示 ',
                  c,
                  '-',
                  _,
                  ' 条，共 ',
                  s,
                  ' 条',
                  r > 0 ? `，已选中 ${r} 条` : '',
                ],
              }),
              u.jsxs('div', {
                className: _e,
                children: [
                  u.jsx('button', {
                    className: `${me} ${1 === t ? ue : ''}`,
                    onClick: () => m(t - 1),
                    disabled: 1 === t,
                    children: u.jsx('span', { children: '‹' }),
                  }),
                  (() => {
                    const e = []
                    if (d <= 7)
                      e.push(...Array.from({ length: d }, (e, t) => t + 1))
                    else {
                      e.push(1), t > 4 && e.push('...')
                      const a = Math.max(2, t - 2),
                        s = Math.min(d - 1, t + 2)
                      e.push(
                        ...Array.from({ length: s - a + 1 }, (e, t) => a + t),
                      ),
                        t < d - 2 - 1 && e.push('...'),
                        d > 1 && e.push(d)
                    }
                    return e
                  })().map((a, s) =>
                    u.jsx(
                      e.Fragment,
                      {
                        children:
                          'number' == typeof a
                            ? u.jsx('button', {
                                className: `${me} ${t === a ? pe : ''}`,
                                onClick: () => m(a),
                                children: a,
                              })
                            : u.jsx('span', { className: he, children: a }),
                      },
                      s,
                    ),
                  ),
                  u.jsx('button', {
                    className: `${me} ${t === d ? ue : ''}`,
                    onClick: () => m(t + 1),
                    disabled: t === d,
                    children: u.jsx('span', { children: '›' }),
                  }),
                ],
              }),
              l &&
                u.jsxs('div', {
                  className: ve,
                  children: [
                    u.jsx('span', { children: '每页' }),
                    u.jsx('select', {
                      value: a,
                      onChange: e => {
                        return (t = Number(e.target.value)), void (o && o(1, t))
                        var t
                      },
                      className: xe,
                      children: i.map(e =>
                        u.jsx('option', { value: e, children: e }, e),
                      ),
                    }),
                    u.jsx('span', { children: '条' }),
                  ],
                }),
            ],
          })
    },
    be = 'EventsList-module__events-list__Z2gnl',
    je = 'EventsList-module__events-list-header__i8ZCs',
    fe = 'EventsList-module__header-cell__tSGKU',
    Ne = 'EventsList-module__checkbox-cell__YvmEK',
    ye = 'EventsList-module__content-cell__aiH0X',
    Ee = 'EventsList-module__action-cell__BBBS7',
    ke = 'EventsList-module__time-cell__F02or',
    we = 'EventsList-module__detail-cell__soty-',
    Ce = 'EventsList-module__sort-icon__OkgLv',
    Te = 'EventsList-module__events-list-body__Pcosk',
    Se = 'EventsList-module__event-row__ka77Q',
    De = 'EventsList-module__selected__YUioo',
    Me = 'EventsList-module__cell__5Y8iC',
    $e = 'EventsList-module__event-icon__52LqG',
    Ae = 'EventsList-module__event-content__I8le1',
    Le = 'EventsList-module__event-title__wVvqr',
    Ie = 'EventsList-module__event-description__GZfW0',
    Oe = 'EventsList-module__action-tag__IBpm0',
    Ue = 'EventsList-module__event-time__RCPoO',
    Re = 'EventsList-module__detail-btn__PLLL4',
    Pe = 'EventsList-module__detail-icon__eATZo',
    Ge = 'EventsList-module__empty-state__Z-gwH',
    qe = 'EventsList-module__empty-icon__R7-ij',
    Be = 'EventsList-module__events-list-footer__7LiRc',
    Fe = 'EventsList-module__events-list-loading__pcl-h',
    ze = 'EventsList-module__loading-spinner__rJ-Jy',
    Ke = 'EventsList-module__checkbox-container__L1if8',
    Je = 'EventsList-module__checkmark__-GyO9',
    Ye = ({
      events: e,
      totalCount: t,
      loading: a,
      sortOptions: s,
      onSortChange: n,
      paginationOptions: l,
      onPaginationChange: i,
      selectedEventIds: o,
      onEventSelect: r,
      onSelectAll: d,
      onEventDetail: c,
    }) => {
      const _ = e.length > 0 && e.every(e => o.includes(e.id)),
        m = o.length > 0 && !_,
        p = e => {
          const t = new Date(e),
            a = new Date(),
            s = new Date(a.getFullYear(), a.getMonth(), a.getDate()),
            n = new Date(s.getTime() - 864e5),
            l = new Date(t.getFullYear(), t.getMonth(), t.getDate())
          if (l.getTime() === s.getTime())
            return `今天 ${t.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
          if (l.getTime() === n.getTime())
            return `昨天 ${t.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
          {
            const e = s.getTime() - l.getTime(),
              a = Math.floor(e / 864e5)
            return a > 0 && a <= 7
              ? `${a}天前`
              : t.toLocaleDateString('zh-CN', {
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })
          }
        },
        h = e => {
          if (e.push_data) return `推送到分支 ${e.push_data.ref}`
          if (e.note) {
            const t = 50
            return `评论: ${e.note.body.replace(/\n/g, ' ').substring(0, t)}${e.note.body.length > t ? '...' : ''}`
          }
          return 'joined' === e.action_name
            ? '加入项目'
            : e.title || e.target_title || '无标题'
        },
        v = e => {
          var t
          return e.push_data
            ? `${e.push_data.commit_count} 个提交: ${e.push_data.commit_title}`
            : e.note && e.target_title
              ? e.target_title
              : (null == (t = e.project) ? void 0 : t.path_with_namespace)
                ? e.project.path_with_namespace
                : e.project_id
                  ? `项目ID: ${e.project_id}`
                  : '未知项目'
        }
      return a
        ? u.jsxs('div', {
            className: Fe,
            children: [
              u.jsx('div', { className: ze }),
              u.jsx('p', { children: '正在加载事件数据...' }),
            ],
          })
        : u.jsxs('div', {
            className: be,
            children: [
              u.jsxs('div', {
                className: je,
                children: [
                  u.jsx('div', {
                    className: `${fe} ${Ne}`,
                    children: u.jsxs('label', {
                      className: Ke,
                      children: [
                        u.jsx('input', {
                          type: 'checkbox',
                          checked: _,
                          ref: e => {
                            e && (e.indeterminate = m)
                          },
                          onChange: () => {
                            d(!_)
                          },
                          title: _ ? '取消全选' : '全选',
                        }),
                        u.jsx('span', { className: Je }),
                      ],
                    }),
                  }),
                  u.jsx('div', {
                    className: `${fe} ${ye}`,
                    children: u.jsx('span', { children: '标题和内容' }),
                  }),
                  u.jsx('div', {
                    className: `${fe} ${Ee}`,
                    children: u.jsx('span', { children: '操作' }),
                  }),
                  u.jsxs('div', {
                    className: `${fe} ${ke}`,
                    onClick: () =>
                      (e => {
                        const t =
                          s.field === e && 'desc' === s.order ? 'asc' : 'desc'
                        n({ field: e, order: t })
                      })('created_at'),
                    children: [
                      u.jsx('span', { children: '时间' }),
                      u.jsx('span', {
                        className: Ce,
                        children:
                          ((x = 'created_at'),
                          s.field !== x ? '' : 'desc' === s.order ? '↓' : '↑'),
                      }),
                    ],
                  }),
                  u.jsx('div', { className: `${fe} ${we}`, children: '详情' }),
                ],
              }),
              u.jsx('div', {
                className: Te,
                children:
                  0 === e.length
                    ? u.jsxs('div', {
                        className: Ge,
                        children: [
                          u.jsx('div', { className: qe, children: '📄' }),
                          u.jsx('p', { children: '暂无事件数据' }),
                          u.jsx('span', { children: I }),
                        ],
                      })
                    : e.map(e => {
                        const t = o.includes(e.id),
                          {
                            icon: a,
                            title: s,
                            actionType: n,
                          } = (e => {
                            const { action_name: t, target_type: a } = e
                            if (e.push_data) {
                              const { action: t, ref_type: a } = e.push_data
                              return 'pushed' === t && 'branch' === a
                                ? {
                                    icon: '⬆️',
                                    actionType: '分支推送',
                                    title: `推送到分支 ${e.push_data.ref}`,
                                  }
                                : 'pushed' === t && 'tag' === a
                                  ? {
                                      icon: '🏷️',
                                      actionType: '标签推送',
                                      title: `推送标签 ${e.push_data.ref}`,
                                    }
                                  : {
                                      icon: '📤',
                                      actionType: '推送',
                                      title: `推送到分支 ${e.push_data.ref}`,
                                    }
                            }
                            if (a && '' !== a.trim()) {
                              const t = {
                                MergeRequest: { icon: '⤴️', actionType: 'MR' },
                                Issue: { icon: '⚠️', actionType: 'Issue' },
                                Commit: { icon: '💾', actionType: '提交' },
                                Note: { icon: '💬', actionType: '评论' },
                                DiscussionNote: {
                                  icon: '🗣️',
                                  actionType: '讨论-评论',
                                },
                                DiffNote: {
                                  icon: '📝',
                                  actionType: '代码-评论',
                                },
                                Project: { icon: '📁', actionType: '项目' },
                                Milestone: { icon: '🎯', actionType: '里程碑' },
                                Epic: { icon: '🎪', actionType: 'Epic' },
                                Snippet: { icon: '✂️', actionType: '代码片段' },
                                User: { icon: '👤', actionType: '用户' },
                              }[a]
                              if (t)
                                return {
                                  icon: t.icon,
                                  actionType: t.actionType,
                                  title: h(e),
                                }
                            }
                            const s = {
                              'pushed to': { icon: '⬆️', actionType: '推送' },
                              'pushed new': {
                                icon: '⬆️',
                                actionType: '推送新分支',
                              },
                              opened: { icon: '🆕', actionType: '开启' },
                              closed: { icon: '✅', actionType: '关闭' },
                              merged: { icon: '🔀', actionType: '合并' },
                              'commented on': {
                                icon: '💬',
                                actionType: '评论',
                              },
                              joined: { icon: '👋', actionType: '加入' },
                              left: { icon: '👋', actionType: '离开' },
                              created: { icon: '✨', actionType: '创建' },
                              updated: { icon: '🔄', actionType: '更新' },
                              deleted: { icon: '🗑️', actionType: '删除' },
                              approved: { icon: '✅', actionType: '批准' },
                              unapproved: {
                                icon: '❌',
                                actionType: '取消批准',
                              },
                            }[t]
                            return s
                              ? {
                                  icon: s.icon,
                                  actionType: s.actionType,
                                  title: h(e),
                                }
                              : {
                                  icon: '📋',
                                  actionType: a || t || '未知操作',
                                  title: h(e),
                                }
                          })(e)
                        return u.jsxs(
                          'div',
                          {
                            className: `${Se} ${t ? De : ''}`,
                            children: [
                              u.jsx('div', {
                                className: `${Me} ${Ne}`,
                                children: u.jsxs('label', {
                                  className: Ke,
                                  children: [
                                    u.jsx('input', {
                                      type: 'checkbox',
                                      checked: t,
                                      onChange: () =>
                                        (e => {
                                          const t = o.includes(e)
                                          r(e, !t)
                                        })(e.id),
                                      title: t ? '取消选择' : '选择此事件',
                                    }),
                                    u.jsx('span', { className: Je }),
                                  ],
                                }),
                              }),
                              u.jsxs('div', {
                                className: `${Me} ${ye}`,
                                children: [
                                  u.jsx('div', { className: $e, children: a }),
                                  u.jsxs('div', {
                                    className: Ae,
                                    children: [
                                      u.jsx('div', {
                                        className: Le,
                                        children: s,
                                      }),
                                      u.jsx('div', {
                                        className: Ie,
                                        children: v(e),
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              u.jsx('div', {
                                className: `${Me} ${Ee}`,
                                children: u.jsx('span', {
                                  className: Oe,
                                  children: n,
                                }),
                              }),
                              u.jsx('div', {
                                className: `${Me} ${ke}`,
                                children: u.jsx('span', {
                                  className: Ue,
                                  children: p(e.created_at),
                                }),
                              }),
                              u.jsx('div', {
                                className: `${Me} ${we}`,
                                children: u.jsx('button', {
                                  className: Re,
                                  onClick: () => c(e),
                                  title: '查看详情',
                                  children: u.jsx('span', {
                                    className: Pe,
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
              u.jsx('div', {
                className: Be,
                children: u.jsx(ge, {
                  current: l.page,
                  pageSize: l.pageSize,
                  total: t,
                  onChange: e => i({ ...l, page: e }),
                  showSizeChanger: !0,
                  onShowSizeChange: (e, a) =>
                    i({ page: e, pageSize: a, total: t }),
                  selectedCount: o.length,
                }),
              }),
            ],
          })
      var x
    },
    He = 'index-module__action-btn__To7Ms',
    Qe = 'index-module__checking__QepNt',
    Ve = 'index-module__version-btn__8d3di',
    Xe = 'index-module__has-update__tNkZZ',
    Ze = 'index-module__icon__EhhVu',
    We = 'index-module__text__4iX-h',
    et = 'index-module__notification-overlay__E4dh-',
    tt = 'index-module__notification__ckX1l',
    at = 'index-module__notification-header__nJZ3Q',
    st = 'index-module__close-btn__9uULv',
    nt = 'index-module__notification-body__nnab7',
    lt = 'index-module__version-info__-pyIP',
    it = 'index-module__release-notes__iU2jG',
    ot = 'index-module__notes-content__ZpxxA',
    rt = 'index-module__notification-footer__La-ia',
    dt = 'index-module__later-btn__Q40Lc',
    ct = 'index-module__update-btn__lD1V2',
    _t = ({ currentVersion: t }) => {
      const [a, s] = e.useState(null),
        [n, l] = e.useState(!1),
        [i, o] = e.useState(!1),
        [r, d] = e.useState(!1),
        [c, _] = e.useState(null),
        [m, p] = e.useState(null),
        [v, x] = e.useState(!1),
        [g, b] = e.useState(new Set())
      e.useEffect(() => {
        try {
          const e = localStorage.getItem(
            'gitlab-weekly-report-dismissed-versions',
          )
          e && b(new Set(JSON.parse(e)))
        } catch (e) {}
      }, [])
      const j = e.useCallback((e, t) => {
          const a = e.split('.').map(Number),
            s = t.split('.').map(Number),
            n = Math.max(a.length, s.length)
          for (let l = 0; l < n; l++) {
            const e = a[l] || 0,
              t = s[l] || 0
            if (t > e) return !0
            if (t < e) return !1
          }
          return !1
        }, []),
        f = e.useCallback(
          async (e = !0) => {
            if (!n)
              if (v && a && i && e) (!e && g.has(a.version)) || d(!0)
              else {
                l(!0), p(null)
                try {
                  const a = new AbortController(),
                    n = setTimeout(() => a.abort(), 1e4),
                    l = Date.now(),
                    i = 'undefined' != typeof GM_xmlhttpRequest,
                    r =
                      !1 && !i
                        ? '/api/github/imzusheng/tm_gitlabWeeklyReport/v2/package.json'
                        : 'https://raw.githubusercontent.com/imzusheng/tm_gitlabWeeklyReport/v2/package.json',
                    c = await h(`${r}?t=${l}`, {
                      method: 'GET',
                      headers: { Accept: 'application/json' },
                      signal: a.signal,
                      timeout: 1e4,
                    })
                  if ((clearTimeout(n), !c.ok))
                    throw new Error(`HTTP ${c.status}: ${c.statusText}`)
                  const m = await c.json(),
                    u = {
                      version: m.version,
                      downloadUrl:
                        'https://github.com/imzusheng/tm_gitlabWeeklyReport/raw/v2/dist/userscript/gitlab-weekly-report.user.js',
                      releaseNotes: `版本 ${m.version} 已发布，请及时更新以获得最新功能和修复。`,
                    }
                  s(u), _(new Date()), x(!0)
                  const p = j(t, u.version)
                  o(p), p && ((!e && g.has(u.version)) || d(!0))
                } catch (r) {
                  const e = r instanceof Error ? r.message : '检查更新失败'
                  p(e)
                } finally {
                  l(!1)
                }
              }
          },
          [n, j, t, g, v, a, i],
        )
      e.useEffect(() => {
        const e = setTimeout(() => {
          f(!1)
        }, 1e3)
        return () => clearTimeout(e)
      }, [])
      const N = e.useCallback(async () => {
          ;(null == a ? void 0 : a.downloadUrl) &&
            (window.open(a.downloadUrl, '_blank'),
            d(!1),
            setTimeout(async () => {
              await f(!1)
              j(t, a.version)
            }, 1e3))
        }, [a, f, j, t]),
        y = e.useCallback(() => {
          b(new Set())
          try {
            localStorage.removeItem('gitlab-weekly-report-dismissed-versions')
          } catch (e) {}
        }, []),
        E = e.useCallback(() => {
          if ((d(!1), a)) {
            const t = new Set(g)
            t.add(a.version), b(t)
            try {
              localStorage.setItem(
                'gitlab-weekly-report-dismissed-versions',
                JSON.stringify(Array.from(t)),
              )
            } catch (e) {}
          }
        }, [a, g]),
        k = e.useCallback(
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
            n
              ? '检查中...'
              : m
                ? '检查失败'
                : i
                  ? '有更新'
                  : v && !i
                    ? '已是最新版本 🎉'
                    : '检查更新',
          [n, m, i, v],
        ),
        C = e.useCallback(
          () => (n ? '🔄' : m ? '⚠️' : i ? '🔴' : '🔍'),
          [n, m, i],
        )
      return (
        e.useEffect(() => {}, [y]),
        u.jsxs(u.Fragment, {
          children: [
            u.jsxs('button', {
              className: `${He} ${Ve} ${n ? Qe : ''} ${i ? Xe : ''}`,
              onClick: () => f(!0),
              disabled: n,
              title: c
                ? `上次检查: ${k(c)}${m ? `\n错误: ${m}` : ''}`
                : '点击检查更新',
              children: [
                u.jsx('span', { className: Ze, children: C() }),
                u.jsx('span', { className: We, children: w() }),
              ],
            }),
            r &&
              i &&
              a &&
              u.jsx('div', {
                className: et,
                children: u.jsxs('div', {
                  className: tt,
                  children: [
                    u.jsxs('div', {
                      className: at,
                      children: [
                        u.jsx('h3', { children: '🎉 发现新版本' }),
                        u.jsx('button', {
                          className: st,
                          onClick: E,
                          children: '×',
                        }),
                      ],
                    }),
                    u.jsxs('div', {
                      className: nt,
                      children: [
                        u.jsxs('div', {
                          className: lt,
                          children: [
                            u.jsxs('p', {
                              children: [
                                u.jsx('strong', { children: '当前版本:' }),
                                ' v',
                                t,
                              ],
                            }),
                            u.jsxs('p', {
                              children: [
                                u.jsx('strong', { children: '最新版本:' }),
                                ' v',
                                a.version,
                              ],
                            }),
                          ],
                        }),
                        a.releaseNotes &&
                          u.jsxs('div', {
                            className: it,
                            children: [
                              u.jsx('h4', { children: '更新说明:' }),
                              u.jsx('div', {
                                className: ot,
                                children: a.releaseNotes,
                              }),
                            ],
                          }),
                      ],
                    }),
                    u.jsxs('div', {
                      className: rt,
                      children: [
                        u.jsx('button', {
                          className: dt,
                          onClick: E,
                          children: '稍后更新',
                        }),
                        u.jsx('button', {
                          className: ct,
                          onClick: N,
                          children: '立即更新',
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          ],
        })
      )
    },
    mt = ({
      events: e,
      totalCount: t,
      loading: a,
      filterConditions: s,
      sortOptions: n,
      paginationOptions: l,
      selectedEventIds: i,
      onFilterChange: o,
      onSortChange: r,
      onPaginationChange: d,
      onEventSelect: c,
      onSelectAll: _,
      onEventDetail: m,
      onOpenSettings: p,
      onOpenAI: h,
    }) => {
      const { isConfigValid: v } = U()
      return u.jsxs('div', {
        className: R,
        children: [
          u.jsxs('div', {
            className: P,
            children: [
              u.jsxs('div', {
                className: G,
                children: [
                  u.jsx('h1', { children: 'GitLab Events' }),
                  u.jsx('div', {
                    className: q,
                    children: v()
                      ? u.jsxs('span', {
                          className: `${B} ${z}`,
                          children: [
                            u.jsx('span', { className: F, children: '✅' }),
                            '配置完整',
                          ],
                        })
                      : u.jsxs('span', {
                          className: `${B} ${K}`,
                          children: [
                            u.jsx('span', { className: F, children: '❌' }),
                            '配置不完整',
                          ],
                        }),
                  }),
                ],
              }),
              u.jsxs('div', {
                className: J,
                children: [
                  u.jsx(_t, { currentVersion: j }),
                  u.jsxs('button', {
                    className: `${Y} ${Q}`,
                    onClick: p,
                    children: [
                      u.jsx('span', { className: H, children: '⚙️' }),
                      '设置',
                    ],
                  }),
                  u.jsxs('button', {
                    className: `${Y} ${V}`,
                    onClick: h,
                    children: [
                      u.jsx('span', { className: H, children: '🤖' }),
                      'AI 周报',
                    ],
                  }),
                ],
              }),
            ],
          }),
          u.jsx('div', {
            className: X,
            children: u.jsx(re, { filterConditions: s, onFilterChange: o }),
          }),
          u.jsx('div', {
            className: ne,
            children: u.jsx(Ye, {
              events: e,
              totalCount: t,
              loading: a,
              sortOptions: n,
              onSortChange: r,
              paginationOptions: l,
              onPaginationChange: d,
              selectedEventIds: i,
              onEventSelect: c,
              onSelectAll: _,
              onEventDetail: m,
            }),
          }),
        ],
      })
    },
    ut = 'index-module__modal-mask__XYxyO',
    pt = 'index-module__modal-wrapper__bVZip',
    ht = 'index-module__modal__QQS3u',
    vt = 'index-module__modal-header__GdUjX',
    xt = 'index-module__modal-title__cafB-',
    gt = 'index-module__modal-close__ZuUgf',
    bt = 'index-module__modal-body__j5X3U',
    jt = 'index-module__modal-footer__3q-wn',
    ft = ({
      visible: t,
      title: a,
      width: s = 520,
      maxHeight: n = window.innerHeight - 180,
      // 面板高度(100vh-120px)再减去60px上下边距
      children: l,
      footer: i,
      onClose: o,
      maskClosable: r = !0,
    }) => {
      if (
        (e.useEffect(() => {
          const e = e => {
            'Escape' === e.key && t && o()
          }
          return (
            t &&
              (document.addEventListener('keydown', e),
              (document.body.style.overflow = 'hidden')),
            () => {
              document.removeEventListener('keydown', e),
                (document.body.style.overflow = 'unset')
            }
          )
        }, [t, o]),
        !t)
      )
        return null
      return u.jsx('div', {
        id: 'gitlab-weekly-report-container',
        className: ut,
        onClick: e => {
          e.target === e.currentTarget && r && o()
        },
        children: u.jsx('div', {
          className: pt,
          children: u.jsxs('div', {
            className: ht,
            style: { width: s, maxHeight: n },
            children: [
              u.jsxs('div', {
                className: vt,
                children: [
                  u.jsx('div', { className: xt, children: a }),
                  u.jsx('button', {
                    className: gt,
                    onClick: o,
                    children: u.jsx('span', { children: '×' }),
                  }),
                ],
              }),
              u.jsx('div', { className: bt, children: l }),
              i && u.jsx('div', { className: jt, children: i }),
            ],
          }),
        }),
      })
    },
    Nt = 'index-module__settings-panel__UCg3H',
    yt = 'index-module__settings-tabs__vPH-t',
    Et = 'index-module__tab-button__FG9Nc',
    kt = 'index-module__tab-icon__rBe-o',
    wt = 'index-module__active__bsBC1',
    Ct = 'index-module__settings-content__TqQPH',
    Tt = 'index-module__tab-panel__Q2QUI',
    St = 'index-module__form-group__zKwiA',
    Dt = 'index-module__form-label__pwe7O',
    Mt = 'index-module__required__2vuyW',
    $t = 'index-module__form-input__jGbRP',
    At = 'index-module__form-select__jbXdq',
    Lt = 'index-module__form-textarea__fAVMw',
    It = 'index-module__form-hint__F0dFQ',
    Ot = 'index-module__version-info__y0NZv',
    Ut = 'index-module__version-text__bx0HU',
    Rt = 'index-module__settings-footer__qA44X',
    Pt = 'index-module__footer-right__bslDg',
    Gt = 'index-module__btn-primary__ZzzFI',
    qt = 'index-module__switch-container__5xk1J',
    Bt = 'index-module__switch-input__V-8fl',
    Ft = 'index-module__switch-label__xrOeQ',
    zt = 'index-module__switch-slider__dG-6J',
    Kt = 'index-module__btn-secondary__cRCpD',
    Jt = ({ isOpen: t, onClose: a, config: s, onSave: n, theme: l }) => {
      const [i, o] = e.useState(s),
        [r, d] = e.useState(l),
        [c, _] = e.useState('gitlab')
      e.useEffect(() => {
        o(s)
      }, [s]),
        e.useEffect(() => {
          d(l)
        }, [l]),
        e.useEffect(() => {
          t && (o(s), d(l))
        }, [t, s, l])
      const m = (e, t) => {
        o(a => ({ ...a, [e]: t }))
      }
      return u.jsx(ft, {
        visible: t,
        title: '系统设置',
        width: 600,
        onClose: a,
        footer: u.jsxs('div', {
          className: Rt,
          children: [
            u.jsx('button', {
              className: Kt,
              onClick: () => {
                o(s), d(l)
              },
              children: '重置',
            }),
            u.jsxs('div', {
              className: Pt,
              children: [
                u.jsx('button', {
                  className: Kt,
                  onClick: a,
                  children: '取消',
                }),
                u.jsx('button', {
                  className: Gt,
                  onClick: () => {
                    n(i, r), a()
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
        children: u.jsxs('div', {
          className: Nt,
          children: [
            u.jsxs('div', {
              className: yt,
              children: [
                u.jsxs('button', {
                  className: `${Et} ${'gitlab' === c ? wt : ''}`,
                  onClick: () => _('gitlab'),
                  children: [
                    u.jsx('span', { className: kt, children: '🦊' }),
                    'GitLab 配置',
                  ],
                }),
                u.jsxs('button', {
                  className: `${Et} ${'deepseek' === c ? wt : ''}`,
                  onClick: () => _('deepseek'),
                  children: [
                    u.jsx('span', { className: kt, children: '🤖' }),
                    'DeepSeek 配置',
                  ],
                }),
                u.jsxs('button', {
                  className: `${Et} ${'appearance' === c ? wt : ''}`,
                  onClick: () => _('appearance'),
                  children: [
                    u.jsx('span', { className: kt, children: '🎨' }),
                    '外观设置',
                  ],
                }),
              ],
            }),
            u.jsxs('div', {
              className: Ct,
              children: [
                'gitlab' === c &&
                  u.jsxs('div', {
                    className: Tt,
                    children: [
                      u.jsxs('div', {
                        className: St,
                        children: [
                          u.jsxs('label', {
                            className: Dt,
                            children: [
                              'GitLab 项目地址 ',
                              u.jsx('span', { className: Mt, children: '*' }),
                            ],
                          }),
                          u.jsx('input', {
                            type: 'text',
                            className: $t,
                            placeholder: y,
                            value: i.gitlabUrl,
                            onChange: e => m('gitlabUrl', e.target.value),
                          }),
                          u.jsx('div', {
                            className: It,
                            children: '请输入完整的 GitLab 项目 URL',
                          }),
                        ],
                      }),
                      u.jsxs('div', {
                        className: St,
                        children: [
                          u.jsxs('label', {
                            className: Dt,
                            children: [
                              '个人访问令牌 ',
                              u.jsx('span', { className: Mt, children: '*' }),
                            ],
                          }),
                          u.jsx('input', {
                            type: 'text',
                            className: $t,
                            placeholder: E,
                            value: i.gitlabToken,
                            onChange: e => m('gitlabToken', e.target.value),
                          }),
                          u.jsx('div', {
                            className: It,
                            children:
                              '在 GitLab 个人设置 → 访问令牌 中创建，需要 read_api 权限',
                          }),
                        ],
                      }),
                    ],
                  }),
                'deepseek' === c &&
                  u.jsxs('div', {
                    className: Tt,
                    children: [
                      u.jsxs('div', {
                        className: St,
                        children: [
                          u.jsxs('label', {
                            className: Dt,
                            children: [
                              'DeepSeek API Key ',
                              u.jsx('span', { className: Mt, children: '*' }),
                            ],
                          }),
                          u.jsx('input', {
                            type: 'text',
                            className: $t,
                            placeholder: k,
                            value: i.deepseekApiKey,
                            onChange: e => m('deepseekApiKey', e.target.value),
                          }),
                          u.jsx('div', {
                            className: It,
                            children: '在 DeepSeek 平台获取 API Key',
                          }),
                        ],
                      }),
                      u.jsxs('div', {
                        className: St,
                        children: [
                          u.jsx('label', {
                            className: Dt,
                            children: '使用的模型',
                          }),
                          u.jsxs('select', {
                            className: At,
                            value: i.model,
                            onChange: e => m('model', e.target.value),
                            children: [
                              u.jsx('option', {
                                value: 'deepseek-chat',
                                children: 'deepseek-chat',
                              }),
                              u.jsx('option', {
                                value: 'deepseek-coder',
                                children: 'deepseek-coder',
                              }),
                            ],
                          }),
                        ],
                      }),
                      u.jsxs('div', {
                        className: St,
                        children: [
                          u.jsx('label', {
                            className: Dt,
                            children: 'Token 数量限制',
                          }),
                          u.jsx('input', {
                            type: 'number',
                            className: $t,
                            min: '1000',
                            max: '10000',
                            placeholder: '4000',
                            value: i.tokenLimit,
                            onChange: e =>
                              m('tokenLimit', parseInt(e.target.value)),
                          }),
                          u.jsx('div', {
                            className: It,
                            children: '单次生成的最大 Token 数量（1000-10000）',
                          }),
                        ],
                      }),
                      u.jsxs('div', {
                        className: St,
                        children: [
                          u.jsxs('label', {
                            className: Dt,
                            children: [
                              '默认提示词 ',
                              u.jsx('span', { className: Mt, children: '*' }),
                            ],
                          }),
                          u.jsx('textarea', {
                            className: Lt,
                            rows: 6,
                            placeholder: w,
                            value: i.defaultPrompt,
                            onChange: e => m('defaultPrompt', e.target.value),
                          }),
                          u.jsx('div', {
                            className: It,
                            children: '用于生成周报的默认提示词模板',
                          }),
                        ],
                      }),
                    ],
                  }),
                'appearance' === c &&
                  u.jsxs('div', {
                    className: Tt,
                    children: [
                      u.jsxs('div', {
                        className: St,
                        children: [
                          u.jsx('label', {
                            className: Dt,
                            children: '主题模式',
                          }),
                          u.jsxs('select', {
                            className: At,
                            value: r,
                            onChange: e => d(e.target.value),
                            children: [
                              u.jsx('option', {
                                value: 'system',
                                children: '🔄 跟随系统',
                              }),
                              u.jsx('option', {
                                value: 'light',
                                children: '☀️ 浅色模式',
                              }),
                              u.jsx('option', {
                                value: 'dark',
                                children: '🌙 深色模式',
                              }),
                            ],
                          }),
                          u.jsx('div', {
                            className: It,
                            children:
                              '选择应用的主题模式，跟随系统将根据系统设置自动切换',
                          }),
                        ],
                      }),
                      u.jsxs('div', {
                        className: St,
                        children: [
                          u.jsx('label', {
                            className: Dt,
                            children: '自动检查更新',
                          }),
                          u.jsxs('div', {
                            className: qt,
                            children: [
                              u.jsx('input', {
                                type: 'checkbox',
                                id: 'autoCheckUpdate',
                                className: Bt,
                                checked: i.autoCheckUpdate ?? !0,
                                onChange: e =>
                                  m('autoCheckUpdate', e.target.checked),
                              }),
                              u.jsx('label', {
                                htmlFor: 'autoCheckUpdate',
                                className: Ft,
                                children: u.jsx('span', { className: zt }),
                              }),
                            ],
                          }),
                          u.jsx('div', {
                            className: It,
                            children: '开启后将自动检查版本更新并提醒',
                          }),
                        ],
                      }),
                      u.jsxs('div', {
                        className: St,
                        children: [
                          u.jsx('label', {
                            className: Dt,
                            children: '检查更新间隔',
                          }),
                          u.jsxs('select', {
                            className: At,
                            value: i.updateCheckInterval ?? 3e5,
                            onChange: e =>
                              m(
                                'updateCheckInterval',
                                parseInt(e.target.value),
                              ),
                            disabled: !(i.autoCheckUpdate ?? 1),
                            children: [
                              u.jsx('option', {
                                value: 6e4,
                                children: '1分钟',
                              }),
                              u.jsx('option', {
                                value: 3e5,
                                children: '5分钟',
                              }),
                              u.jsx('option', {
                                value: 6e5,
                                children: '10分钟',
                              }),
                              u.jsx('option', {
                                value: 18e5,
                                children: '30分钟',
                              }),
                              u.jsx('option', {
                                value: 36e5,
                                children: '1小时',
                              }),
                            ],
                          }),
                          u.jsx('div', {
                            className: It,
                            children: '设置自动检查版本更新的时间间隔',
                          }),
                        ],
                      }),
                    ],
                  }),
              ],
            }),
            u.jsx('div', {
              className: Ot,
              children: u.jsxs('span', { className: Ut, children: ['v', j] }),
            }),
          ],
        }),
      })
    },
    Yt = 'index-module__ai-panel__R0K19',
    Ht = 'index-module__data-overview__J-ZoM',
    Qt = 'index-module__overview-header__ae0e8',
    Vt = 'index-module__overview-content__dhjh6',
    Xt = 'index-module__overview-item__20Ilu',
    Zt = 'index-module__overview-label__k3QHX',
    Wt = 'index-module__overview-value__gbEnJ',
    ea = 'index-module__ready__f4MXX',
    ta = 'index-module__waiting__orgl9',
    aa = 'index-module__result-section__esrDe',
    sa = 'index-module__result-header__-sHRM',
    na = 'index-module__result-title__GYp3Q',
    la = 'index-module__title-icon__w1Z58',
    ia = 'index-module__result-actions__Lwz6b',
    oa = 'index-module__action-btn__X81KS',
    ra = 'index-module__btn-icon__bBkUh',
    da = 'index-module__result-content__NBmXz',
    ca = 'index-module__result-text__WX-aI',
    _a = 'index-module__result-meta__zAR0J',
    ma = 'index-module__meta-left__G7E6i',
    ua = 'index-module__meta-item__Mikx5',
    pa = 'index-module__prompt-section__Y1L-1',
    ha = 'index-module__section-header__WEXG-',
    va = 'index-module__header-actions__phC5-',
    xa = 'index-module__prompt-editor__N6csy',
    ga = 'index-module__prompt-textarea__ZeYSC',
    ba = 'index-module__prompt-footer__NhJb8',
    ja = 'index-module__char-count__qSePr',
    fa = 'index-module__expanded__VY5Zd',
    Na = 'index-module__loading-section__qmhp-',
    ya = 'index-module__loading-spinner__FhbKe',
    Ea = 'index-module__loading-tips__TN0F6',
    ka = 'index-module__empty-result__D1DxK',
    wa = 'index-module__empty-icon__RFmRa',
    Ca = 'index-module__empty-features__Y-XeR',
    Ta = 'index-module__feature-item__zmC1K',
    Sa = 'index-module__feature-icon__aCith',
    Da = 'index-module__btn-primary__NTwQw',
    Ma = 'index-module__regenerate__MPpEF',
    $a = 'index-module__btn-text__f3PZM',
    Aa = ({
      visible: t,
      config: a,
      defaultPrompt: s,
      onClose: n,
      onGenerate: l,
      isLoading: i,
      selectedEventsCount: o = 0,
      dateRange: r,
    }) => {
      const [d, c] = e.useState(s),
        [_, m] = e.useState(!1)
      e.useEffect(() => {
        c(s)
      }, [s])
      return u.jsx(ft, {
        visible: t,
        title: 'AI 周报生成',
        width: 800,
        onClose: n,
        maskClosable: !i,
        children: u.jsxs('div', {
          className: Yt,
          children: [
            u.jsxs('div', {
              className: Ht,
              children: [
                u.jsx('div', {
                  className: Qt,
                  children: u.jsx('h4', { children: '📊 数据概览' }),
                }),
                u.jsxs('div', {
                  className: Vt,
                  children: [
                    u.jsxs('div', {
                      className: Xt,
                      children: [
                        u.jsx('span', {
                          className: Zt,
                          children: '选中事件：',
                        }),
                        u.jsxs('span', { className: Wt, children: [o, ' 条'] }),
                      ],
                    }),
                    r &&
                      u.jsxs('div', {
                        className: Xt,
                        children: [
                          u.jsx('span', {
                            className: Zt,
                            children: '日期范围：',
                          }),
                          u.jsxs('span', {
                            className: Wt,
                            children: [r.startDate, ' 至 ', r.endDate],
                          }),
                        ],
                      }),
                    u.jsxs('div', {
                      className: Xt,
                      children: [
                        u.jsx('span', { className: Zt, children: '状态：' }),
                        u.jsx('span', {
                          className: `${Wt} ${o > 0 ? ea : ta}`,
                          children: o > 0 ? '✅ 数据就绪' : '⏳ 等待选择事件',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            u.jsxs('div', {
              className: pa,
              children: [
                u.jsxs('div', {
                  className: ha,
                  children: [
                    u.jsx('h3', { children: '提示词' }),
                    u.jsxs('div', {
                      className: va,
                      children: [
                        u.jsx('button', {
                          className: $a,
                          onClick: () => m(!_),
                          children: _ ? '收起' : '展开',
                        }),
                        u.jsx('button', {
                          className: $a,
                          onClick: () => {
                            c(s)
                          },
                          children: '重置',
                        }),
                      ],
                    }),
                  ],
                }),
                u.jsxs('div', {
                  className: `${xa} ${_ ? fa : ''}`,
                  children: [
                    u.jsx('textarea', {
                      className: ga,
                      value: d,
                      onChange: e => c(e.target.value),
                      placeholder: '请输入用于生成周报的提示词...',
                      rows: _ ? 15 : 6,
                      disabled: i,
                    }),
                    u.jsxs('div', {
                      className: ba,
                      children: [
                        u.jsxs('span', {
                          className: ja,
                          children: [d.length, ' 字符'],
                        }),
                        u.jsx('button', {
                          className: `${Da} ${(null == a ? void 0 : a.result) ? Ma : ''}`,
                          onClick: () => {
                            l(d)
                          },
                          disabled: i || !d.trim(),
                          children: i
                            ? '生成中...'
                            : (null == a ? void 0 : a.result)
                              ? '重新生成'
                              : '生成周报',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            i &&
              u.jsxs('div', {
                className: Na,
                children: [
                  u.jsx('div', { className: ya }),
                  u.jsx('p', {
                    children: 'AI 正在分析事件数据，生成周报中...',
                  }),
                  u.jsx('div', {
                    className: Ea,
                    children: u.jsx('span', {
                      children: '💡 生成时间通常为 10-30 秒',
                    }),
                  }),
                ],
              }),
            (null == a ? void 0 : a.result) &&
              u.jsxs('div', {
                className: aa,
                children: [
                  u.jsxs('div', {
                    className: sa,
                    children: [
                      u.jsxs('h3', {
                        className: na,
                        children: [
                          u.jsx('span', { className: la, children: '✨' }),
                          '生成结果',
                        ],
                      }),
                      u.jsx('div', {
                        className: ia,
                        children: u.jsxs('button', {
                          className: oa,
                          onClick: () => {
                            ;(null == a ? void 0 : a.result) &&
                              navigator.clipboard.writeText(a.result)
                          },
                          title: '一键复制',
                          children: [
                            u.jsx('span', { className: ra, children: '📋' }),
                            '复制',
                          ],
                        }),
                      }),
                    ],
                  }),
                  u.jsx('div', {
                    className: da,
                    children: u.jsx('div', {
                      className: ca,
                      children: a.result,
                    }),
                  }),
                  u.jsx('div', {
                    className: _a,
                    children: u.jsxs('div', {
                      className: ma,
                      children: [
                        u.jsx('div', {
                          className: ua,
                          children: u.jsxs('span', {
                            children: [a.result.split('\n').length, ' 行'],
                          }),
                        }),
                        u.jsx('div', {
                          className: ua,
                          children: u.jsxs('span', {
                            children: [a.result.length, ' 字符'],
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            !a &&
              !i &&
              u.jsxs('div', {
                className: ka,
                children: [
                  u.jsx('div', { className: wa, children: '🤖' }),
                  u.jsx('h3', { children: '准备生成 AI 周报' }),
                  u.jsx('p', {
                    children:
                      '点击"生成周报"按钮，AI 将基于您的 GitLab 事件数据生成专业的工作周报',
                  }),
                  u.jsxs('div', {
                    className: Ca,
                    children: [
                      u.jsxs('div', {
                        className: Ta,
                        children: [
                          u.jsx('span', { className: Sa, children: '📊' }),
                          u.jsx('span', { children: '智能分析工作数据' }),
                        ],
                      }),
                      u.jsxs('div', {
                        className: Ta,
                        children: [
                          u.jsx('span', { className: Sa, children: '📝' }),
                          u.jsx('span', { children: '自动生成周报内容' }),
                        ],
                      }),
                      u.jsxs('div', {
                        className: Ta,
                        children: [
                          u.jsx('span', { className: Sa, children: '🎯' }),
                          u.jsx('span', { children: '突出重点工作成果' }),
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
    La = {
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
    Ia = ({ event: e, visible: t, onClose: a }) => {
      if (!t || !e) return null
      const s = e =>
          new Date(e).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        n = () => {
          var t, a
          if (!e.project && !e.project_id) return ''
          const s = 'https://www.lejuhub.com'
          if (!e.project) return s
          const n = e.project.path_with_namespace
          if (!e.target_type || '' === e.target_type.trim()) return `${s}/${n}`
          switch (e.target_type) {
            case 'MergeRequest':
              return `${s}/${n}/-/merge_requests/${e.target_iid}`
            case 'Issue':
              return `${s}/${n}/-/issues/${e.target_iid}`
            case 'Note':
              return 'Issue' ===
                (null == (t = e.note) ? void 0 : t.noteable_type)
                ? `${s}/${n}/-/issues/${e.note.noteable_iid}`
                : 'MergeRequest' ===
                    (null == (a = e.note) ? void 0 : a.noteable_type)
                  ? `${s}/${n}/-/merge_requests/${e.note.noteable_iid}`
                  : `${s}/${n}`
            default:
              return `${s}/${n}`
          }
        }
      return u.jsx('div', {
        className: La.eventDetailModalOverlay,
        onClick: a,
        children: u.jsxs('div', {
          className: La.eventDetailModal,
          onClick: e => e.stopPropagation(),
          children: [
            u.jsxs('div', {
              className: La.modalHeader,
              children: [
                u.jsx('h2', { children: '事件详情' }),
                u.jsx('button', {
                  className: La.closeBtn,
                  onClick: a,
                  children: '×',
                }),
              ],
            }),
            u.jsxs('div', {
              className: La.modalContent,
              children: [
                u.jsxs('div', {
                  className: `${La.detailSection} ${La.compact}`,
                  children: [
                    u.jsx('h3', { children: '基本信息' }),
                    u.jsxs('div', {
                      className: `${La.detailGrid} ${La.compactGrid}`,
                      children: [
                        u.jsxs('div', {
                          className: La.detailItem,
                          children: [
                            u.jsx('span', {
                              className: La.label,
                              children: 'ID:',
                            }),
                            u.jsx('span', {
                              className: La.value,
                              children: e.id,
                            }),
                          ],
                        }),
                        u.jsxs('div', {
                          className: La.detailItem,
                          children: [
                            u.jsx('span', {
                              className: La.label,
                              children: '类型:',
                            }),
                            u.jsx('span', {
                              className: La.value,
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
                        u.jsxs('div', {
                          className: La.detailItem,
                          children: [
                            u.jsx('span', {
                              className: La.label,
                              children: '操作:',
                            }),
                            u.jsx('span', {
                              className: `${La.value} ${La.actionBadge}`,
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
                        u.jsxs('div', {
                          className: La.detailItem,
                          children: [
                            u.jsx('span', {
                              className: La.label,
                              children: '时间:',
                            }),
                            u.jsx('span', {
                              className: La.value,
                              children: s(e.created_at),
                            }),
                          ],
                        }),
                        e.state &&
                          u.jsxs('div', {
                            className: La.detailItem,
                            children: [
                              u.jsx('span', {
                                className: La.label,
                                children: '状态:',
                              }),
                              u.jsx('span', {
                                className: `${La.value} ${La.statusBadge} ${La[`status-${e.state}`]}`,
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
                  u.jsxs('div', {
                    className: `${La.detailSection} ${La.compact}`,
                    children: [
                      u.jsx('h3', { children: '内容' }),
                      u.jsxs('div', {
                        className: `${La.detailContent} ${La.compactContent}`,
                        children: [
                          e.title &&
                            u.jsxs('div', {
                              className: La.detailItem,
                              children: [
                                u.jsx('span', {
                                  className: La.label,
                                  children: '标题:',
                                }),
                                u.jsx('span', {
                                  className: La.value,
                                  children: e.title,
                                }),
                              ],
                            }),
                          e.target_title &&
                            u.jsxs('div', {
                              className: La.detailItem,
                              children: [
                                u.jsx('span', {
                                  className: La.label,
                                  children: '目标:',
                                }),
                                u.jsx('span', {
                                  className: La.value,
                                  children: e.target_title,
                                }),
                              ],
                            }),
                          e.labels &&
                            e.labels.length > 0 &&
                            u.jsxs('div', {
                              className: La.detailItem,
                              children: [
                                u.jsx('span', {
                                  className: La.label,
                                  children: '标签:',
                                }),
                                u.jsx('div', {
                                  className: La.labels,
                                  children: e.labels.map((e, t) =>
                                    u.jsx(
                                      'span',
                                      { className: La.labelTag, children: e },
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
                  u.jsxs('div', {
                    className: `${La.detailSection} ${La.compact}`,
                    children: [
                      u.jsx('h3', { children: '作者' }),
                      u.jsxs('div', {
                        className: `${La.authorInfo} ${La.compactAuthor}`,
                        children: [
                          e.author.avatar_url &&
                            u.jsx('img', {
                              src: `${e.author.avatar_url}?width=100`,
                              alt: e.author.name,
                              className: La.authorAvatar,
                            }),
                          u.jsxs('div', {
                            className: La.authorDetails,
                            children: [
                              u.jsx('div', {
                                className: La.authorName,
                                children: e.author.name,
                              }),
                              u.jsxs('div', {
                                className: La.authorUsername,
                                children: ['@', e.author.username],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                (e.project || e.project_id) &&
                  u.jsxs('div', {
                    className: `${La.detailSection} ${La.compact}`,
                    children: [
                      u.jsx('h3', { children: '项目' }),
                      u.jsx('div', {
                        className: `${La.projectInfo} ${La.compactProject}`,
                        children: e.project
                          ? u.jsxs(u.Fragment, {
                              children: [
                                u.jsxs('div', {
                                  className: La.detailItem,
                                  children: [
                                    u.jsx('span', {
                                      className: La.label,
                                      children: '名称:',
                                    }),
                                    u.jsx('span', {
                                      className: La.value,
                                      children: e.project.name,
                                    }),
                                  ],
                                }),
                                u.jsxs('div', {
                                  className: La.detailItem,
                                  children: [
                                    u.jsx('span', {
                                      className: La.label,
                                      children: '路径:',
                                    }),
                                    u.jsx('span', {
                                      className: La.value,
                                      children: e.project.path_with_namespace,
                                    }),
                                  ],
                                }),
                              ],
                            })
                          : u.jsxs('div', {
                              className: La.detailItem,
                              children: [
                                u.jsx('span', {
                                  className: La.label,
                                  children: '项目ID:',
                                }),
                                u.jsx('span', {
                                  className: La.value,
                                  children: e.project_id,
                                }),
                              ],
                            }),
                      }),
                    ],
                  }),
                e.push_data &&
                  u.jsxs('div', {
                    className: La.detailSection,
                    children: [
                      u.jsx('h3', { children: '推送信息' }),
                      u.jsxs('div', {
                        className: La.pushInfo,
                        children: [
                          u.jsxs('div', {
                            className: La.detailItem,
                            children: [
                              u.jsx('span', {
                                className: La.label,
                                children: '分支:',
                              }),
                              u.jsx('span', {
                                className: La.value,
                                children: e.push_data.ref,
                              }),
                            ],
                          }),
                          u.jsxs('div', {
                            className: La.detailItem,
                            children: [
                              u.jsx('span', {
                                className: La.label,
                                children: '提交数量:',
                              }),
                              u.jsx('span', {
                                className: La.value,
                                children: e.push_data.commit_count,
                              }),
                            ],
                          }),
                          u.jsxs('div', {
                            className: La.detailItem,
                            children: [
                              u.jsx('span', {
                                className: La.label,
                                children: '提交标题:',
                              }),
                              u.jsx('span', {
                                className: La.value,
                                children: e.push_data.commit_title,
                              }),
                            ],
                          }),
                          u.jsxs('div', {
                            className: La.detailItem,
                            children: [
                              u.jsx('span', {
                                className: La.label,
                                children: '提交哈希:',
                              }),
                              u.jsx('span', {
                                className: `${La.value} ${La.commitHash}`,
                                children: e.push_data.commit_to,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                e.note &&
                  u.jsxs('div', {
                    className: La.detailSection,
                    children: [
                      u.jsx('h3', { children: '评论信息' }),
                      u.jsxs('div', {
                        className: La.noteInfo,
                        children: [
                          u.jsx('div', {
                            className: La.noteBody,
                            children: e.note.body,
                          }),
                          u.jsxs('div', {
                            className: La.noteMeta,
                            children: [
                              u.jsxs('span', {
                                children: ['创建时间: ', s(e.note.created_at)],
                              }),
                              e.note.updated_at !== e.note.created_at &&
                                u.jsxs('span', {
                                  children: [
                                    '更新时间: ',
                                    s(e.note.updated_at),
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
            u.jsxs('div', {
              className: La.modalFooter,
              children: [
                n() &&
                  u.jsx('a', {
                    href: n(),
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: La.sourceLinkBtn,
                    children: '打开源页面',
                  }),
                u.jsx('button', {
                  className: La.closeModalBtn,
                  onClick: a,
                  children: '关闭',
                }),
              ],
            }),
          ],
        }),
      })
      var l
    }
  class Oa {
    constructor(e, t) {
      __publicField(this, 'baseUrl'),
        __publicField(this, 'token'),
        __publicField(this, 'currentUser', null),
        (this.baseUrl = e.replace(/\/$/, '')),
        (this.token = t)
    }
    async request(e, t = {}) {
      const a = `${this.baseUrl}${e}`,
        s = {
          method: t.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            'PRIVATE-TOKEN': this.token,
          },
          timeout: f.REQUEST_TIMEOUT,
          body: t.body,
        },
        n = await h(a, s)
      if (!n.ok) {
        let e
        try {
          e = await n.text()
        } catch {
          e = n.statusText
        }
        let t = e || n.statusText
        switch (n.status) {
          case 401:
            t = 'GitLab认证失败，请检查Token是否有效'
            break
          case 403:
            t = 'GitLab访问权限不足，请检查Token权限'
            break
          case 404:
            t = 'GitLab资源不存在，请检查URL或项目权限'
            break
          case 429:
            t = 'GitLab API请求频率过高，请稍后重试'
            break
          case 500:
          case 502:
          case 503:
          case 504:
            t = 'GitLab服务器错误，请稍后重试'
        }
        throw T.createApiError(n.status, t, 'GitLab API')
      }
      return n.json()
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
        throw T.createResponseError('Token格式无效', 'GitLab API')
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
     * 获取用户项目列表
     */ async getUserProjects() {
      return this.request('/projects?membership=true&per_page=100')
    }
    /**
     * 获取用户事件（统一使用 /users/:id/events 接口）
     * @param userId 用户ID
     * @param options 筛选和分页选项（由后端处理）
     */ async getUserEvents(e, t = {}) {
      const a = new URLSearchParams()
      t.after && a.set('after', t.after),
        t.before && a.set('before', t.before),
        t.sort && a.set('sort', t.sort),
        t.page && a.set('page', t.page.toString()),
        t.per_page && a.set('per_page', t.per_page.toString()),
        t.action && t.action.forEach(e => a.append('action', e)),
        t.target_type && t.target_type.forEach(e => a.append('target_type', e))
      const s = a.toString(),
        n = s ? `/users/${e}/events?${s}` : `/users/${e}/events`
      return this.request(n)
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
      const s = a.toString(),
        n = s ? `/users/${e}/events?${s}` : `/users/${e}/events`,
        l = `${this.baseUrl}${n}`,
        i = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'PRIVATE-TOKEN': this.token,
          },
          timeout: f.REQUEST_TIMEOUT,
          signal: t.signal,
        },
        o = await h(l, i)
      if (!o.ok) {
        const e = await o.text()
        throw T.createApiError(o.status, e || o.statusText, 'GitLab API')
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
     * 获取项目详情
     */ async getProject(e) {
      return this.request(`/projects/${e}`)
    }
    /**
     * 获取缓存的用户信息
     */ getCachedUser() {
      return this.currentUser
    }
  }
  const Ua = {
      app: 'App-module__app__ZYOJd',
      'web-mode': 'App-module__web-mode__2hnFp',
      webMode: 'App-module__web-mode__2hnFp',
      'userscript-mode': 'App-module__userscript-mode__5Dbvp',
      userscriptMode: 'App-module__userscript-mode__5Dbvp',
      'events-list-footer': 'App-module__events-list-footer__M6fFx',
      eventsListFooter: 'App-module__events-list-footer__M6fFx',
      pagination: 'App-module__pagination__8MYcc',
      light: 'App-module__light__-2YM7',
      dark: 'App-module__dark__zl6FN',
      'fade-in': 'App-module__fade-in__hmOGT',
      fadeIn: 'App-module__fade-in__hmOGT',
      'slide-in-up': 'App-module__slide-in-up__3G2dj',
      slideInUp: 'App-module__slide-in-up__3G2dj',
      'slide-in-down': 'App-module__slide-in-down__yp8xa',
      slideInDown: 'App-module__slide-in-down__yp8xa',
      'userscript-header': 'App-module__userscript-header__Gd9rb',
      userscriptHeader: 'App-module__userscript-header__Gd9rb',
      'toggle-btn': 'App-module__toggle-btn__1QXY6',
      toggleBtn: 'App-module__toggle-btn__1QXY6',
      'app-content': 'App-module__app-content__41BC0',
      appContent: 'App-module__app-content__41BC0',
      collapsed: 'App-module__collapsed__-W0B6',
      expanded: 'App-module__expanded__4oZSa',
      'app-header': 'App-module__app-header__uzDwt',
      appHeader: 'App-module__app-header__uzDwt',
      'app-main': 'App-module__app-main__Vb-mE',
      appMain: 'App-module__app-main__Vb-mE',
      'error-banner': 'App-module__error-banner__lzzyc',
      errorBanner: 'App-module__error-banner__lzzyc',
      'config-form': 'App-module__config-form__3qfiF',
      configForm: 'App-module__config-form__3qfiF',
      'form-group': 'App-module__form-group__HjqOW',
      formGroup: 'App-module__form-group__HjqOW',
      'date-range': 'App-module__date-range__a4twt',
      dateRange: 'App-module__date-range__a4twt',
      'action-section': 'App-module__action-section__PNqvo',
      actionSection: 'App-module__action-section__PNqvo',
      'primary-btn': 'App-module__primary-btn__7Yh0h',
      primaryBtn: 'App-module__primary-btn__7Yh0h',
      'secondary-btn': 'App-module__secondary-btn__rYZob',
      secondaryBtn: 'App-module__secondary-btn__rYZob',
      'preview-area': 'App-module__preview-area__eSphl',
      previewArea: 'App-module__preview-area__eSphl',
      placeholder: 'App-module__placeholder__64NFK',
      loading: 'App-module__loading__nhcml',
      spinner: 'App-module__spinner__DX3IN',
      spin: 'App-module__spin__cTQvR',
      'report-content': 'App-module__report-content__qtrdb',
      reportContent: 'App-module__report-content__qtrdb',
      'report-meta': 'App-module__report-meta__Jmys5',
      reportMeta: 'App-module__report-meta__Jmys5',
      'report-text': 'App-module__report-text__DiDz5',
      reportText: 'App-module__report-text__DiDz5',
    },
    Ra = ({ isUserscript: t = !1 }) => {
      const {
          state: a,
          updateConfig: s,
          setTheme: n,
          setActivePanel: l,
          updateFilterConditions: i,
          updateSortOptions: o,
          updatePaginationOptions: r,
          setEvents: d,
          setTotal: c,
          setAIGenerationConfig: _,
          setLoading: m,
          setError: p,
          isConfigValid: h,
          getTimeRange: v,
        } = U(),
        {
          createRequest: x,
          isRequestCancelled: g,
          cleanupRequest: b,
          isAbortError: j,
        } = (() => {
          const t = e.useRef(null),
            a = e.useCallback(() => {
              t.current && t.current.abort()
              const e = new AbortController()
              return (t.current = e), e
            }, []),
            s = e.useCallback(() => {
              t.current && (t.current.abort(), (t.current = null))
            }, []),
            n = e.useCallback(e => e.signal.aborted, []),
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
                s()
              },
              [s],
            ),
            {
              createRequest: a,
              cancelRequest: s,
              isRequestCancelled: n,
              cleanupRequest: l,
              isAbortError: i,
            }
          )
        })(),
        f = e.useMemo(() => {
          return (
            (e = a.config.gitlabUrl), (t = a.config.gitlabToken), new Oa(e, t)
          )
          var e, t
        }, [a.config.gitlabUrl, a.config.gitlabToken]),
        [N, y] = e.useState(null),
        [E, k] = e.useState(!1),
        [w, C] = e.useState([]),
        S = e.useMemo(
          () =>
            'system' === a.theme
              ? window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
              : a.theme,
          [a.theme],
        )
      e.useEffect(() => {
        if ('system' === a.theme) {
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
      }, [a.theme])
      const D = e.useCallback(
        async e => {
          var t, s
          if (!h()) return void p(I)
          const n = x()
          m(!0), p(null)
          try {
            await f.init()
            const { startDate: l, endDate: i } = v(),
              o = e || a.filterConditions,
              r =
                (null == (t = o.targetType) ? void 0 : t.length) > 0
                  ? o.targetType
                  : void 0,
              _ =
                (null == (s = o.action) ? void 0 : s.length) > 0
                  ? o.action
                  : void 0,
              m = a.sortOptions.order || 'desc',
              u = await f.getCurrentUser(),
              p = {
                after: l,
                before: i,
                target_type: r,
                action: _,
                page: a.paginationOptions.page,
                per_page: a.paginationOptions.pageSize,
                sort: m,
                signal: n.signal,
              },
              { events: h, total: x } = await f.getUserEventsWithTotal(u.id, p)
            if (g(n)) return
            d(h), C(h.map(e => e.id)), c(x)
          } catch (l) {
            if (j(l)) return
            const e = T.formatErrorMessage(l)
            p(e), d([]), c(0)
          } finally {
            g(n) || m(!1), b(n)
          }
        },
        [
          a.paginationOptions.page,
          a.paginationOptions.pageSize,
          a.sortOptions,
          a.filterConditions,
          v,
          d,
          c,
          m,
          p,
          h,
          f,
          x,
          g,
          j,
          b,
        ],
      )
      e.useEffect(() => {
        h() && D()
      }, [h, D])
      return u.jsxs('div', {
        id: 'gitlab-weekly-report-app',
        className: `${Ua.app} ${t ? Ua.userscriptMode : Ua.webMode} ${Ua[S]}`,
        children: [
          u.jsx(mt, {
            events: a.events,
            totalCount: a.totalCount,
            loading: a.isLoading,
            filterConditions: a.filterConditions,
            sortOptions: a.sortOptions,
            paginationOptions: a.paginationOptions,
            selectedEventIds: w,
            onFilterChange: e => {
              i(e), D(e)
            },
            onSortChange: e => {
              o(e)
            },
            onPaginationChange: e => {
              r(e)
            },
            onEventSelect: (e, t) => {
              C(a => (t ? [...a, e] : a.filter(t => t !== e)))
            },
            onSelectAll: e => {
              C(e ? a.events.map(e => e.id) : [])
            },
            onEventDetail: e => {
              y(e), k(!0)
            },
            onOpenSettings: () => {
              l('settings')
            },
            onOpenAI: () => {
              h() ? l('ai') : p($)
            },
          }),
          u.jsx(Ia, {
            event: N,
            visible: E,
            onClose: () => {
              k(!1), y(null)
            },
          }),
          u.jsx(Jt, {
            isOpen: 'settings' === a.activePanel,
            config: a.config,
            theme: a.theme,
            onClose: () => {
              l('main')
            },
            onSave: (e, t) => {
              s(e), n(t)
            },
          }),
          u.jsx(Aa, {
            visible: 'ai' === a.activePanel,
            config: a.aiGenerationConfig,
            defaultPrompt: a.config.defaultPrompt,
            onClose: () => {
              l('main')
            },
            onGenerate: async e => {
              if (h())
                if (0 !== w.length) {
                  m(!0), p(null)
                  try {
                    const t = a.events
                        .filter(e => w.includes(e.id))
                        .map(e => {
                          var t
                          return `${new Date(e.created_at).toLocaleDateString('zh-CN')} - ${e.action_name}: ${e.target_title || (null == (t = e.push_data) ? void 0 : t.commit_title) || '无标题'}`
                        })
                        .join('\n'),
                      { createDeepSeekApiService: s } = await (function (e) {
                        function t(e) {
                          const t = new Event('vite:preloadError', {
                            cancelable: !0,
                          })
                          if (
                            ((t.payload = e),
                            window.dispatchEvent(t),
                            !t.defaultPrevented)
                          )
                            throw e
                        }
                        return Promise.resolve().then(a => {
                          for (const e of a || [])
                            'rejected' === e.status && t(e.reason)
                          return e().catch(t)
                        })
                      })(async () => {
                        const { createDeepSeekApiService: e } =
                          await Promise.resolve().then(() => Fa)
                        return { createDeepSeekApiService: e }
                      }),
                      n = s(a.config.deepseekApiKey),
                      l = await n.generateWeeklyReport(
                        t,
                        e,
                        a.config.model,
                        a.config.tokenLimit,
                      )
                    _({
                      prompt: e,
                      tokensUsed: l.tokensUsed,
                      result: l.content,
                    }),
                      m(!1)
                  } catch (t) {
                    const e = T.formatErrorMessage(t)
                    p(e), m(!1)
                  }
                } else p(L)
              else p(A)
            },
            isLoading: a.isLoading,
            selectedEventsCount: w.length,
            dateRange: v(),
          }),
        ],
      })
    },
    Pa = () => {
      if (document.getElementById('gitlab-weekly-report-userscript-container'))
        return
      const t = document.createElement('div')
      ;(t.id = 'gitlab-weekly-report-trigger'),
        (t.innerHTML = '📊'),
        (t.style.cssText =
          "\n    position: fixed;\n    bottom: 110px;\n    right: 50px;\n    width: 50px;\n    height: 50px;\n    background: #1976d2;\n    border-radius: 50%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: pointer;\n    z-index: 999998;\n    box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);\n    font-size: 20px;\n    transition: all 0.3s ease;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;\n  ")
      const s = document.createElement('div')
      ;(s.id = 'gitlab-weekly-report-userscript-container'),
        (s.style.cssText =
          "\n    position: fixed;\n    top: 60px;\n    left: 60px;\n    right: 60px;\n    bottom: 60px;\n    z-index: 999999;\n    background: white;\n    border-radius: 12px;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;\n    display: none;\n    overflow: hidden;\n    isolation: isolate;\n  ")
      const n = document.createElement('div')
      ;(n.id = 'gitlab-weekly-report-overlay'),
        (n.style.cssText =
          '\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0, 0, 0, 0.5);\n    z-index: 999997;\n    display: none;\n  ')
      const l = () => {
        'none' !== s.style.display
          ? ((s.style.display = 'none'),
            (n.style.display = 'none'),
            (t.style.transform = 'scale(1)'))
          : ((s.style.display = 'block'),
            (n.style.display = 'block'),
            (t.style.transform = 'scale(0.9)'))
      }
      t.addEventListener('mouseenter', () => {
        'none' === s.style.display &&
          ((t.style.transform = 'scale(1.1)'),
          (t.style.boxShadow = '0 6px 16px rgba(25, 118, 210, 0.4)'))
      }),
        t.addEventListener('mouseleave', () => {
          'none' === s.style.display &&
            ((t.style.transform = 'scale(1)'),
            (t.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)'))
        }),
        t.addEventListener('click', l),
        n.addEventListener('click', l),
        document.body.appendChild(n),
        document.body.appendChild(s),
        document.body.appendChild(t)
      a.createRoot(s).render(e.createElement(Ra, { isUserscript: !0 }))
    },
    Ga = () => {
      ;(window.location.hostname.includes('gitlab') ||
        window.location.pathname.includes('gitlab') ||
        null !== document.querySelector('meta[content*="GitLab"]') ||
        null !== document.querySelector('[data-page*="gitlab"]')) &&
        ('loading' === document.readyState
          ? document.addEventListener('DOMContentLoaded', Pa)
          : Pa())
    }
  Ga()
  let qa = location.href
  new MutationObserver(() => {
    const e = location.href
    e !== qa && ((qa = e), setTimeout(Ga, 1e3))
  }).observe(document, { subtree: !0, childList: !0 })
  class Ba {
    constructor(e) {
      __publicField(this, 'apiKey'),
        __publicField(this, 'baseUrl'),
        (this.apiKey = e),
        (this.baseUrl = f.DEEPSEEK_BASE_URL)
    }
    /**
     * 生成聊天回复
     */ async generateChat(e, t = 'deepseek-chat', a = 4e3) {
      const s = await h(`${this.baseUrl}/chat/completions`, {
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
        timeout: f.REQUEST_TIMEOUT,
      })
      if (!s.ok) throw T.createApiError(s.status, s.statusText, 'DeepSeek API')
      const n = await s.json()
      if (!n.choices || 0 === n.choices.length)
        throw T.createResponseError('空的响应', 'DeepSeek API')
      return n.choices[0].message.content
    }
    /**
     * 生成周报
     */ async generateWeeklyReport(e, t, a = 'deepseek-chat', s = 4e3) {
      var n
      const l = [
          { role: 'system', content: t },
          {
            role: 'user',
            content: `以下是GitLab事件数据：\n\n${e}\n\n请根据这些数据生成工作周报。`,
          },
        ],
        i = await h(`${f.DEEPSEEK_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: a,
            messages: l,
            max_tokens: s,
            temperature: 0.7,
          }),
          timeout: f.REQUEST_TIMEOUT,
        })
      if (!i.ok) throw T.createApiError(i.status, i.statusText, 'DeepSeek API')
      const o = await i.json()
      if (!o.choices || 0 === o.choices.length)
        throw T.createResponseError('空的响应', 'DeepSeek API')
      return {
        content: o.choices[0].message.content,
        tokensUsed: (null == (n = o.usage) ? void 0 : n.total_tokens) || 0,
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
  const Fa = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        DeepSeekApiService: Ba,
        createDeepSeekApiService: function (e) {
          return new Ba(e)
        },
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  )
})(React, ReactDOM)
