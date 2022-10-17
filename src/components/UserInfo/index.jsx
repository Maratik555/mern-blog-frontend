import React from 'react'
import styles from './UserInfo.module.scss'

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || 'https://mui.com/static/images/avatar/5.jpg'} alt="ava" />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  )
}
