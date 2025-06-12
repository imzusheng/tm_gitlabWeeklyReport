import { createElement } from '../utils/jsx-runtime.js';
import CONFIG from '../config.js';

export const SettingsPanel = ({ onClose, onSave, onReset, userBalance: _userBalance, tokenUsage }) => {
    const config = CONFIG.get();
    
    return createElement('div', {
        className: 'settings-panel',
        style: {
            position: 'fixed',
            top: '60px',
            right: '20px',
            width: '480px',
            maxHeight: 'calc(100vh - 80px)',
            background: 'var(--panel-bg, white)',
            border: '1px solid var(--border-color, #e1e5e9)',
            borderRadius: '12px',
            backdropFilter: 'blur(20px)',
            zIndex: '10001',
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }
    }, [
        // 头部
        createElement('div', {
            className: 'settings-header',
            style: {
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-light, #f0f0f0)',
                background: 'var(--card-bg, #f8f9fa)',
                borderRadius: '12px 12px 0 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }
        }, [
            createElement('h3', {
                style: {
                    margin: '0',
                    color: 'var(--text-color, #1d1d1f)',
                    fontSize: '16px',
                    fontWeight: '600'
                }
            }, '⚙️ 插件设置'),
            createElement('button', {
                id: 'close-settings-panel',
                onClick: onClose,
                style: {
                    background: 'var(--button-bg, #f2f2f7)',
                    border: 'none',
                    fontSize: 'var(--font-lg, 14px)',
                    cursor: 'pointer',
                    color: 'var(--text-muted, #8e8e93)',
                    padding: 'var(--spacing-xs, 4px) var(--spacing-sm, 8px)',
                    borderRadius: 'var(--radius-md, 6px)',
                    transition: 'all 0.2s ease',
                    width: 'var(--button-height-sm, 28px)',
                    height: 'var(--button-height-sm, 28px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            }, '×')
        ]),
        
        // 内容区域
        createElement('div', {
            className: 'settings-content',
            style: {
                maxHeight: 'calc(100vh - 200px)',
                overflowY: 'auto',
                padding: '16px 20px'
            }
        }, [
            // 外观设置
            createElement('div', {
                className: 'settings-section',
                style: { marginBottom: '20px' }
            }, [
                createElement('h4', {
                    style: {
                        margin: '0 0 10px 0',
                        color: 'var(--text-color, #1d1d1f)',
                        fontSize: '14px',
                        fontWeight: '600'
                    }
                }, '外观设置'),
                createElement('div', {
                    style: { marginBottom: '12px' }
                }, [
                    createElement('label', {
                        style: {
                            display: 'block',
                            marginBottom: '6px',
                            fontSize: '13px',
                            color: 'var(--text-secondary, #6e6e73)',
                            fontWeight: '500'
                        }
                    }, '主题模式:'),
                    createElement('select', {
                        id: 'theme-mode',
                        defaultValue: config.THEME_MODE,
                        style: {
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '8px 10px',
                            border: '1px solid var(--border-color, #e1e5e9)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            background: 'var(--panel-bg, white)',
                            color: 'var(--text-color, #1d1d1f)',
                            transition: 'border-color 0.2s ease, background 0.2s ease'
                        }
                    }, [
                        createElement('option', { value: 'light' }, '浅色模式'),
                        createElement('option', { value: 'dark' }, '深色模式'),
                        createElement('option', { value: 'system' }, '跟随系统')
                    ])
                ])
            ]),
            
            // GitLab 配置
            createElement('div', {
                className: 'settings-section',
                style: { marginBottom: '20px' }
            }, [
                createElement('h4', {
                    style: {
                        margin: '0 0 10px 0',
                        color: 'var(--text-color, #1d1d1f)',
                        fontSize: '14px',
                        fontWeight: '600'
                    }
                }, 'GitLab 配置'),
                createElement('div', {
                    style: { marginBottom: '12px' }
                }, [
                    createElement('label', {
                        style: {
                            display: 'block',
                            marginBottom: '6px',
                            fontSize: '13px',
                            color: 'var(--text-secondary, #6e6e73)',
                            fontWeight: '500'
                        }
                    }, 'GitLab API URL:'),
                    createElement('input', {
                        type: 'text',
                        id: 'gitlab-url',
                        defaultValue: config.GITLAB_URL,
                        style: {
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '8px 10px',
                            border: '1px solid var(--border-color, #e1e5e9)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            background: 'var(--panel-bg, white)',
                            color: 'var(--text-color, #1d1d1f)',
                            transition: 'border-color 0.2s ease, background 0.2s ease'
                        }
                    })
                ]),
                createElement('div', {
                    style: { marginBottom: '12px' }
                }, [
                    createElement('label', {
                        style: {
                            display: 'block',
                            marginBottom: '6px',
                            fontSize: '13px',
                            color: 'var(--text-secondary, #6e6e73)',
                            fontWeight: '500'
                        }
                    }, 'Access Token:'),
                    createElement('input', {
                        type: 'text',
                        id: 'access-token',
                        defaultValue: config.ACCESS_TOKEN,
                        style: {
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '8px 10px',
                            border: '1px solid var(--border-color, #e1e5e9)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            background: 'var(--panel-bg, white)',
                            color: 'var(--text-color, #1d1d1f)',
                            transition: 'border-color 0.2s ease, background 0.2s ease'
                        }
                    })
                ])
            ]),
            
            // AI 配置
            createElement('div', {
                className: 'settings-section',
                style: { marginBottom: '20px' }
            }, [
                createElement('h4', {
                    style: {
                        margin: '0 0 10px 0',
                        color: 'var(--text-color, #1d1d1f)',
                        fontSize: '14px',
                        fontWeight: '600'
                    }
                }, 'AI 配置'),
                createElement('div', {
                    style: { marginBottom: '12px' }
                }, [
                    createElement('label', {
                        style: {
                            display: 'block',
                            marginBottom: '6px',
                            fontSize: '13px',
                            color: 'var(--text-secondary, #6e6e73)',
                            fontWeight: '500'
                        }
                    }, 'DeepSeek API URL:'),
                    createElement('input', {
                        type: 'text',
                        id: 'deepseek-url',
                        defaultValue: config.DEEPSEEK_BASE_URL,
                        style: {
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '8px 10px',
                            border: '1px solid var(--border-color, #e1e5e9)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            background: 'var(--panel-bg, white)',
                            color: 'var(--text-color, #1d1d1f)',
                            transition: 'border-color 0.2s ease, background 0.2s ease'
                        }
                    })
                ]),
                createElement('div', {
                    style: { marginBottom: '12px' }
                }, [
                    createElement('label', {
                        style: {
                            display: 'block',
                            marginBottom: '6px',
                            fontSize: '13px',
                            color: 'var(--text-secondary, #6e6e73)',
                            fontWeight: '500'
                        }
                    }, 'API Key:'),
                    createElement('input', {
                        type: 'text',
                        id: 'deepseek-key',
                        defaultValue: config.DEEPSEEK_API_KEY,
                        style: {
                            width: '100%',
                            boxSizing: 'border-box',
                            padding: '8px 10px',
                            border: '1px solid var(--border-color, #e1e5e9)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            background: 'var(--panel-bg, white)',
                            color: 'var(--text-color, #1d1d1f)',
                            transition: 'border-color 0.2s ease, background 0.2s ease'
                        }
                    })
                ]),
                createElement('div', {
                    style: { marginBottom: '12px' }
                }, [
                    createElement('label', {
                        style: {
                            display: 'block',
                            marginBottom: '6px',
                            fontSize: '13px',
                            color: 'var(--text-secondary, #6e6e73)',
                            fontWeight: '500'
                        }
                    }, '模型:'),
                    createElement('select', {
                        id: 'deepseek-model',
                        defaultValue: config.DEEPSEEK_MODEL,
                        style: {
                            width: '100%',
                            padding: '8px 10px',
                            border: '1px solid var(--border-color, #e1e5e9)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            background: 'var(--panel-bg, white)',
                            color: 'var(--text-color, #1d1d1f)',
                            transition: 'border-color 0.2s ease, background 0.2s ease',
                            boxSizing: 'border-box'
                        }
                    }, [
                        createElement('option', { value: 'deepseek-chat' }, 'deepseek-chat'),
                        createElement('option', { value: 'deepseek-coder' }, 'deepseek-coder')
                    ])
                ]),
                createElement('div', {
                    style: { marginBottom: '12px' }
                }, [
                    createElement('label', {
                        style: {
                            display: 'block',
                            marginBottom: '6px',
                            fontSize: '13px',
                            color: 'var(--text-secondary, #6e6e73)',
                            fontWeight: '500'
                        }
                    }, '最大Token数 (100-2000):'),
                    createElement('input', {
                        type: 'number',
                        id: 'max-tokens',
                        defaultValue: config.MAX_TOKENS,
                        min: '100',
                        max: '2000',
                        style: {
                            width: '100%',
                            padding: '8px 10px',
                            border: '1px solid var(--border-color, #e1e5e9)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            background: 'var(--panel-bg, white)',
                            color: 'var(--text-color, #1d1d1f)',
                            transition: 'border-color 0.2s ease, background 0.2s ease'
                        }
                    })
                ])
            ])
        ]),
        
        // 底部操作区域
        createElement('div', {
            className: 'settings-footer',
            style: {
                padding: '16px 20px',
                borderTop: '1px solid var(--border-light, #f0f0f0)',
                background: 'var(--card-bg, #f8f9fa)',
                borderRadius: '0 0 12px 12px'
            }
        }, [
            createElement('div', {
                style: {
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'flex-end',
                    marginBottom: '12px'
                }
            }, [
                createElement('button', {
                    id: 'reset-settings',
                    onClick: onReset,
                    style: {
                        padding: 'var(--spacing-sm, 8px) var(--spacing-lg, 16px)',
                        background: 'var(--button-bg, #f2f2f7)',
                        border: 'none',
                        borderRadius: 'var(--radius-md, 6px)',
                        cursor: 'pointer',
                        fontSize: 'var(--font-md, 13px)',
                        color: 'var(--text-secondary, #6e6e73)',
                        transition: 'all 0.2s ease',
                        fontWeight: 'var(--font-medium, 500)',
                        height: 'var(--button-height-md, 36px)'
                    }
                }, '重置'),
                createElement('button', {
                    id: 'save-settings',
                    onClick: onSave,
                    style: {
                        padding: 'var(--spacing-sm, 8px) var(--spacing-lg, 16px)',
                        background: 'var(--primary-color, #007aff)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md, 6px)',
                        cursor: 'pointer',
                        fontSize: 'var(--font-md, 13px)',
                        transition: 'all 0.2s ease',
                        fontWeight: 'var(--font-medium, 500)',
                        height: 'var(--button-height-md, 36px)'
                    }
                }, '保存设置')
            ]),
            // 移除重复的余额显示，避免与ai-panel中的balanceInfo id冲突
            createElement('div', {
                id: 'token-usage',
                style: {
                    fontSize: '11px',
                    color: 'var(--text-muted, #8e8e93)',
                    textAlign: 'center'
                }
            }, tokenUsage ? `本次回答使用的Token: ${tokenUsage.prompt_tokens}+${tokenUsage.completion_tokens}=${tokenUsage.total_tokens}` : '')
        ])
    ]);
};