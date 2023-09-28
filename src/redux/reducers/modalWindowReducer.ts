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
  { type, payload }: ModalWindowAction,
): ModalWindowState => {
  switch (type) {
    case ModalWindowActionTypes.SET_MODAL_WINDOW_TYPE:
      return { modalWindowType: payload };
    default:
      return state;
  }
};
