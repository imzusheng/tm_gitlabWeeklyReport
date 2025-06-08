const CONFIG = {
    VERSION: '1.3.0',

    DEFAULT: {
        ACCESS_TOKEN: '',
        GITLAB_URL: 'https://www.lejuhub.com/api/v4',
        DEEPSEEK_MODEL: 'deepseek-chat',
        DEEPSEEK_MAX_TOKENS: 1000,
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
            shadowLarge: '0 4px 20px rgba(0,0,0,0.08)'
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
            shadowLarge: '0 4px 20px rgba(0,0,0,0.25)'
        }
    },

    STORAGE_KEY: 'gitlab-weekly-report-config',

    get: () => {
        const savedConfig = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (savedConfig) {
            try {
                return { ...CONFIG.DEFAULT, ...JSON.parse(savedConfig) };
            } catch (e) {
                console.error('配置解析失败，使用默认配置:', e);
                return CONFIG.DEFAULT;
            }
        }
        return CONFIG.DEFAULT;
    },

    save: (config) => {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(config));
    },

    reset: () => {
        localStorage.removeItem(CONFIG.STORAGE_KEY);
        return CONFIG.DEFAULT;
    }
};

export default CONFIG;
