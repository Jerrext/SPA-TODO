import { combineReducers } from 'redux';
import { modalWindowReducer } from './modalWindowReducer';
import { ProjectsReducer } from './projectsReducer';

export const rootReducer = combineReducers({
  modalWindow: modalWindowReducer,
  projects: ProjectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
