import {
  Project,
  ProjectList,
  ProjectsActionTypes,
  UpdateProject,
} from '../types/projectsTypes';

export const getProjects = () => ({
  type: ProjectsActionTypes.GET_PROJECTS,
});

export const setProjects = (payload: ProjectList) => ({
  type: ProjectsActionTypes.SET_PROJECTS,
  payload,
});

export const getSingleProject = (payload: number) => ({
  type: ProjectsActionTypes.GET_SINGLE_PROJECT,
  payload,
});

export const setSingleProject = (payload: Project) => ({
  type: ProjectsActionTypes.SET_SINGLE_PROJECT,
  payload,
});

export const updateSingleProject = (payload: UpdateProject) => ({
  type: ProjectsActionTypes.UPDATE_SINGLE_PROJECT,
  payload,
});

export const deleteSingleProject = (payload: Project) => ({
  type: ProjectsActionTypes.SET_SINGLE_PROJECT,
  payload,
});
