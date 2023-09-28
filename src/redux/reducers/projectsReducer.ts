import {
  ProjectsAction,
  ProjectsActionTypes,
  ProjectsState,
} from '../types/projectsTypes';

const initialState: ProjectsState = {
  projectsList: [],
  currentProject: null,
};

export const ProjectsReducer = (
  state = initialState,
  { type, payload }: ProjectsAction,
): ProjectsState => {
  switch (type) {
    case ProjectsActionTypes.SET_PROJECTS:
      return { ...state, projectsList: payload };
    case ProjectsActionTypes.SET_CURRENT_PROJECT:
      return { ...state, currentProject: payload };
    default:
      return state;
  }
};
