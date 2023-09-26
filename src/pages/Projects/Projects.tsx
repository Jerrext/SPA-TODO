import React from 'react'
import styles from './Projects.module.scss'
import PageHeader from '../PageContainer/PageHeader'

const Projects = () => {
  const onNewProjectBtnClick = () => {}

  return (
    <PageHeader
      title="Проекты"
      btnTitle="Новый проект"
      onClick={onNewProjectBtnClick}>
      <div></div>
    </PageHeader>
  )
}

export default Projects
