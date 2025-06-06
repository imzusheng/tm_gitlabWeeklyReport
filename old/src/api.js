const API = {
    makeRequest: (url, options = {}) => new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: options.method || 'GET',
            url,
            headers: options.headers || {},
            data: options.data,
            onload: (response) => {
                try {
                    const data = JSON.parse(response.responseText);
                    resolve(data);
                } catch (e) {
                    resolve(response.responseText);
                }
            },
            onerror: reject
        });
    }),

    getEvents: async (startDate, endDate, config) => {
        const params = {
            access_token: config.ACCESS_TOKEN,
            target_type: 'merge_request',
            per_page: 1000,
            after: startDate,
            before: endDate
        };
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
    }
};

export default API;
