import { ModalWindowType } from 'src/utils/@globalTypes';
import {
  ModalWindowAction,
  ModalWindowActionTypes,
} from '../types/modalWindowTypes';

export const setModalWindowType = (
  payload: ModalWindowType | null,
): ModalWindowAction => ({
  type: ModalWindowActionTypes.SET_MODAL_WINDOW_TYPE,
  payload,
});
