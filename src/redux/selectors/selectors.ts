import { createSelector } from 'reselect';
import { RootState } from '../reducers';
import { LoadingTypes } from '../types/pageTypes';

export const getState = (state: RootState) => state;

const getModalWindowType = (state: RootState) => state.page.modalWindowType;
const getIsTasksPageLoading = (state: RootState) => {
  const loaders = state.page.loaders;
  return (
    loaders[LoadingTypes.SingleProject] === true ||
    loaders[LoadingTypes.TasksList] === true
  );
};
const getIsProjectsPageLoading = (state: RootState) =>
  state.page.loaders[LoadingTypes.ProjectsList];

//

const getCurrentProject = (state: RootState) => state.projects.currentProject;
const getProjectsList = (state: RootState) => state.projects.projectsList;

//

const getTasksStagesList = (state: RootState) => state.board.taskStagesList;
const getPriorityOptions = (state: RootState) => state.board.priorities;
const getPriorities = createSelector([getPriorityOptions], (priorities) => {
  return Object.fromEntries(priorities.map((item) => [item.value, item.label]));
});
const getTaskStatusOptions = createSelector(
  [(state: RootState) => state.board.taskStagesList],
  (statuses) => {
    return statuses.map((item) => {
      return { value: item.statusType.toString(), label: item.title };
    });
  },
);

//

export const PageSelectors = {
  getModalWindowType,
  getIsTasksPageLoading,
  getIsProjectsPageLoading,
};

export const ProjectsSelectors = {
  getCurrentProject,
  getProjectsList,
};

export const TasksSelectors = {
  getTasksStagesList,
  getPriorityOptions,
  getPriorities,
  getTaskStatusOptions,
};
