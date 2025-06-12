import environmentAdapter from './utils/environment-adapter.js';

const CONFIG = {
    VERSION: '1.3.0',

    DEFAULT: {
        ACCESS_TOKEN: '',
        GITLAB_URL: 'https://www.lejuhub.com/api/v4',
        DEEPSEEK_MODEL: 'deepseek-chat',
        DEEPSEEK_MAX_TOKENS: 500,
        MAX_TOKENS: 500,
        DEEPSEEK_API_KEY: '',
        DEEPSEEK_BASE_URL: 'https://api.deepseek.com/v1/chat/completions',
        SYSTEM_PROMPT: `你是一名前端工程师, 现在需要提交一份100字左右的周报, 请根据Git提交记录生成一份简洁的周报;
请使用中文回答; 
请使用简单文本, 不要使用markdown格式;
减少笼统的描述;
不需要下周计划;`,
        DEFAULT_ADDITIONAL_PROMPT: '请重点突出具体完成的功能和修复的问题',
        THEME_MODE: 'system'
    },

    THEMES: {
        light: {
            background: '#ffffff',
            cardBg: '#f8f9fa',
            border: '#e1e5e9',
            borderLight: '#f0f0f0',
            text: '#1d1d1f',
            textSecondary: '#6e6e73',
            textMuted: '#8e8e93',
            primary: '#007aff',
            success: '#30d158',
            warning: '#ff9500',
            error: '#ff3b30',
            buttonBg: '#f2f2f7',
            hoverBg: '#f8f8f8',
            shadow: '0 1px 3px rgba(0,0,0,0.08)',
            shadowLarge: '0 4px 20px rgba(0,0,0,0.08)',
            // 滚动条颜色 - 浅色模式
            scrollbarTrack: '#f0f0f0',
            scrollbarThumb: '#c1c1c1',
            scrollbarThumbHover: '#a1a1a1',
            scrollbarThumbActive: '#8e8e93'
        },
        dark: {
            background: '#1c1c1e',
            cardBg: '#2c2c2e',
            border: '#38383a',
            borderLight: '#48484a',
            text: '#ffffff',
            textSecondary: '#aeaeb2',
            textMuted: '#8e8e93',
            primary: '#0a84ff',
            success: '#32d74b',
            warning: '#ff9f0a',
            error: '#ff453a',
            buttonBg: '#3a3a3c',
            hoverBg: '#48484a',
            shadow: '0 1px 3px rgba(0,0,0,0.3)',
            shadowLarge: '0 4px 20px rgba(0,0,0,0.25)',
            // 滚动条颜色 - 深色模式
            scrollbarTrack: '#2c2c2e',
            scrollbarThumb: '#5a5a5c',
            scrollbarThumbHover: '#6a6a6c',
            scrollbarThumbActive: '#7a7a7c'
        }
    },

    STORAGE_KEY: 'gitlab-weekly-report-config',

    /**
     * 获取配置信息
     * 使用适配器统一处理不同环境下的存储
     * @returns {Object} 配置对象
     */
    get: () => {
        try {
            // 同步获取存储数据，如果适配器不支持同步，则使用localStorage作为降级方案
            let savedConfig;
            
            // 尝试使用适配器的同步方法（如果存在）
            if (environmentAdapter.supportsGMStorage() && typeof window.GM_getValue !== 'undefined') {
                savedConfig = window.GM_getValue(CONFIG.STORAGE_KEY);
            } else if (environmentAdapter.supportsLocalStorage()) {
                savedConfig = localStorage.getItem(CONFIG.STORAGE_KEY);
            } else {
                // 降级到直接使用localStorage
                savedConfig = localStorage.getItem(CONFIG.STORAGE_KEY);
            }
            
            if (savedConfig) {
                try {
                    const parsedConfig = JSON.parse(savedConfig);
                    console.log('📖 配置加载成功:', Object.keys(parsedConfig));
                    return { ...CONFIG.DEFAULT, ...parsedConfig };
                } catch (e) {
                    console.error('配置解析失败，使用默认配置:', e);
                    return CONFIG.DEFAULT;
                }
            }
            
            console.log('📝 使用默认配置');
            return CONFIG.DEFAULT;
        } catch (error) {
            console.error('配置获取失败，使用默认配置:', error);
            return CONFIG.DEFAULT;
        }
    },

    /**
     * 保存配置信息
     * 使用适配器统一处理不同环境下的存储
     * @param {Object} config 配置对象
     * @returns {Promise<void>}
     */
    save: async (config) => {
        try {
            console.log('💾 正在保存配置:', Object.keys(config));
            
            // 使用适配器保存配置
            await environmentAdapter.setStorage(CONFIG.STORAGE_KEY, config);
            
            console.log('✅ 配置保存成功');
        } catch (error) {
            console.error('❌ 配置保存失败:', error);
            
            // 降级到直接使用localStorage
            try {
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(config));
                console.log('✅ 配置保存成功（降级到localStorage）');
            } catch (fallbackError) {
                console.error('❌ 配置保存完全失败:', fallbackError);
                throw new Error('配置保存失败，请检查浏览器存储权限');
            }
        }
    },

    /**
     * 重置配置信息
     * 使用适配器统一处理不同环境下的存储
     * @returns {Promise<Object>} 默认配置对象
     */
    reset: async () => {
        try {
            console.log('🗑️ 正在重置配置');
            
            // 使用适配器删除配置
            await environmentAdapter.removeStorage(CONFIG.STORAGE_KEY);
            
            console.log('✅ 配置重置成功');
            return CONFIG.DEFAULT;
        } catch (error) {
            console.error('❌ 配置重置失败:', error);
            
            // 降级到直接使用localStorage
            try {
                localStorage.removeItem(CONFIG.STORAGE_KEY);
                console.log('✅ 配置重置成功（降级到localStorage）');
                return CONFIG.DEFAULT;
            } catch (fallbackError) {
                console.error('❌ 配置重置完全失败:', fallbackError);
                throw new Error('配置重置失败，请检查浏览器存储权限');
            }
        }
    }
};

export default CONFIG;
