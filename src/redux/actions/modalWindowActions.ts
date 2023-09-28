import { ModalWindowType } from 'src/utils/@globalTypes';
import { ModalWindowActionTypes } from '../types/modalWindowTypes';

export const setModalWindowType = (payload: ModalWindowType | null) => ({
  type: ModalWindowActionTypes.SET_MODAL_WINDOW_TYPE,
  payload,
});
