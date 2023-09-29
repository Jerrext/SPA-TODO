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
    case ProjectsActionTypes.SET_PROJECTS_LIST:
      return { ...state, projectsList: payload };
    case ProjectsActionTypes.ADD_PROJECT_IN_LIST:
      return { ...state, projectsList: [...state.projectsList, payload] };
    case ProjectsActionTypes.REMOVE_PROJECT_FROM_LIST:
      return {
        ...state,
        projectsList: state.projectsList.filter((item) => item.id !== payload),
      };
    case ProjectsActionTypes.UPDATE_PROJECTS_LIST:
      return {
        ...state,
        projectsList: state.projectsList.map((item) =>
          item.id === payload.id ? payload : item,
        ),
      };
    case ProjectsActionTypes.SET_CURRENT_PROJECT:
      return { ...state, currentProject: payload };
    default:
      return state;
  }
};
