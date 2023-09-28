import { combineReducers } from 'redux';
import { modalWindowReducer } from './modalWindowReducer';

export const rootReducer = combineReducers({
  modalWindow: modalWindowReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
