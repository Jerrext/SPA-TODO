import { ModalWindowType } from 'src/utils/@globalTypes';

export enum PageActionTypes {
  SET_MODAL_WINDOW_TYPE = 'SET_MODAL_WINDOW_TYPE',
  SET_IS_LOADER = 'SET_IS_LOADER',
}

export type PageState = {
  modalWindowType: ModalWindowType | null;
  isLoader: boolean;
};

type ModalWindowAction = {
  type: PageActionTypes.SET_MODAL_WINDOW_TYPE;
  payload: ModalWindowType | null;
};

type IsLoaderAction = {
  type: PageActionTypes.SET_IS_LOADER;
  payload: boolean;
};

export type PageAction = ModalWindowAction | IsLoaderAction;
