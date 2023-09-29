import { ModalWindowType } from 'src/utils/@globalTypes';

export enum PageActionTypes {
  SET_MODAL_WINDOW_TYPE = 'SET_MODAL_WINDOW_TYPE',
  SET_IS_PAGE_LOADER = 'SET_IS_PAGE_LOADER',
  SET_IS_WINDOW_LOADER = 'SET_IS_WINDOW_LOADER',
}

export type PageState = {
  modalWindowType: ModalWindowType | null;
  isPageLoader: boolean;
  isWindowLoader: boolean;
};

type ModalWindowAction = {
  type: PageActionTypes.SET_MODAL_WINDOW_TYPE;
  payload: ModalWindowType | null;
};

type IsProjectsLoaderAction = {
  type: PageActionTypes.SET_IS_PAGE_LOADER;
  payload: boolean;
};

type IsWindowLoaderAction = {
  type: PageActionTypes.SET_IS_WINDOW_LOADER;
  payload: boolean;
};

export type PageAction =
  | ModalWindowAction
  | IsProjectsLoaderAction
  | IsWindowLoaderAction;
