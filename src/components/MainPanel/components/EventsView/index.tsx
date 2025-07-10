import React from 'react'
import FilterSection from '../FilterSection'
import EventsList from '../EventsList'
import styles from './index.module.less'

/**
 * Events 模式视图组件
 * 负责 Events 模式下的筛选和事件列表展示
 */
const EventsView: React.FC = () => {
  return (
    <div className={styles.eventsView}>
      {/* 筛选条件部分 */}
      <div className={styles.filterSection}>
        <FilterSection />
      </div>

      {/* 事件列表部分 */}
      <div className={styles.eventsSection}>
        <EventsList />
      </div>
    </div>
  )
}

export default React.memo(EventsView)
