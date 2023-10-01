import { combineReducers } from 'redux';
import { pageReducer } from './pageReducer';
import { ProjectsReducer } from './projectsReducer';
import { boardReducer } from './boardReducer';

export const rootReducer = combineReducers({
  page: pageReducer,
  projects: ProjectsReducer,
  board: boardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
