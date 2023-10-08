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
    return statuses.map((item) => ({
      value: item.statusType,
      label: item.title,
    }));
  },
);

const getTaskNum = createSelector([getTasksStagesList], (stages) => {
  const tasksNumbers: number[] = [];
  stages.forEach((stage) => {
    stage.items.forEach((task) => tasksNumbers.push(task.num));
  });
  return tasksNumbers.length > 0 ? Math.max(...tasksNumbers) + 1 : 1;
});

const getCurrentTask = (state: RootState) => state.board.currentTask;

// const getSubtaskNum = createSelector([getCurrentTask], (task) => {
//   const subtasksNumbers: number[] = [];
//   task?.sub_tasks_list.forEach((subtask) => {
//     subtasksNumbers.push(subtask.num);
//   });
//   return subtasksNumbers.length > 0 ? Math.max(...subtasksNumbers) + 1 : 1;
// });

const getStatuses = createSelector([getTaskStatusOptions], (stages) => {
  return Object.fromEntries(stages.map((stage) => [stage.value, stage.label]));
});

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
  getTaskNum,
  getCurrentTask,
  getStatuses,
};
