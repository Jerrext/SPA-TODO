import { createSelector } from 'reselect';
import { RootState } from '../reducers';
import { LoadingTypes } from '../types/pageTypes';

export const getState = (state: RootState) => state;

export const PageSelectors = {
  getModalWindowType: (state: RootState) => state.page.modalWindowType,
  getIsTasksPageLoading: (state: RootState) => {
    const loaders = state.page.loaders;
    // console.log(loaders);
    return (
      loaders[LoadingTypes.SingleProject] === true ||
      loaders[LoadingTypes.TasksList] === true
    );
  },
  getIsProjectsPageLoading: (state: RootState) =>
    state.page.loaders[LoadingTypes.ProjectsList],
};

export const ProjectsSelectors = {
  getCurrentProject: (state: RootState) => state.projects.currentProject,
  getProjectsList: (state: RootState) => state.projects.projectsList,
};

export const TasksSelectors = {
  getTasksStagesList: (state: RootState) => state.board.taskStagesList,
  getPriorities: createSelector(
    [(state: RootState) => state.board.priorities],
    (priorities) => {
      return Object.fromEntries(priorities.map((item) => [item.value, item.label]));
    },
  ),
  // getPriorities: (state: RootState) => {
  //   const a = Object.fromEntries(
  //     state.board.priorities.map((item) => [item.value, item.label]),
  //   );
  //   // console.log(a);
  //   return a;
  // },
};
