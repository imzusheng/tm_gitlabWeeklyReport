import React, { useEffect } from 'react'
import './index.less'

interface ModalProps {
  visible: boolean
  title?: string
  width?: number
  children: React.ReactNode
  footer?: React.ReactNode
  onClose: () => void
  maskClosable?: boolean
}

const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  width = 520,
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

  if (!visible) {
    return null
  }

  const handleMaskClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && maskClosable) {
      onClose()
    }
  }

  return (
    <div className="modal-mask" onClick={handleMaskClick}>
      <div className="modal-wrapper">
        <div className="modal" style={{ width }}>
          {/* 模态框头部 */}
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <button className="modal-close" onClick={onClose}>
              <span>×</span>
            </button>
          </div>

          {/* 模态框内容 */}
          <div className="modal-body">{children}</div>

          {/* 模态框底部 */}
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  )
}

export default Modal
