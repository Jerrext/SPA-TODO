import { OptionsListType } from 'src/utils/@globalTypes';

export enum BoardActionTypes {
  GET_TASKS_LIST = 'GET_TASKS_LIST',
  SET_TASK_STAGES_LIST = 'SET_TASK_STAGES_LIST',
}

//

export enum TaskStatusTypes {
  Queue,
  Development,
  Done,
}

export enum PriorityTypes {
  Highest,
  High,
  Medium,
  Low,
  Lowest,
}

//

export type Priority = {
  [k: number]: string;
};

export type TaskType = {
  title: string;
  description: string;
  date_of_creation: string;
  end_date: string;
  priority: PriorityTypes;
  status: TaskStatusTypes;
  start_date: string;
  id: number;
  projectId: number;
  num: number;
  order: number;
  subTasksList: [];
  comments: [];
};

export type TasksList = TaskType[];

type TaskStatus = {
  id: number;
  title: string;
  statusType: TaskStatusTypes;
  items: TasksList;
};

type Board = TaskStatus[];

//

export type BoardState = {
  taskStagesList: Board;
  priorities: OptionsListType;
};

//

export type GetTasksListAction = {
  type: BoardActionTypes.GET_TASKS_LIST;
  payload: number;
};

export type SetTaskStagesListAction = {
  type: BoardActionTypes.SET_TASK_STAGES_LIST;
  payload: TasksList;
};

//

export type BoardAction = GetTasksListAction | SetTaskStagesListAction;
