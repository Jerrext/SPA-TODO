import { PageAction, PageActionTypes, PageState } from '../types/pageTypes';

const initialState: PageState = {
  modalWindowType: null,
  isLoader: false,
};

export const pageReducer = (
  state = initialState,
  { type, payload }: PageAction,
): PageState => {
  switch (type) {
    case PageActionTypes.SET_MODAL_WINDOW_TYPE:
      return { ...state, modalWindowType: payload };
    case PageActionTypes.SET_IS_LOADER:
      return { ...state, isLoader: payload };
    default:
      return state;
  }
};
