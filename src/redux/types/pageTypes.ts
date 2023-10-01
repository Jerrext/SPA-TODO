import { ModalWindowType } from 'src/utils/@globalTypes';

export enum PageActionTypes {
  SET_MODAL_WINDOW_TYPE = 'SET_MODAL_WINDOW_TYPE',
  TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING',
}

export enum LoadingTypes {
  ProjectsList = 'projectsList',
  TasksList = 'tasksList',
  SingleProject = 'singleProject',
}

//

export type LoadingPayload = {
  loaderType: LoadingTypes;
  status: boolean;
};

//

export type PageState = {
  modalWindowType: ModalWindowType | null;
  loaders: {
    [LoadingTypes.ProjectsList]: boolean;
    [LoadingTypes.TasksList]: boolean;
    [LoadingTypes.SingleProject]: boolean;
  };
};

export type ModalWindowAction = {
  type: PageActionTypes.SET_MODAL_WINDOW_TYPE;
  payload: ModalWindowType | null;
};

export type IsLoadingAction = {
  type: PageActionTypes.TOGGLE_IS_LOADING;
  payload: LoadingTypes;
};

export type PageAction = ModalWindowAction | IsLoadingAction;
