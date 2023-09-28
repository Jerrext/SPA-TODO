import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageContainer from './PageContainer';
import Projects from './Projects';
import NotFound from './NotFound';

export enum RoutesList {
  Home = '/',
  Tasks = '/:id/tasks',
  Default = '*',
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PageContainer />}>
          <Route index element={<Projects />} />
          <Route path={RoutesList.Tasks} element={<div></div>} />
          <Route path={RoutesList.Default} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
