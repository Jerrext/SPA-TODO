import { OptionsListType } from 'src/utils/@globalTypes';
import { PayloadWithId } from './@types';

export enum BoardActionTypes {
  GET_TASKS_LIST = 'GET_TASKS_LIST',
  SET_TASK_STAGES_LIST = 'SET_TASK_STAGES_LIST',
  CREATE_TASK = 'CREATE_TASK',
  SET_TASK = 'SET_TASK',
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
  subTasksList: SubtasksList;
  comments: [];
};

export type TasksList = TaskType[];

export type SubtaskType = {
  id: number;
  parentTaskId: number;
  title: string;
  description: string;
  date_of_creation: string;
  end_date: string;
  priority: PriorityTypes;
  status: TaskStatusTypes;
  start_date: string;
  num: number;
  order: number;
};

export type SubtasksList = TaskType[];

type TaskStatus = {
  id: number;
  title: string;
  statusType: TaskStatusTypes;
  items: TasksList;
};

type Board = TaskStatus[];

export type CreateTaskData = {
  title: string;
  description: string;
  date_of_creation: string;
  end_date: string;
  priority: PriorityTypes;
  status: TaskStatusTypes;
  start_date: string;
  num: number;
  order: number;
};

export type CreateTaskPayload = PayloadWithId<CreateTaskData>;

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

export type CreateTaskAction = {
  type: BoardActionTypes.CREATE_TASK;
  payload: CreateTaskPayload;
};

export type SetTaskAction = {
  type: BoardActionTypes.SET_TASK;
  payload: TaskType;
};

//

export type BoardAction =
  | GetTasksListAction
  | SetTaskStagesListAction
  | CreateTaskAction
  | SetTaskAction;
