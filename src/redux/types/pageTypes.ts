import { ModalWindowType } from 'src/utils/@globalTypes';

export enum PageActionTypes {
  SET_MODAL_WINDOW_TYPE = 'SET_MODAL_WINDOW_TYPE',
  SET_IS_PAGE_LOADER = 'SET_IS_PAGE_LOADER',
  SET_IS_WINDOW_LOADER = 'SET_IS_WINDOW_LOADER',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
}

export enum PageTypes {
  Projects = 'Projects',
  Tasks = 'Tasks',
  NotFound = 'NotFound',
}

export type PageState = {
  modalWindowType: ModalWindowType | null;
  isPageLoader: boolean;
  isWindowLoader: boolean;
  currentPage: PageTypes | null;
};

type CurrentPageAction = {
  type: PageActionTypes.SET_CURRENT_PAGE;
  payload: PageTypes;
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
  | IsWindowLoaderAction
  | CurrentPageAction;
