import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export enum RoutesList {
  Home = '/',
  Tasks = '/tasks',
  Default = '*',
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<div></div>}>
          <Route index element={<div></div>} />
          <Route path={RoutesList.Tasks} element={<div></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
