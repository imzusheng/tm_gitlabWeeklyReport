#!/usr/bin/env node

/**
 * 双重事件绑定检测脚本
 * 用于检测项目中可能存在的双重事件绑定问题
 * 
 * 增强检测规则：
 * 1. JSX 文件中的事件绑定（onClick, onChange, onSubmit 等）
 * 2. JS 文件中的 addEventListener 绑定
 * 3. 多种 DOM 选择器支持（getElementById, querySelector, querySelectorAll）
 * 4. 事件类型匹配验证（click vs onClick, change vs onChange 等）
 * 5. 代码上下文分析，减少误报
 * 6. 支持动态生成的元素检测
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

class DuplicateBindingDetector {
    constructor() {
        this.jsxBindings = new Map(); // 存储 JSX 中的事件绑定
        this.jsBindings = new Map();  // 存储 JS 中的事件绑定
        this.duplicates = [];         // 存储发现的重复绑定
        this.srcDir = path.join(process.cwd(), 'src');
        
        // 事件类型映射表：JSX事件 -> DOM事件
        this.eventTypeMap = {
            'onClick': 'click',
            'onChange': 'change',
            'onSubmit': 'submit',
            'onFocus': 'focus',
            'onBlur': 'blur',
            'onKeyDown': 'keydown',
            'onKeyUp': 'keyup',
            'onMouseOver': 'mouseover',
            'onMouseOut': 'mouseout',
            'onLoad': 'load',
            'onInput': 'input'
        };
        
        // DOM 选择器模式
        this.selectorPatterns = [
            // getElementById
            /document\.getElementById\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
            // querySelector with ID
            /document\.querySelector\s*\(\s*['"]#([^'"]+)['"]\s*\)/g,
            // querySelectorAll with ID
            /document\.querySelectorAll\s*\(\s*['"]#([^'"]+)['"]\s*\)/g,
            // jQuery style (if used)
            /\$\s*\(\s*['"]#([^'"]+)['"]\s*\)/g
        ];
    }

    /**
     * 扫描 JSX 文件中的事件绑定
     * @param {string} filePath - 文件路径
     */
    scanJSXBindings(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const relativePath = path.relative(this.srcDir, filePath);
            
            // 为每种事件类型创建检测模式
            for (const [jsxEvent, domEvent] of Object.entries(this.eventTypeMap)) {
                // 匹配 JSX 中的事件绑定模式
                // 支持多种格式：
                // <button id="btn" onClick={handler}
                // <input id="input" onChange={handler} />
                // <form id="form" onSubmit={handler}>
                const jsxPattern = new RegExp(
                    `<\\w+[^>]*\\sid=["']([^"']+)["'][^>]*\\s${jsxEvent}\\s*=\\s*\\{[^}]+\\}`,
                    'g'
                );
                
                let match;
                while ((match = jsxPattern.exec(content)) !== null) {
                    const elementId = match[1];
                    const lineNumber = content.substring(0, match.index).split('\n').length;
                    
                    // 获取完整的标签内容用于上下文分析
                    const tagMatch = content.substring(match.index).match(/<[^>]+>/)?.[0] || match[0];
                    
                    if (!this.jsxBindings.has(elementId)) {
                        this.jsxBindings.set(elementId, []);
                    }
                    
                    this.jsxBindings.get(elementId).push({
                        file: relativePath,
                        line: lineNumber,
                        eventType: jsxEvent,
                        domEventType: domEvent,
                        pattern: tagMatch.length > 80 ? tagMatch.substring(0, 80) + '...' : tagMatch,
                        fullMatch: match[0]
                    });
                }
            }
            
            // 额外检测没有明确事件类型映射的自定义事件
            const customEventPattern = /<\w+[^>]*\sid=["']([^"']+)["'][^>]*\son[A-Z]\w+\s*=\s*\{[^}]+\}/g;
            let customMatch;
            while ((customMatch = customEventPattern.exec(content)) !== null) {
                const elementId = customMatch[1];
                const eventMatch = customMatch[0].match(/\son([A-Z]\w+)\s*=/);
                if (eventMatch && !this.eventTypeMap[eventMatch[1]]) {
                    const lineNumber = content.substring(0, customMatch.index).split('\n').length;
                    
                    if (!this.jsxBindings.has(elementId)) {
                        this.jsxBindings.set(elementId, []);
                    }
                    
                    this.jsxBindings.get(elementId).push({
                        file: relativePath,
                        line: lineNumber,
                        eventType: eventMatch[1],
                        domEventType: 'unknown',
                        pattern: customMatch[0].substring(0, 80) + '...',
                        fullMatch: customMatch[0],
                        isCustomEvent: true
                    });
                }
            }
        } catch (error) {
            console.warn(`警告: 无法读取文件 ${filePath}: ${error.message}`);
        }
    }

    /**
     * 扫描 JS 文件中的事件绑定
     * @param {string} filePath - 文件路径
     */
    scanJSBindings(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const relativePath = path.relative(this.srcDir, filePath);
            
            // 检测各种 DOM 选择器和事件绑定组合
            this.detectEventListeners(content, relativePath);
            this.detectDirectEventAssignment(content, relativePath);
            this.detectJQueryBindings(content, relativePath);
            
        } catch (error) {
            console.warn(`警告: 无法读取文件 ${filePath}: ${error.message}`);
        }
    }
    
    /**
     * 检测 addEventListener 绑定
     * @param {string} content - 文件内容
     * @param {string} relativePath - 相对路径
     */
    detectEventListeners(content, relativePath) {
        // 支持多种选择器的 addEventListener 模式
        const patterns = [
            // document.getElementById('id').addEventListener('event', handler)
            /document\.getElementById\s*\(\s*['"]([^'"]+)['"]\s*\)[^;]*\.addEventListener\s*\(\s*['"]([^'"]+)['"]\s*,/g,
            // document.querySelector('#id').addEventListener('event', handler)
            /document\.querySelector\s*\(\s*['"]#([^'"]+)['"]\s*\)[^;]*\.addEventListener\s*\(\s*['"]([^'"]+)['"]\s*,/g,
            // element.addEventListener('event', handler) - 需要上下文分析
            /(\w+)\.addEventListener\s*\(\s*['"]([^'"]+)['"]\s*,/g
        ];
        
        patterns.forEach((pattern, index) => {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                let elementId, eventType;
                
                if (index < 2) {
                    // 直接选择器模式
                    elementId = match[1];
                    eventType = match[2];
                } else {
                    // 变量模式，需要上下文分析
                    const variableName = match[1];
                    eventType = match[2];
                    elementId = this.analyzeVariableContext(content, variableName, match.index);
                    if (!elementId) continue;
                }
                
                const lineNumber = content.substring(0, match.index).split('\n').length;
                const fullLine = content.split('\n')[lineNumber - 1]?.trim() || '';
                
                if (!this.jsBindings.has(elementId)) {
                    this.jsBindings.set(elementId, []);
                }
                
                this.jsBindings.get(elementId).push({
                    file: relativePath,
                    line: lineNumber,
                    eventType: eventType,
                    selectorType: index === 0 ? 'getElementById' : index === 1 ? 'querySelector' : 'variable',
                    pattern: fullLine.length > 100 ? fullLine.substring(0, 100) + '...' : fullLine,
                    fullMatch: match[0]
                });
            }
        });
    }
    
    /**
     * 检测直接事件属性赋值
     * @param {string} content - 文件内容
     * @param {string} relativePath - 相对路径
     */
    detectDirectEventAssignment(content, relativePath) {
        // 检测 element.onclick = handler 模式
        const directPattern = /document\.getElementById\s*\(\s*['"]([^'"]+)['"]\s*\)\.on(\w+)\s*=/g;
        
        let match;
        while ((match = directPattern.exec(content)) !== null) {
            const elementId = match[1];
            const eventType = match[2]; // click, change, etc.
            const lineNumber = content.substring(0, match.index).split('\n').length;
            const fullLine = content.split('\n')[lineNumber - 1]?.trim() || '';
            
            if (!this.jsBindings.has(elementId)) {
                this.jsBindings.set(elementId, []);
            }
            
            this.jsBindings.get(elementId).push({
                file: relativePath,
                line: lineNumber,
                eventType: eventType,
                selectorType: 'directAssignment',
                pattern: fullLine.length > 100 ? fullLine.substring(0, 100) + '...' : fullLine,
                fullMatch: match[0]
            });
        }
    }
    
    /**
     * 检测 jQuery 风格的事件绑定
     * @param {string} content - 文件内容
     * @param {string} relativePath - 相对路径
     */
    detectJQueryBindings(content, relativePath) {
        // 检测 $('#id').on('event', handler) 和 $('#id').click(handler) 模式
        const jqueryPatterns = [
            /\$\s*\(\s*['"]#([^'"]+)['"]\s*\)\.on\s*\(\s*['"]([^'"]+)['"]\s*,/g,
            /\$\s*\(\s*['"]#([^'"]+)['"]\s*\)\.(\w+)\s*\(/g
        ];
        
        jqueryPatterns.forEach((pattern, index) => {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                const elementId = match[1];
                const eventType = match[2];
                const lineNumber = content.substring(0, match.index).split('\n').length;
                const fullLine = content.split('\n')[lineNumber - 1]?.trim() || '';
                
                // 过滤掉非事件方法
                if (index === 1 && !['click', 'change', 'submit', 'focus', 'blur', 'keydown', 'keyup'].includes(eventType)) {
                    continue;
                }
                
                if (!this.jsBindings.has(elementId)) {
                    this.jsBindings.set(elementId, []);
                }
                
                this.jsBindings.get(elementId).push({
                    file: relativePath,
                    line: lineNumber,
                    eventType: eventType,
                    selectorType: 'jquery',
                    pattern: fullLine.length > 100 ? fullLine.substring(0, 100) + '...' : fullLine,
                    fullMatch: match[0]
                });
            }
        });
    }
    
    /**
     * 分析变量上下文，尝试找到元素ID
     * @param {string} content - 文件内容
     * @param {string} variableName - 变量名
     * @param {number} currentIndex - 当前匹配位置
     * @returns {string|null} - 元素ID或null
     */
    analyzeVariableContext(content, variableName, currentIndex) {
        // 在当前位置之前查找变量赋值
        const beforeContent = content.substring(0, currentIndex);
        
        // 查找 const/let/var variableName = document.getElementById('id')
        const assignmentPatterns = [
            new RegExp(`(?:const|let|var)\\s+${variableName}\\s*=\\s*document\\.getElementById\\s*\\(\\s*['"]([^'"]+)['"]\\s*\\)`, 'g'),
            new RegExp(`${variableName}\\s*=\\s*document\\.getElementById\\s*\\(\\s*['"]([^'"]+)['"]\\s*\\)`, 'g'),
            new RegExp(`(?:const|let|var)\\s+${variableName}\\s*=\\s*document\\.querySelector\\s*\\(\\s*['"]#([^'"]+)['"]\\s*\\)`, 'g')
        ];
        
        for (const pattern of assignmentPatterns) {
            const matches = [...beforeContent.matchAll(pattern)];
            if (matches.length > 0) {
                // 返回最后一次赋值的ID
                return matches[matches.length - 1][1];
            }
        }
        
        return null;
    }

    /**
     * 检测重复绑定（增强版）
     */
    detectDuplicates() {
        // 检查 JSX 绑定和 JS 绑定中的重复 ID
        for (const [elementId, jsxBindings] of this.jsxBindings) {
            if (this.jsBindings.has(elementId)) {
                const jsBindings = this.jsBindings.get(elementId);
                
                // 分析事件类型匹配
                const conflicts = this.analyzeEventConflicts(jsxBindings, jsBindings);
                
                if (conflicts.length > 0) {
                    this.duplicates.push({
                        elementId,
                        jsxBindings,
                        jsBindings,
                        conflicts,
                        severity: this.calculateSeverity(conflicts),
                        message: this.generateConflictMessage(elementId, conflicts),
                        suggestions: this.generateSuggestions(conflicts)
                    });
                }
            }
        }
    }
    
    /**
     * 分析事件冲突
     * @param {Array} jsxBindings - JSX 绑定
     * @param {Array} jsBindings - JS 绑定
     * @returns {Array} - 冲突列表
     */
    analyzeEventConflicts(jsxBindings, jsBindings) {
        const conflicts = [];
        
        for (const jsxBinding of jsxBindings) {
            for (const jsBinding of jsBindings) {
                const conflictType = this.getConflictType(jsxBinding, jsBinding);
                if (conflictType !== 'none') {
                    conflicts.push({
                        jsxBinding,
                        jsBinding,
                        type: conflictType,
                        confidence: this.calculateConfidence(jsxBinding, jsBinding, conflictType)
                    });
                }
            }
        }
        
        return conflicts;
    }
    
    /**
     * 获取冲突类型
     * @param {Object} jsxBinding - JSX 绑定
     * @param {Object} jsBinding - JS 绑定
     * @returns {string} - 冲突类型
     */
    getConflictType(jsxBinding, jsBinding) {
        const jsxEventType = jsxBinding.eventType;
        const jsEventType = jsBinding.eventType;
        const jsxDomEvent = jsxBinding.domEventType;
        
        // 直接匹配：onClick vs click
        if (jsxDomEvent === jsEventType) {
            return 'direct_match';
        }
        
        // 模糊匹配：可能的事件冲突
        const similarEvents = {
            'click': ['click', 'mousedown', 'mouseup'],
            'change': ['change', 'input'],
            'submit': ['submit'],
            'focus': ['focus', 'focusin'],
            'blur': ['blur', 'focusout']
        };
        
        for (const [baseEvent, variants] of Object.entries(similarEvents)) {
            if (jsxDomEvent === baseEvent && variants.includes(jsEventType)) {
                return 'similar_match';
            }
        }
        
        // 自定义事件检查
        if (jsxBinding.isCustomEvent && jsEventType === 'click') {
            return 'potential_match';
        }
        
        return 'none';
    }
    
    /**
     * 计算冲突置信度
     * @param {Object} jsxBinding - JSX 绑定
     * @param {Object} jsBinding - JS 绑定
     * @param {string} conflictType - 冲突类型
     * @returns {number} - 置信度 (0-1)
     */
    calculateConfidence(jsxBinding, jsBinding, conflictType) {
        let confidence = 0;
        
        switch (conflictType) {
            case 'direct_match':
                confidence = 0.95;
                break;
            case 'similar_match':
                confidence = 0.8;
                break;
            case 'potential_match':
                confidence = 0.6;
                break;
        }
        
        // 根据选择器类型调整置信度
        if (jsBinding.selectorType === 'getElementById') {
            confidence += 0.05;
        } else if (jsBinding.selectorType === 'variable') {
            confidence -= 0.1; // 变量分析可能不准确
        }
        
        return Math.min(1, Math.max(0, confidence));
    }
    
    /**
     * 计算严重程度
     * @param {Array} conflicts - 冲突列表
     * @returns {string} - 严重程度
     */
    calculateSeverity(conflicts) {
        const maxConfidence = Math.max(...conflicts.map(c => c.confidence));
        
        if (maxConfidence >= 0.9) return 'critical';
        if (maxConfidence >= 0.7) return 'high';
        if (maxConfidence >= 0.5) return 'medium';
        return 'low';
    }
    
    /**
     * 生成冲突消息
     * @param {string} elementId - 元素ID
     * @param {Array} conflicts - 冲突列表
     * @returns {string} - 冲突消息
     */
    generateConflictMessage(elementId, conflicts) {
        const highConfidenceConflicts = conflicts.filter(c => c.confidence >= 0.7);
        
        if (highConfidenceConflicts.length > 0) {
            const eventTypes = [...new Set(highConfidenceConflicts.map(c => c.jsxBinding.eventType))];
            return `元素 "${elementId}" 存在高置信度的双重事件绑定 (${eventTypes.join(', ')})`;
        } else {
            return `元素 "${elementId}" 可能存在双重事件绑定`;
        }
    }
    
    /**
     * 生成修复建议
     * @param {Array} conflicts - 冲突列表
     * @returns {Array} - 建议列表
     */
    generateSuggestions(conflicts) {
        const suggestions = [];
        const highConfidenceConflicts = conflicts.filter(c => c.confidence >= 0.7);
        
        if (highConfidenceConflicts.length > 0) {
            suggestions.push('移除 JS 文件中的事件监听器，保留 JSX 中的事件绑定');
            suggestions.push('确保同一元素的同一事件只绑定一次');
        }
        
        const variableConflicts = conflicts.filter(c => c.jsBinding.selectorType === 'variable');
        if (variableConflicts.length > 0) {
            suggestions.push('检查变量赋值的上下文，确认元素选择的准确性');
        }
        
        const customEventConflicts = conflicts.filter(c => c.jsxBinding.isCustomEvent);
        if (customEventConflicts.length > 0) {
            suggestions.push('检查自定义事件是否与标准事件冲突');
        }
        
        return suggestions;
    }

    /**
     * 扫描所有相关文件
     */
    async scanAllFiles() {
        console.log('🔍 开始扫描双重事件绑定...');
        
        // 扫描 JSX 文件
        const jsxFiles = glob.sync('**/*.jsx', { cwd: this.srcDir });
        console.log(`📄 找到 ${jsxFiles.length} 个 JSX 文件`);
        
        for (const file of jsxFiles) {
            const fullPath = path.join(this.srcDir, file);
            this.scanJSXBindings(fullPath);
        }
        
        // 扫描 JS 文件
        const jsFiles = glob.sync('**/*.js', { cwd: this.srcDir });
        console.log(`📄 找到 ${jsFiles.length} 个 JS 文件`);
        
        for (const file of jsFiles) {
            const fullPath = path.join(this.srcDir, file);
            this.scanJSBindings(fullPath);
        }
        
        console.log(`\n📊 扫描结果:`);
        console.log(`   - JSX 事件绑定: ${this.jsxBindings.size} 个元素`);
        console.log(`   - JS 事件绑定: ${this.jsBindings.size} 个元素`);
    }

    /**
     * 生成检测报告（增强版）
     */
    generateReport() {
        this.detectDuplicates();
        
        console.log('\n' + '='.repeat(70));
        console.log('🚨 双重事件绑定检测报告 (增强版)');
        console.log('='.repeat(70));
        
        // 统计信息
        console.log(`📊 扫描统计:`);
        console.log(`   - JSX 事件绑定: ${this.jsxBindings.size} 个元素`);
        console.log(`   - JS 事件绑定: ${this.jsBindings.size} 个元素`);
        console.log(`   - 检测到的冲突: ${this.duplicates.length} 个`);
        
        if (this.duplicates.length === 0) {
            console.log('\n✅ 未发现双重事件绑定问题！');
            return true;
        }
        
        // 按严重程度分类
        const severityGroups = this.groupBySeverity(this.duplicates);
        
        console.log(`\n❌ 发现 ${this.duplicates.length} 个潜在的双重事件绑定问题:\n`);
        
        // 按严重程度输出
        const severityOrder = ['critical', 'high', 'medium', 'low'];
        const severityIcons = {
            'critical': '🔴',
            'high': '🟠', 
            'medium': '🟡',
            'low': '🔵'
        };
        
        severityOrder.forEach(severity => {
            if (severityGroups[severity] && severityGroups[severity].length > 0) {
                console.log(`${severityIcons[severity]} ${severity.toUpperCase()} 级别问题 (${severityGroups[severity].length} 个):`);
                
                severityGroups[severity].forEach((duplicate, index) => {
                    this.printDuplicateDetails(duplicate, index + 1);
                });
                console.log('');
            }
        });
        
        // 总体建议
        this.printGeneralSuggestions();
        
        // 根据严重程度决定是否失败
        const hasCriticalOrHigh = severityGroups.critical?.length > 0 || severityGroups.high?.length > 0;
        return !hasCriticalOrHigh;
    }
    
    /**
     * 按严重程度分组
     * @param {Array} duplicates - 重复绑定列表
     * @returns {Object} - 分组结果
     */
    groupBySeverity(duplicates) {
        return duplicates.reduce((groups, duplicate) => {
            const severity = duplicate.severity;
            if (!groups[severity]) {
                groups[severity] = [];
            }
            groups[severity].push(duplicate);
            return groups;
        }, {});
    }
    
    /**
     * 打印重复绑定详情
     * @param {Object} duplicate - 重复绑定对象
     * @param {number} index - 索引
     */
    printDuplicateDetails(duplicate, index) {
        console.log(`\n   ${index}. 元素 ID: "${duplicate.elementId}"`);
        console.log(`      问题描述: ${duplicate.message}`);
        
        // 显示冲突详情
        if (duplicate.conflicts && duplicate.conflicts.length > 0) {
            console.log(`      冲突详情:`);
            duplicate.conflicts.forEach((conflict, i) => {
                const confidencePercent = Math.round(conflict.confidence * 100);
                console.log(`        ${i + 1}. ${conflict.type} (置信度: ${confidencePercent}%)`);
                console.log(`           JSX: ${conflict.jsxBinding.eventType} in ${conflict.jsxBinding.file}:${conflict.jsxBinding.line}`);
                console.log(`           JS:  ${conflict.jsBinding.eventType} (${conflict.jsBinding.selectorType}) in ${conflict.jsBinding.file}:${conflict.jsBinding.line}`);
            });
        }
        
        // JSX 绑定详情
        console.log(`      JSX 绑定:`);
        duplicate.jsxBindings.forEach(binding => {
            console.log(`        📄 ${binding.file}:${binding.line}`);
            console.log(`           事件: ${binding.eventType} -> ${binding.domEventType}`);
            console.log(`           代码: ${binding.pattern}`);
        });
        
        // JS 绑定详情
        console.log(`      JS 绑定:`);
        duplicate.jsBindings.forEach(binding => {
            console.log(`        📄 ${binding.file}:${binding.line}`);
            console.log(`           事件: ${binding.eventType} (${binding.selectorType})`);
            console.log(`           代码: ${binding.pattern}`);
        });
        
        // 修复建议
        if (duplicate.suggestions && duplicate.suggestions.length > 0) {
            console.log(`      🔧 修复建议:`);
            duplicate.suggestions.forEach(suggestion => {
                console.log(`        - ${suggestion}`);
            });
        }
    }
    
    /**
     * 打印通用建议
     */
    printGeneralSuggestions() {
        console.log('='.repeat(70));
        console.log('💡 通用修复建议:');
        console.log('   1. 🎯 优先使用 JSX 的事件属性 (onClick, onChange 等)');
        console.log('   2. 🚫 避免在 JS 文件中重复绑定相同元素的相同事件');
        console.log('   3. 🔍 使用统一的事件绑定策略，避免混合使用');
        console.log('   4. 📝 在代码审查时重点检查事件绑定的重复性');
        console.log('   5. 🧪 定期运行此检测工具确保代码质量');
        console.log('');
        console.log('📚 事件绑定最佳实践:');
        console.log('   - JSX 组件内使用 onClick={handler} 形式');
        console.log('   - 避免在 useEffect 或 componentDidMount 中重复绑定');
        console.log('   - 使用 React 的合成事件系统，减少直接 DOM 操作');
        console.log('='.repeat(70));
    }

    /**
     * 运行检测
     */
    async run() {
        try {
            await this.scanAllFiles();
            const isClean = this.generateReport();
            
            // 如果发现问题，退出码为 1
            process.exit(isClean ? 0 : 1);
        } catch (error) {
            console.error('❌ 检测过程中发生错误:', error.message);
            process.exit(1);
        }
    }
}

// 运行检测
if (require.main === module) {
    const detector = new DuplicateBindingDetector();
    detector.run();
}

module.exports = DuplicateBindingDetector;