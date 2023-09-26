import React, { FC } from 'react'
import styles from './Project.module.scss'
import { ArrowIcon } from 'src/assets/icons'

type ProjectProps = {
  title: string
  description: string
  supervisor: string
}

const Project: FC<ProjectProps> = ({ title, description, supervisor }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      <p className={styles.supervisor}>{supervisor}</p>
      <div className={styles.arrow}>
        <ArrowIcon />
      </div>
    </div>
  )
}

export default Project
