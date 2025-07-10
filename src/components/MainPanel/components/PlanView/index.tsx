import React from 'react'
import styles from './index.module.less'

/**
 * Plan 模式视图组件
 * 负责计划和任务管理相关功能展示
 */
const PlanView: React.FC = () => {
  return (
    <div className={styles.planView}>
      <div className={styles.planContent}>
        <div className={styles.planHeader}>
          <h3>📊 计划管理</h3>
          <p>功能开发中，敬请期待...</p>
        </div>

        <div className={styles.planPlaceholder}>
          <div className={styles.planCard}>
            <div className={styles.cardIcon}>🎯</div>
            <div className={styles.cardContent}>
              <h4>项目规划</h4>
              <p>制定和跟踪项目里程碑</p>
            </div>
          </div>

          <div className={styles.planCard}>
            <div className={styles.cardIcon}>📈</div>
            <div className={styles.cardContent}>
              <h4>进度统计</h4>
              <p>可视化项目进展情况</p>
            </div>
          </div>

          <div className={styles.planCard}>
            <div className={styles.cardIcon}>⏰</div>
            <div className={styles.cardContent}>
              <h4>时间管理</h4>
              <p>优化开发时间分配</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PlanView)
