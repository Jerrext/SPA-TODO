import {
  BoardAction,
  BoardActionTypes,
  BoardState,
  TaskStatusTypes,
} from '../types/boardTypes';

const initialState: BoardState = {
  taskStagesList: [
    { id: 0, title: 'Queue', statusType: TaskStatusTypes.Queue, items: [] },
    { id: 1, title: 'Development', statusType: TaskStatusTypes.Development, items: [] },
    { id: 2, title: 'Done', statusType: TaskStatusTypes.Done, items: [] },
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
      console.log();
      return { ...state, taskStagesList: formattedList };
    default:
      return state;
  }
};
