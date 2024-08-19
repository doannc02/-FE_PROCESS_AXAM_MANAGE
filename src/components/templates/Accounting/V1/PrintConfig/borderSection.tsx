import React, { ReactNode } from 'react'
import SvgIcon from '@mui/material/SvgIcon'
import styles from './borderedSection.module.css'

type Props = {
  icon?: any
  title: ReactNode
  children: any
}

function BorderedSection({ icon, title, children }: Props) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.headerBorderBefore}></div>
        {(icon || title) && (
          <div className={styles.headerTitle}>
            {icon && <SvgIcon component={icon} />}
            {title && <span className={styles.title}>{title}</span>}
          </div>
        )}
        <div className={styles.headerBorderAfter}></div>
      </div>
      <>{children}</>
    </div>
  )
}

export default BorderedSection
