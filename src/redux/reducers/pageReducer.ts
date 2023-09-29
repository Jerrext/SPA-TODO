import { PageAction, PageActionTypes, PageState } from '../types/pageTypes';

const initialState: PageState = {
  modalWindowType: null,
  isPageLoader: false,
  isWindowLoader: false,
  currentPage: null,
};

export const pageReducer = (
  state = initialState,
  { type, payload }: PageAction,
): PageState => {
  switch (type) {
    case PageActionTypes.SET_MODAL_WINDOW_TYPE:
      return { ...state, modalWindowType: payload };
    case PageActionTypes.SET_IS_PAGE_LOADER:
      return { ...state, isPageLoader: payload };
    case PageActionTypes.SET_IS_WINDOW_LOADER:
      return { ...state, isWindowLoader: payload };
    case PageActionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: payload };
    default:
      return state;
  }
};
