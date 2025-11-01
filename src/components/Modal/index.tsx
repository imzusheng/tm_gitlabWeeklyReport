import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './index.module.less'

interface ModalProps {
  visible: boolean
  title?: string
  width?: number
  maxHeight?: number
  children: React.ReactNode
  footer?: React.ReactNode
  onClose: () => void
  maskClosable?: boolean
}

const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  width = 520,
  maxHeight = window.innerHeight - 180, // 面板高度(100vh-120px)再减去60px上下边距
  children,
  footer,
  onClose,
  maskClosable = true,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && visible) {
        onClose()
      }
    }

    if (visible) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [visible, onClose])

  // 清理模态框容器
  useEffect(() => {
    return () => {
      // 组件卸载时，如果容器为空则移除
      const container = document.getElementById(
        'gitlab-weekly-report-modal-root',
      )
      if (container && container.children.length === 0) {
        document.body.removeChild(container)
      }
    }
  }, [])

  if (!visible) {
    return null
  }

  const handleMaskClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && maskClosable) {
      onClose()
    }
  }

  // 获取或创建模态框容器
  const getModalContainer = () => {
    let container = document.getElementById('gitlab-weekly-report-modal-root')
    if (!container) {
      container = document.createElement('div')
      container.id = 'gitlab-weekly-report-modal-root'
      document.body.appendChild(container)
    }
    return container
  }

  const modalContent = (
    <div
      id="gitlab-weekly-report-container"
      className={styles.modalMask}
      onClick={handleMaskClick}
    >
      <div className={styles.modal} style={{ width, maxHeight }}>
        {/* 模态框头部 */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>{title}</div>
          <button className={styles.modalClose} onClick={onClose}>
            <span>×</span>
          </button>
        </div>

        {/* 模态框内容 */}
        <div className={styles.modalBody}>{children}</div>

        {/* 模态框底部 */}
        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </div>
  )

  return createPortal(modalContent, getModalContainer())
}

export default Modal
