import React from 'react'
import styles from './Projects.module.scss'
import PageHeader from '../PageContainer/PageHeader'
import Project from 'src/components/Project/Project'

const Projects = () => {
  const onNewProjectBtnClick = () => {}

  return (
    <PageHeader
      title="Проекты"
      btnTitle="Новый проект"
      onClick={onNewProjectBtnClick}>
      <div className={styles.header}>
        <p className={styles.title}>Имя</p>
        <p className={styles.description}>Краткое описание</p>
        <p className={styles.supervisor}>Руководитель</p>
      </div>
      <div className={styles.body}>
        <Project
          title="Vitaem"
          description="Разработка ПО, управляемая командой"
          supervisor="Колпаков Даниил"
        />
        <Project
          title="Vitaem"
          description="Разработка ПО, управляемая командой"
          supervisor="Колпаков Даниил"
        />
        <Project
          title="Vitaem"
          description="Разработка ПО, управляемая командой"
          supervisor="Колпаков Даниил"
        />
        <Project
          title="Vitaem"
          description="Разработка ПО, управляемая командой"
          supervisor="Колпаков Даниил"
        />
      </div>
    </PageHeader>
  )
}

export default Projects
