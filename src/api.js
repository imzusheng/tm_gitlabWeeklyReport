/**
 * API 请求模块
 * 处理所有的网络请求，支持油猴插件和Web网页两种模式
 */

import environmentAdapter from './utils/environment-adapter.js';

const API = {
    makeRequest: (url, options = {}) => {
        return environmentAdapter.makeRequest(url, options);
    },

    // 兼容性方法，保持向后兼容
    _legacyRequest: (url, options = {}) => new Promise((resolve, reject) => {
        // 请求开始时的调试信息
        const requestId = Date.now() + Math.random().toString(36).substr(2, 9);
        const method = options.method || 'GET';
        const headers = options.headers || {};
        
        console.group('🚀 [API请求] ${requestId}');
        console.log('📋 方法: ${method}');
        console.log('🔗 URL: ${url}');
        console.log('📤 请求头:', headers);
        if (options.data) {
            console.log('📦 请求数据:', options.data);
        }
        console.log(`⏰ 发送时间: ${new Date().toLocaleString()}`);
        console.groupEnd();
        console.log(''); // 添加空行分隔
        
        const startTime = Date.now();
        
        // 检查是否在油猴环境
        if (typeof GM_xmlhttpRequest !== 'undefined') {
            GM_xmlhttpRequest({
                method,
                url,
                headers,
                data: options.data,
                onload: (response) => {
                    const endTime = Date.now();
                    const duration = endTime - startTime;
                    
                    console.group('✅ [API响应] ${requestId}');
                    console.log(`📊 状态码: ${response.status}`);
                    console.log(`⏱️ 响应时间: ${duration}ms`);
                    console.log('📥 响应头:', response.responseHeaders);
                    console.log('📄 响应数据:', response.responseText.substring(0, 500) + (response.responseText.length > 500 ? '...(截断)' : ''));
                    try {
                        const data = JSON.parse(response.responseText);
                        console.log(`🔍 解析结果: JSON对象，包含 ${Object.keys(data).length} 个字段`);
                        console.groupEnd();
                        console.log(''); // 添加空行分隔
                        console.log(data);
                        resolve(data);
                    } catch (e) {
                        console.log('🔍 解析结果: 纯文本响应');
                        console.groupEnd();
                        console.log(''); // 添加空行分隔
                        resolve(response.responseText);
                    }
                },
                onerror: (error) => {
                    const endTime = Date.now();
                    const duration = endTime - startTime;
                    
                    console.group(`❌ [API错误] ${requestId}`);
                    console.error(`⏱️ 错误时间: ${duration}ms`);
                    console.error('🚨 错误信息:', error);
                    console.groupEnd();
                    console.log(''); // 添加空行分隔
                    reject(error);
                }
            });
        } else {
            // 使用 fetch API 作为后备
            fetch(url, {
                method,
                headers,
                body: options.data
            })
                .then(response => {
                    const endTime = Date.now();
                    const duration = endTime - startTime;
                
                    console.group('✅ [API响应] ${requestId}');
                    console.log(`📊 状态码: ${response.status}`);
                    console.log(`⏱️ 响应时间: ${duration}ms`);
                
                    return response.text().then(text => {
                        console.log('📄 响应数据:', text.substring(0, 500) + (text.length > 500 ? '...(截断)' : ''));
                        try {
                            const data = JSON.parse(text);
                            console.log(`🔍 解析结果: JSON对象，包含 ${Object.keys(data).length} 个字段`);
                            console.groupEnd();
                            console.log(''); // 添加空行分隔
                            console.log(data);
                            resolve(data);
                        } catch (e) {
                            console.log('🔍 解析结果: 纯文本响应');
                            console.groupEnd();
                            console.log(''); // 添加空行分隔
                            resolve(text);
                        }
                    });
                })
                .catch(error => {
                    const endTime = Date.now();
                    const duration = endTime - startTime;
                
                    console.group(`❌ [API错误] ${requestId}`);
                    console.error(`⏱️ 错误时间: ${duration}ms`);
                    console.error('🚨 错误信息:', error);
                    console.groupEnd();
                    console.log(''); // 添加空行分隔
                    reject(error);
                });
        }
    }),

    getEvents: async (startDate, endDate, config, targetType = '') => {
        const params = {
            access_token: config.ACCESS_TOKEN,
            per_page: 1000,
            after: startDate,
            before: endDate
        };
        
        // 只有当 targetType 不为空时才添加 target_type 参数
        if (targetType && targetType.trim() !== '') {
            params.target_type = targetType;
        }
        
        const url = `${config.GITLAB_URL}/events?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}`;

        try {
            const events = await API.makeRequest(url);
            return Array.isArray(events) ? events : [];
        } catch (error) {
            console.error('获取事件失败:', error);
            throw error;
        }
    },

    generateReport: async (events, additionalPrompt, config) => {
        const commits = events.map(event => event.target_title).join(';');
        const fullPrompt = config.SYSTEM_PROMPT + (additionalPrompt ? ` 附加要求: ${additionalPrompt}` : '');

        const data = JSON.stringify({
            model: config.DEEPSEEK_MODEL,
            max_tokens: config.DEEPSEEK_MAX_TOKENS,
            messages: [
                {
                    role: 'system',
                    content: fullPrompt
                },
                {
                    role: 'user',
                    content: commits
                }
            ]
        });

        try {
            const response = await API.makeRequest(config.DEEPSEEK_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${config.DEEPSEEK_API_KEY}`
                },
                data
            });

            if (response.choices && response.choices[0] && response.choices[0].message) {
                return {
                    content: response.choices[0].message.content,
                    usage: response.usage
                };
            }

            throw new Error('生成周报失败');
        } catch (error) {
            console.error('DeepSeek API 调用失败:', error);
            throw error;
        }
    },

    fetchUserBalance: async (config) => {
        if (!config.DEEPSEEK_API_KEY) {
            return null;
        }

        try {
            const response = await API.makeRequest('https://api.deepseek.com/user/balance', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${config.DEEPSEEK_API_KEY}`
                }
            });

            if (response && response.balance_infos && response.balance_infos.length > 0) {
                return response.balance_infos[0];
            }

            return null;
        } catch (error) {
            console.error('获取用户余额失败:', error);
            return null;
        }
    },

    fetchAvailableModels: async (config) => {
        if (!config.DEEPSEEK_API_KEY) {
            return [{ id: 'deepseek-chat' }, { id: 'deepseek-reasoner' }];
        }

        try {
            const response = await API.makeRequest('https://api.deepseek.com/models', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${config.DEEPSEEK_API_KEY}`
                }
            });

            if (response && response.data) {
                return response.data;
            }

            return [{ id: 'deepseek-chat' }, { id: 'deepseek-reasoner' }];
        } catch (error) {
            console.error('获取模型列表失败:', error);
            return [{ id: 'deepseek-chat' }, { id: 'deepseek-reasoner' }];
        }
    },

    /**
     * 获取事件详情
     * @param {Object} event - 基础事件数据
     * @param {Object} config - 配置信息
     * @returns {Promise<Object>} 详细事件数据
     */
    getEventDetail: async (event, config) => {
        if (!event.project_id || !event.target_id || !event.target_type) {
            return event; // 返回原始数据
        }

        try {
            let detailUrl = '';
            const baseUrl = `${config.GITLAB_URL}/projects/${event.project_id}`;
            
            // 根据不同的target_type构建API URL
            switch (event.target_type) {
                case 'Issue':
                    detailUrl = `${baseUrl}/issues/${event.target_iid || event.target_id}`;
                    break;
                case 'MergeRequest':
                    detailUrl = `${baseUrl}/merge_requests/${event.target_iid || event.target_id}`;
                    break;
                case 'Milestone':
                    detailUrl = `${baseUrl}/milestones/${event.target_id}`;
                    break;
                case 'WikiPage':
                    // Wiki页面需要特殊处理，获取所有wiki页面然后筛选
                    detailUrl = `${baseUrl}/wikis`;
                    break;
                case 'Snippet':
                    detailUrl = `${baseUrl}/snippets/${event.target_id}`;
                    break;
                default:
                    return event; // 不支持的类型，返回原始数据
            }

            // 添加访问令牌
            const url = `${detailUrl}?access_token=${config.ACCESS_TOKEN}`;
            
            // 获取详细信息
            const detailData = await API.makeRequest(url);
            
            // 对于Wiki页面，需要特殊处理
            if (event.target_type === 'WikiPage' && Array.isArray(detailData)) {
                const wikiPage = detailData.find(page => 
                    page.title === event.target_title || 
                    page.slug === event.target_title
                );
                return {
                    ...event,
                    detail: wikiPage || null
                };
            }
            
            // 合并详细信息到原始事件数据
            return {
                ...event,
                detail: detailData
            };
        } catch (error) {
            console.warn(`获取事件详情失败 (ID: ${event.id}, Type: ${event.target_type}):`, error);
            return event; // 失败时返回原始数据
        }
    },

    /**
     * 批量获取事件详情
     * @param {Array} events - 事件数组
     * @param {Object} config - 配置信息
     * @param {number} concurrency - 并发数量，默认为3
     * @returns {Promise<Array>} 包含详细信息的事件数组
     */
    getEventsDetail: async (events, config, concurrency = 3) => {
        if (!Array.isArray(events) || events.length === 0) {
            return events;
        }

        const results = [];
        const chunks = [];
        
        // 将事件分组以控制并发
        for (let i = 0; i < events.length; i += concurrency) {
            chunks.push(events.slice(i, i + concurrency));
        }

        // 逐批处理
        for (const chunk of chunks) {
            const promises = chunk.map(event => API.getEventDetail(event, config));
            const chunkResults = await Promise.all(promises);
            results.push(...chunkResults);
        }

        return results;
    }
};

export default API;
