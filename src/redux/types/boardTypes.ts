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

//

type Task = {
  title: string;
  description: string;
  date_of_creation: string;
  end_date: string;
  priority: string;
  status: TaskStatusTypes;
  start_date: string;
  id: number;
  projectId: number;
  subTasksList: any;
  comments: any;
};

export type TasksList = Task[];

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
