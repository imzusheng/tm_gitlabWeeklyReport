const Utils = {
    formatDate: (date) => date.toISOString().split('T')[0],

    formatTime: (time) => {
        const date = new Date(time);
        return date.toLocaleString('zh-CN');
    },

    getDateRange: (offset = 0) => {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + 1 + offset * 7);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return [Utils.formatDate(startOfWeek), Utils.formatDate(endOfWeek)];
    },

    getThisWeekRange: () => Utils.getDateRange(0),

    getLastWeekRange: () => Utils.getDateRange(-1),

    getThisMonthRange: () => {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return [Utils.formatDate(startOfMonth), Utils.formatDate(endOfMonth)];
    },

    getLastMonthRange: () => {
        const today = new Date();
        const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        return [Utils.formatDate(startOfLastMonth), Utils.formatDate(endOfLastMonth)];
    },

    validateTokenInput: (input, showNotification) => {
        if (!input) {return;}

        input.addEventListener('input', (e) => {
            const value = parseInt(e.target.value, 10);
            if (Number.isNaN(value) || value < 100) {
                e.target.value = '100';
            } else if (value > 2000) {
                e.target.value = '2000';
                if (showNotification) {
                    showNotification('Token数量不能超过2000', 'warning');
                }
            }
        });

        input.addEventListener('blur', (e) => {
            const value = parseInt(e.target.value, 10);
            if (Number.isNaN(value) || value < 100) {
                e.target.value = '100';
            } else if (value > 2000) {
                e.target.value = '2000';
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const value = parseInt(e.target.value, 10);
                if (Number.isNaN(value) || value < 100) {
                    e.target.value = '100';
                } else if (value > 2000) {
                    e.target.value = '2000';
                }
            }
        });
    },

    validateConfig: (config) => {
        const errors = [];

        if (!config.ACCESS_TOKEN.trim()) {
            errors.push('GitLab Access Token 未配置');
        }

        if (!config.DEEPSEEK_API_KEY.trim()) {
            errors.push('DeepSeek API Key 未配置');
        }

        if (!config.GITLAB_URL.trim()) {
            errors.push('GitLab API URL 未配置');
        }

        if (!config.DEEPSEEK_BASE_URL.trim()) {
            errors.push('DeepSeek API URL 未配置');
        }

        return errors;
    },

    exportToCsv: (data, startDate, endDate) => {
        const csvContent = [
            ['序号', '时间', '提交内容'].join(','),
            ...data.map((event, index) => [
                index + 1,
                Utils.formatTime(event.created_at),
                `"${(event.target_title || '').replace(/"/g, '""')}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([`\ufeff${csvContent}`], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (window.URL && window.URL.createObjectURL) {
            link.href = window.URL.createObjectURL(blob);
            const fileName = `GitLab提交记录_${startDate}_${endDate}.csv`;
            link.download = fileName;
            link.click();
            return true;
        }
        return false;
    },

    detectSystemTheme: () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
};

export default Utils;
