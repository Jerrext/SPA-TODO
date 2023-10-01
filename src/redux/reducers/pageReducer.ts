import { LoadingTypes, PageAction, PageActionTypes, PageState } from '../types/pageTypes';

const initialState: PageState = {
  modalWindowType: null,
  loaders: {
    [LoadingTypes.ProjectsList]: false,
    [LoadingTypes.TasksList]: false,
    [LoadingTypes.SingleProject]: false,
  },
};

export const pageReducer = (
  state = initialState,
  { type, payload }: PageAction,
): PageState => {
  switch (type) {
    case PageActionTypes.SET_MODAL_WINDOW_TYPE:
      return { ...state, modalWindowType: payload };
    case PageActionTypes.TOGGLE_IS_LOADING:
      return {
        ...state,
        loaders: { ...state.loaders, [payload]: !state.loaders[payload] },
      };
    default:
      return state;
  }
};
