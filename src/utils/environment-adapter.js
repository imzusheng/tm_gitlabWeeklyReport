/**
 * 环境适配器模块
 * 统一环境检测和不同环境下的API调用方式
 * 当前分为油猴环境和Web环境
 */
class EnvironmentAdapter {
    constructor() {
        this.mode = this.detectMode();
        this.capabilities = this.detectCapabilities();
    }

    /**
     * 检测运行模式
     * @returns {string} 'userscript' | 'web'
     */
    detectMode() {
        // 检查是否存在油猴脚本的特征
        if (typeof window.GM_xmlhttpRequest !== 'undefined' || 
            typeof window.GM_setValue !== 'undefined' ||
            typeof window.unsafeWindow !== 'undefined') {
            return 'userscript';
        }
        
        // 检查是否在开发服务器环境
        if (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1') {
            return 'web';
        }
        
        // 默认为web模式
        return 'web';
    }

    /**
     * 检测环境能力
     * @returns {Object} 环境能力对象
     */
    detectCapabilities() {
        const capabilities = {
            // 网络请求能力
            crossOriginRequest: false,
            xmlHttpRequest: false,
            fetch: false,
            
            // 存储能力
            localStorage: false,
            gmStorage: false,
            
            // 样式注入能力
            styleInjection: false,
            gmAddStyle: false,
            
            // 其他能力
            unsafeWindow: false,
            notifications: false
        };

        // 检测网络请求能力
        if (typeof window.GM_xmlhttpRequest !== 'undefined') {
            capabilities.crossOriginRequest = true;
            capabilities.xmlHttpRequest = true;
        }
        
        if (typeof fetch !== 'undefined') {
            capabilities.fetch = true;
        }

        // 检测存储能力
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                capabilities.localStorage = true;
            } catch (e) {
                // localStorage不可用
            }
        }
        
        if (typeof window.GM_setValue !== 'undefined' && typeof window.GM_getValue !== 'undefined') {
            capabilities.gmStorage = true;
        }

        // 检测样式注入能力
        if (typeof window.GM_addStyle !== 'undefined') {
            capabilities.gmAddStyle = true;
            capabilities.styleInjection = true;
        } else if (document && document.head) {
            capabilities.styleInjection = true;
        }

        // 检测其他能力
        if (typeof window.unsafeWindow !== 'undefined') {
            capabilities.unsafeWindow = true;
        }
        
        if ('Notification' in window) {
            capabilities.notifications = true;
        }

        return capabilities;
    }

    /**
     * 获取当前运行模式
     * @returns {string}
     */
    getMode() {
        return this.mode;
    }

    /**
     * 检查是否为油猴脚本模式
     * @returns {boolean}
     */
    isUserScript() {
        return this.mode === 'userscript';
    }

    /**
     * 检查是否为Web网页模式
     * @returns {boolean}
     */
    isWebMode() {
        return this.mode === 'web';
    }

    /**
     * 获取环境能力
     * @returns {Object}
     */
    getCapabilities() {
        return this.capabilities;
    }

    /**
     * 检查是否支持跨域请求
     * @returns {boolean}
     */
    supportsCrossOrigin() {
        return this.capabilities.crossOriginRequest;
    }

    /**
     * 检查是否支持GM存储
     * @returns {boolean}
     */
    supportsGMStorage() {
        return this.capabilities.gmStorage;
    }

    /**
     * 检查是否支持本地存储
     * @returns {boolean}
     */
    supportsLocalStorage() {
        return this.capabilities.localStorage;
    }

    /**
     * 获取环境信息摘要
     * @returns {Object}
     */
    getSummary() {
        return {
            mode: this.mode,
            isUserScript: this.isUserScript(),
            isWebMode: this.isWebMode(),
            capabilities: this.capabilities,
            userAgent: navigator.userAgent,
            location: {
                hostname: window.location.hostname,
                protocol: window.location.protocol,
                port: window.location.port
            }
        };
    }

    /**
     * 统一的HTTP请求方法
     * @param {string} url 请求URL
     * @param {Object} options 请求选项
     * @returns {Promise} 请求Promise
     */
    makeRequest(url, options = {}) {
        const requestId = Date.now() + Math.random().toString(36).substr(2, 9);
        const method = options.method || 'GET';
        const headers = options.headers || {};
        
        console.group(`🚀 [${this.getMode().toUpperCase()}请求] ${requestId}`);
        console.log('📋 方法:', method);
        console.log('🔗 URL:', url);
        console.log('📤 请求头:', headers);
        if (options.data) {
            console.log('📦 请求数据:', options.data);
        }
        console.log(`⏰ 发送时间: ${new Date().toLocaleString()}`);
        console.groupEnd();
        
        const startTime = Date.now();

        if (this.isUserScript() && this.supportsCrossOrigin()) {
            return this._makeUserScriptRequest(url, options, requestId, startTime);
        } else {
            return this._makeWebRequest(url, options, requestId, startTime);
        }
    }

    /**
     * 油猴脚本环境下的请求
     * @private
     */
    _makeUserScriptRequest(url, options, requestId, startTime) {
        return new Promise((resolve, reject) => {
            window.GM_xmlhttpRequest({
                method: options.method || 'GET',
                url,
                headers: options.headers || {},
                data: options.data,
                onload: (response) => {
                    this._logResponse(response, requestId, startTime);
                    this._handleResponse(response, resolve, reject);
                },
                onerror: (error) => {
                    this._logError(error, requestId, startTime);
                    reject(new Error(`请求失败: ${error.error || '未知错误'}`));
                },
                ontimeout: () => {
                    this._logError({ error: '请求超时' }, requestId, startTime);
                    reject(new Error('请求超时'));
                }
            });
        });
    }

    /**
     * Web环境下的请求
     * @private
     */
    _makeWebRequest(url, options, requestId, startTime) {
        const fetchOptions = {
            method: options.method || 'GET',
            headers: options.headers || {}
        };

        if (options.data) {
            fetchOptions.body = options.data;
        }

        return fetch(url, fetchOptions)
            .then(response => {
                const endTime = Date.now();
                const duration = endTime - startTime;
                
                console.group(`✅ [WEB响应] ${requestId}`);
                console.log(`📊 状态码: ${response.status}`);
                console.log(`⏱️ 响应时间: ${duration}ms`);
                console.groupEnd();

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    return response.text();
                }
            })
            .catch(error => {
                this._logError({ error: error.message }, requestId, startTime);
                throw error;
            });
    }

    /**
     * 记录响应日志
     * @private
     */
    _logResponse(response, requestId, startTime) {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        console.group(`✅ [${this.getMode().toUpperCase()}响应] ${requestId}`);
        console.log(`📊 状态码: ${response.status}`);
        console.log(`⏱️ 响应时间: ${duration}ms`);
        console.log('📥 响应头:', response.responseHeaders);
        console.log('📄 响应数据:', response.responseText.substring(0, 500) + (response.responseText.length > 500 ? '...(截断)' : ''));
        console.groupEnd();
    }

    /**
     * 记录错误日志
     * @private
     */
    _logError(error, requestId, startTime) {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        console.group(`❌ [${this.getMode().toUpperCase()}错误] ${requestId}`);
        console.log(`⏱️ 请求时间: ${duration}ms`);
        console.log('❌ 错误信息:', error.error || error.message || '未知错误');
        console.groupEnd();
    }

    /**
     * 处理响应数据
     * @private
     */
    _handleResponse(response, resolve, reject) {
        if (response.status >= 200 && response.status < 300) {
            try {
                const data = JSON.parse(response.responseText);
                resolve(data);
            } catch (e) {
                resolve(response.responseText);
            }
        } else {
            reject(new Error(`HTTP ${response.status}: ${response.statusText || '请求失败'}`));
        }
    }

    /**
     * 统一的存储设置方法
     * @param {string} key 键名
     * @param {*} value 值
     * @returns {Promise}
     */
    setStorage(key, value) {
        return new Promise((resolve, reject) => {
            try {
                const serializedValue = JSON.stringify(value);
                
                if (this.supportsGMStorage()) {
                    window.GM_setValue(key, serializedValue);
                    console.log(`💾 [GM存储] 设置: ${key}`);
                } else if (this.supportsLocalStorage()) {
                    localStorage.setItem(key, serializedValue);
                    console.log(`💾 [本地存储] 设置: ${key}`);
                } else {
                    throw new Error('无可用的存储方式');
                }
                
                resolve();
            } catch (error) {
                console.error('存储设置失败:', error);
                reject(error);
            }
        });
    }

    /**
     * 统一的存储获取方法
     * @param {string} key 键名
     * @param {*} defaultValue 默认值
     * @returns {Promise}
     */
    getStorage(key, defaultValue = null) {
        return new Promise((resolve, reject) => {
            try {
                let value;
                
                if (this.supportsGMStorage()) {
                    value = window.GM_getValue(key);
                    console.log(`📖 [GM存储] 获取: ${key}`);
                } else if (this.supportsLocalStorage()) {
                    value = localStorage.getItem(key);
                    console.log(`📖 [本地存储] 获取: ${key}`);
                } else {
                    throw new Error('无可用的存储方式');
                }
                
                if (value === undefined || value === null) {
                    resolve(defaultValue);
                } else {
                    try {
                        resolve(JSON.parse(value));
                    } catch (e) {
                        resolve(value);
                    }
                }
            } catch (error) {
                console.error('存储获取失败:', error);
                reject(error);
            }
        });
    }

    /**
     * 统一的存储删除方法
     * @param {string} key 键名
     * @returns {Promise}
     */
    removeStorage(key) {
        return new Promise((resolve, reject) => {
            try {
                if (this.supportsGMStorage()) {
                    window.GM_deleteValue(key);
                    console.log(`🗑️ [GM存储] 删除: ${key}`);
                } else if (this.supportsLocalStorage()) {
                    localStorage.removeItem(key);
                    console.log(`🗑️ [本地存储] 删除: ${key}`);
                } else {
                    throw new Error('无可用的存储方式');
                }
                
                resolve();
            } catch (error) {
                console.error('存储删除失败:', error);
                reject(error);
            }
        });
    }

    /**
     * 统一的样式注入方法
     * @param {string} css CSS样式
     * @returns {Promise}
     */
    addStyle(css) {
        return new Promise((resolve, reject) => {
            try {
                if (this.capabilities.gmAddStyle && typeof window.GM_addStyle !== 'undefined') {
                    window.GM_addStyle(css);
                    console.log('🎨 [GM样式] 注入成功');
                } else if (this.capabilities.styleInjection) {
                    const style = document.createElement('style');
                    style.textContent = css;
                    document.head.appendChild(style);
                    console.log('🎨 [DOM样式] 注入成功');
                } else {
                    throw new Error('无可用的样式注入方式');
                }
                
                resolve();
            } catch (error) {
                console.error('样式注入失败:', error);
                reject(error);
            }
        });
    }

    /**
     * 打印环境信息
     */
    printInfo() {
        const summary = this.getSummary();
        console.group('🔍 环境检测结果');
        console.log('📋 运行模式:', summary.mode);
        console.log('🔧 环境能力:', summary.capabilities);
        console.log('🌐 位置信息:', summary.location);
        console.log('🌐 跨域支持:', this.supportsCrossOrigin());
        console.log('💾 存储支持:', {
            GM: this.supportsGMStorage(),
            localStorage: this.supportsLocalStorage()
        });
        console.log('🎨 样式注入:', this.capabilities.styleInjection);
        console.groupEnd();
    }

    /**
     * 检查运行环境
     * @returns {Promise<Object>} 环境检查结果
     */
    async checkEnvironment() {
        try {
            // 检查是否在浏览器环境中
            if (typeof window === 'undefined' || typeof document === 'undefined') {
                console.error('必须在浏览器环境中运行');
                return {
                    success: false,
                    error: '必须在浏览器环境中运行'
                };
            }

            // 打印环境信息
            this.printInfo();
            
            // 检查必要的API支持
            const requiredAPIs = [
                'JSON',
                'Promise',
                'requestAnimationFrame'
            ];

            for (const api of requiredAPIs) {
                if (typeof window[api] === 'undefined') {
                    console.error(`浏览器不支持 ${api} API`);
                    return {
                        success: false,
                        error: `浏览器不支持 ${api} API`
                    };
                }
            }

            // 检查网络请求能力
            if (!this.capabilities.fetch && !this.capabilities.xmlHttpRequest) {
                console.error('浏览器不支持网络请求功能');
                return {
                    success: false,
                    error: '浏览器不支持网络请求功能'
                };
            }

            // 检查存储能力
            if (!this.supportsLocalStorage() && !this.supportsGMStorage()) {
                console.warn('无可用的存储方式，部分功能可能受限');
            }

            // 检查是否在GitLab页面（仅在非Web开发模式下检查）
            const isWebMode = this.getMode() === 'web';
            if (!isWebMode && !window.location.hostname.includes('localhost')) {
                const isGitLabPage = window.location.hostname.includes('gitlab') || 
                                    document.querySelector('[data-page="projects:activity"]') ||
                                    document.querySelector('.navbar-gitlab');

                if (!isGitLabPage) {
                    console.warn('当前页面可能不是GitLab页面，部分功能可能无法正常工作');
                }
            }

            console.log('✅ 环境检查通过');
            return {
                success: true,
                mode: this.getMode(),
                capabilities: this.capabilities,
                location: {
                    hostname: window.location.hostname,
                    pathname: window.location.pathname
                }
            };

        } catch (error) {
            console.error('环境检查失败:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// 创建全局实例
const environmentAdapter = new EnvironmentAdapter();

// 导出实例和类
export default environmentAdapter;
export { EnvironmentAdapter };

// 为了向后兼容，也导出checkEnvironment函数
export const checkEnvironment = () => environmentAdapter.checkEnvironment();

// 兼容原adapter.js的导出
export const adapter = environmentAdapter;
export const environment = environmentAdapter;