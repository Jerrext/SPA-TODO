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
    { value: PriorityTypes.Highest, label: 'Очень высокий' },
    { value: PriorityTypes.High, label: 'Высокий' },
    { value: PriorityTypes.Medium, label: 'Средний' },
    { value: PriorityTypes.Low, label: 'Низкий' },
    { value: PriorityTypes.Lowest, label: 'Очень низкий' },
  ],
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
    default:
      return state;
  }
};
