import {
  BoardActionTypes,
  CreateTaskAction,
  CreateTaskPayload,
  DeleteTaskAction,
  DeleteTaskPayload,
  GetTasksListAction,
  RemoveTaskFromListAction,
  SetCurrentTaskAction,
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

export const deleteTask = (payload: DeleteTaskPayload): DeleteTaskAction => ({
  type: BoardActionTypes.DELETE_TASK,
  payload,
});

export const removeTaskFromList = (payload: number): RemoveTaskFromListAction => ({
  type: BoardActionTypes.REMOVE_TASK_FROM_LIST,
  payload,
});

export const setCurrentTask = (payload: TaskType): SetCurrentTaskAction => ({
  type: BoardActionTypes.SET_CURRENT_TASK,
  payload,
});
