import {
  BoardActionTypes,
  CreateTaskAction,
  CreateTaskPayload,
  GetTasksListAction,
  SetTaskAction,
  SetTaskStagesListAction,
  SubtaskType,
  TaskType,
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

export const createTask = (payload: CreateTaskPayload): CreateTaskAction => ({
  type: BoardActionTypes.CREATE_TASK,
  payload,
});

export const setTask = (payload: TaskType): SetTaskAction => ({
  type: BoardActionTypes.SET_TASK,
  payload,
});
