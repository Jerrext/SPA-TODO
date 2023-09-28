import { ModalWindowType } from 'src/utils/@globalTypes';
import { PageActionTypes } from '../types/pageTypes';

export const setModalWindowType = (payload: ModalWindowType | null) => ({
  type: PageActionTypes.SET_MODAL_WINDOW_TYPE,
  payload,
});

export const setIsLoader = (payload: boolean) => ({
  type: PageActionTypes.SET_IS_LOADER,
  payload,
});
