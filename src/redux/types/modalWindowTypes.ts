import { ModalWindowType } from 'src/utils/@globalTypes';

export enum ModalWindowActionTypes {
  SET_MODAL_WINDOW_TYPE = 'SET_MODAL_WINDOW_TYPE',
}

export type ModalWindowState = {
  modalWindowType: ModalWindowType | null;
};

export type ModalWindowAction = {
  type: ModalWindowActionTypes;
  payload: ModalWindowType | null;
};
