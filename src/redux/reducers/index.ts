import { combineReducers } from 'redux';
import { pageReducer } from './pageReducer';
import { ProjectsReducer } from './projectsReducer';

export const rootReducer = combineReducers({
  page: pageReducer,
  projects: ProjectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
