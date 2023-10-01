import {
  BoardActionTypes,
  GetTasksListAction,
  SetTaskStagesListAction,
  TasksList,
} from '../types/boardTypes';

export const getTasksList = (payload: number): GetTasksListAction => ({
  type: BoardActionTypes.GET_TASKS_LIST,
  payload,
});

export const setTaskStagesList = (payload: TasksList): SetTaskStagesListAction => ({
  type: BoardActionTypes.SET_TASK_STAGES_LIST,
  payload,
});
