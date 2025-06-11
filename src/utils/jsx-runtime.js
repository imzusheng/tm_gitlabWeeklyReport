/**
 * 自定义JSX渲染函数
 * 将JSX转换为实际的DOM元素
 */

// Fragment组件用于包装多个子元素
export function Fragment(props) {
    const fragment = document.createDocumentFragment();
    if (props.children) {
        const children = Array.isArray(props.children) ? props.children : [props.children];
        children.forEach(child => {
            if (child) {
                fragment.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
            }
        });
    }
    return fragment;
}

// 主要的createElement函数
export function createElement(type, props, ...children) {
    // 处理Fragment
    if (type === Fragment) {
        return Fragment({ children });
    }
  
    // 处理函数组件
    if (typeof type === 'function') {
        return type({ ...props, children });
    }
  
    // 处理HTML元素
    const element = document.createElement(type);
  
    // 设置属性
    if (props) {
        Object.keys(props).forEach(key => {
            if (key === 'children') return;
      
            if (key === 'className') {
                element.className = props[key];
            } else if (key === 'style' && typeof props[key] === 'object') {
                Object.assign(element.style, props[key]);
            } else if (key.startsWith('on') && typeof props[key] === 'function') {
                // 事件处理器
                const eventName = key.slice(2).toLowerCase();
                element.addEventListener(eventName, props[key]);
            } else if (key === 'dangerouslySetInnerHTML') {
                element.innerHTML = props[key].__html;
            } else {
                element.setAttribute(key, props[key]);
            }
        });
    }
  
    // 添加子元素
    children.forEach(child => {
        if (child !== null && child !== false) {
            if (typeof child === 'string' || typeof child === 'number') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            } else if (Array.isArray(child)) {
                child.forEach(nestedChild => {
                    if (nestedChild instanceof Node) {
                        element.appendChild(nestedChild);
                    } else if (typeof nestedChild === 'string' || typeof nestedChild === 'number') {
                        element.appendChild(document.createTextNode(nestedChild));
                    }
                });
            }
        }
    });
  
    return element;
}

// 渲染函数，将元素挂载到DOM
export function render(element, container) {
    if (container) {
        container.innerHTML = '';
        if (element instanceof Node) {
            container.appendChild(element);
        }
    }
}

// JSX运行时函数，兼容新的JSX转换
export function jsx(type, props) {
    const { children, ...otherProps } = props || {};
    return createElement(type, otherProps, children);
}

// JSX运行时函数，用于处理多个子元素
export function jsxs(type, props) {
    return jsx(type, props);
}