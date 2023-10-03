import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageContainer from './PageContainer';
import Projects from './Projects';
import NotFound from './NotFound';
import Tasks from './Tasks';

export enum RoutesList {
  Home = '/',
  Tasks = '/:projectId/tasks',
  Default = '*',
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.Home} element={<PageContainer />}>
          <Route index element={<Projects />} />
          <Route path={RoutesList.Tasks} element={<Tasks />} />
          <Route path={RoutesList.Default} element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
