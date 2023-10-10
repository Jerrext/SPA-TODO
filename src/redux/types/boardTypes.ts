import { OptionsListType } from 'src/utils/@globalTypes';
import { PayloadWithCallback, PayloadWithId } from './@types';

export enum BoardActionTypes {
  GET_TASKS_LIST = 'GET_TASKS_LIST',
  SET_TASK_STAGES_LIST = 'SET_TASK_STAGES_LIST',
  CREATE_TASK = 'CREATE_TASK',
  SET_TASK = 'SET_TASK',
  DELETE_TASK = 'DELETE_TASK',
  REMOVE_TASK_FROM_LIST = 'REMOVE_TASK_FROM_LIST',
  SET_CURRENT_TASK = 'SET_CURRENT_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  UPDATE_TASK_IN_LIST = 'UPDATE_TASK_IN_LIST',
  SET_CURRENT_SUBTASK = 'SET_CURRENT_SUBTASK',
}

//

export enum TaskStatusTypes {
  Queue = 'queue',
  Development = 'development',
  Done = 'done',
}

export enum PriorityTypes {
  Highest = 'highest',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
  Lowest = 'lowest',
}

//

export type СomputedProperty = {
  [k: string]: string;
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
  sub_tasks_list: SubtasksList;
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

export type SubtasksList = SubtaskType[];

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

export type UpdateTaskData = {
  title?: string;
  description?: string;
  end_date?: string;
  priority?: PriorityTypes;
  status?: TaskStatusTypes;
  start_date?: string;
  order?: number;
  sub_tasks_list?: SubtasksList;
  comments?: [];
};

type UpdateTaskPayload = {
  taskId: number;
  projectId: number;
  data: UpdateTaskData;
  currentSubtask?: SubtaskType;
};

export type CreateTaskPayload = PayloadWithId<CreateTaskData>;
export type DeleteTaskPayload = PayloadWithCallback<{
  projectId: number;
  taskId: number;
}>;

export type UpdateTaskPayloadWithCallback = PayloadWithCallback<UpdateTaskPayload>;

//

export type BoardState = {
  taskStagesList: Board;
  priorities: OptionsListType;
  currentTask: TaskType | null;
  currentSubtask: SubtaskType | null;
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

export type DeleteTaskAction = {
  type: BoardActionTypes.DELETE_TASK;
  payload: DeleteTaskPayload;
};

export type RemoveTaskFromListAction = {
  type: BoardActionTypes.REMOVE_TASK_FROM_LIST;
  payload: number;
};

export type SetCurrentTaskAction = {
  type: BoardActionTypes.SET_CURRENT_TASK;
  payload: TaskType;
};

export type UpdateTaskAction = {
  type: BoardActionTypes.UPDATE_TASK;
  payload: UpdateTaskPayloadWithCallback;
};

export type SetCurrentSubtaskAction = {
  type: BoardActionTypes.SET_CURRENT_SUBTASK;
  payload: SubtaskType | null;
};

//

export type BoardAction =
  | GetTasksListAction
  | SetTaskStagesListAction
  | CreateTaskAction
  | SetTaskAction
  | DeleteTaskAction
  | RemoveTaskFromListAction
  | SetCurrentTaskAction
  | UpdateTaskAction
  | SetCurrentSubtaskAction;
