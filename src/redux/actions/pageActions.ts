import { ModalWindowType } from 'src/utils/@globalTypes';
import { PageActionTypes } from '../types/pageTypes';

export const setModalWindowType = (payload: ModalWindowType | null) => ({
  type: PageActionTypes.SET_MODAL_WINDOW_TYPE,
  payload,
});

export const setIsPageLoader = (payload: boolean) => ({
  type: PageActionTypes.SET_IS_PAGE_LOADER,
  payload,
});

export const setIsWindowLoader = (payload: boolean) => ({
  type: PageActionTypes.SET_IS_WINDOW_LOADER,
  payload,
});
