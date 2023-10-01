import { ModalWindowType } from 'src/utils/@globalTypes';
import {
  IsLoadingAction,
  LoadingTypes,
  ModalWindowAction,
  PageActionTypes,
} from '../types/pageTypes';

export const setModalWindowType = (
  payload: ModalWindowType | null,
): ModalWindowAction => ({
  type: PageActionTypes.SET_MODAL_WINDOW_TYPE,
  payload,
});

export const toggleIsLoading = (payload: LoadingTypes): IsLoadingAction => ({
  type: PageActionTypes.TOGGLE_IS_LOADING,
  payload,
});

// export const setIsSingleProjectLoader = (payload: boolean): IsLoaderAction => ({
//   type: PageActionTypes.SET_IS_SINGLE_PROJECT_LOADER,
//   payload,
// });

// export const setIsTasksListLoader = (payload: boolean): IsLoaderAction => ({
//   type: PageActionTypes.SET_IS_TASKS_LIST_LOADER,
//   payload,
// });
