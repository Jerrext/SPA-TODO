import { PageAction, PageActionTypes, PageState } from '../types/pageTypes';

const initialState: PageState = {
  modalWindowType: null,
  isProjectsLoader: false,
  isWindowLoader: false,
};

export const pageReducer = (
  state = initialState,
  { type, payload }: PageAction,
): PageState => {
  switch (type) {
    case PageActionTypes.SET_MODAL_WINDOW_TYPE:
      return { ...state, modalWindowType: payload };
    case PageActionTypes.SET_IS_PROJECTS_LOADER:
      return { ...state, isProjectsLoader: payload };
    case PageActionTypes.SET_IS_WINDOW_LOADER:
      return { ...state, isWindowLoader: payload };
    default:
      return state;
  }
};
