import {
  BoardAction,
  BoardActionTypes,
  BoardState,
  PriorityTypes,
  TaskStatusTypes,
} from '../types/boardTypes';

const initialState: BoardState = {
  taskStagesList: [
    { id: 0, title: 'Queue', statusType: TaskStatusTypes.Queue, items: [] },
    { id: 1, title: 'Development', statusType: TaskStatusTypes.Development, items: [] },
    { id: 2, title: 'Done', statusType: TaskStatusTypes.Done, items: [] },
  ],
  // priorities: {
  //   [PriorityTypes.Highest]: 'Очень высокий',
  //   [PriorityTypes.High]: 'Высокий',
  //   [PriorityTypes.Medium]: 'Средний',
  //   [PriorityTypes.Low]: 'Низкий',
  //   [PriorityTypes.Lowest]: 'Очень низкий',
  // },
  priorities: [
    { value: `${PriorityTypes.Highest}`, label: 'Очень высокий', color: '#ff4800' },
    { value: `${PriorityTypes.High}`, label: 'Высокий', color: '#ff7b00' },
    { value: `${PriorityTypes.Medium}`, label: 'Средний', color: '#ffee00' },
    { value: `${PriorityTypes.Low}`, label: 'Низкий', color: '#c8ff00fd' },
    { value: `${PriorityTypes.Lowest}`, label: 'Очень низкий', color: '#7bff00' },
  ],
  currentTask: null,
};

export const boardReducer = (
  state = initialState,
  { type, payload }: BoardAction,
): BoardState => {
  switch (type) {
    case BoardActionTypes.SET_TASK_STAGES_LIST:
      const formattedList = state.taskStagesList.map((stage) => {
        return {
          ...stage,
          items: payload.filter((task) => task.status === stage.statusType),
        };
      });
      return { ...state, taskStagesList: formattedList };
    case BoardActionTypes.SET_TASK:
      return {
        ...state,
        taskStagesList: state.taskStagesList.map((stage) =>
          stage.statusType === TaskStatusTypes.Queue
            ? { ...stage, items: [...stage.items, payload] }
            : stage,
        ),
      };
    case BoardActionTypes.REMOVE_TASK_FROM_LIST:
      return {
        ...state,
        taskStagesList: state.taskStagesList.map((stage) => {
          return { ...stage, items: stage.items.filter((task) => task.id !== payload) };
        }),
      };
    case BoardActionTypes.SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: payload,
      };
    default:
      return state;
  }
};
