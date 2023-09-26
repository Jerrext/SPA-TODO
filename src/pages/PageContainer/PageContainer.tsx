import React from 'react'
import styles from './PageContainer.module.scss'
import { Outlet } from 'react-router-dom'
import ModalWindow from 'src/components/ModalWindow/ModalWindow'
import { ModalWindowType } from 'src/utils/@globalTypes'
import CreateProjectWindow from 'src/components/ModalWindow/CreateProjectWindow/CreateProjectWindow'

const PageContainer = () => {
  // const getCurrentWindow = () => {
  //   switch (modalWindow) {
  //     case ModalWindowType.CreateProject:
  //       return <AddListWindow />

  //     default:
  //       return
  //   }
  // }
  return (
    <div className={styles.container}>
      <Outlet />
      {/* {getCurrentWindow()} */}
      <CreateProjectWindow />
    </div>
  )
}

export default PageContainer
