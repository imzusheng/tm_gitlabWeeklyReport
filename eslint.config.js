import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2022,
                // Tampermonkey 全局变量
                GM_setValue: 'readonly',
                GM_getValue: 'readonly',
                GM_deleteValue: 'readonly',
                GM_listValues: 'readonly',
                GM_xmlhttpRequest: 'readonly',
                GM_notification: 'readonly',
                GM_openInTab: 'readonly',
                GM_setClipboard: 'readonly',
                GM_info: 'readonly',
                unsafeWindow: 'readonly'
            }
        },
        files: ['src/**/*.js'],
        rules: {
            // 基础规则
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-console': 'off',
            'no-debugger': 'warn',
            
            // 代码风格
            'indent': ['error', 4],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'comma-dangle': ['error', 'never'],
            
            // ES6+
            'prefer-const': 'error',
            'no-var': 'error',
            'arrow-spacing': 'error',
            
            // 最佳实践
            'eqeqeq': ['error', 'always'],
            'no-eval': 'error',
            'no-implied-eval': 'error'
        }
    }
];