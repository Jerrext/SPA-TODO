import {
  ModalWindowAction,
  ModalWindowActionTypes,
  ModalWindowState,
} from '../types/modalWindowTypes';

const initialState: ModalWindowState = {
  modalWindowType: null,
};

export const modalWindowReducer = (
  state = initialState,
  action: ModalWindowAction,
): ModalWindowState => {
  switch (action.type) {
    case ModalWindowActionTypes.SET_MODAL_WINDOW_TYPE:
      return { modalWindowType: action.payload };
    default:
      return state;
  }
};
