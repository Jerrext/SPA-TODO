import {
  DeleteSingleProjectPayload,
  Project,
  ProjectList,
  ProjectPayload,
  ProjectsActionTypes,
  UpdateProjectPayload,
} from '../types/projectsTypes';

export const getProjects = () => ({
  //
  type: ProjectsActionTypes.GET_PROJECTS,
});

export const setProjects = (payload: ProjectList) => ({
  //
  type: ProjectsActionTypes.SET_PROJECTS,
  payload,
});

export const getSingleProject = (payload: number) => ({
  type: ProjectsActionTypes.GET_SINGLE_PROJECT,
  payload,
});

export const setCurrentProject = (payload: Project) => ({
  type: ProjectsActionTypes.SET_CURRENT_PROJECT,
  payload,
});

export const createSingleProject = (payload: ProjectPayload) => ({
  //
  type: ProjectsActionTypes.CREATE_SINGLE_PROJECT,
  payload,
});

export const updateSingleProject = (payload: UpdateProjectPayload) => ({
  type: ProjectsActionTypes.UPDATE_SINGLE_PROJECT,
  payload,
});

export const deleteSingleProject = (payload: DeleteSingleProjectPayload) => ({
  type: ProjectsActionTypes.DELETE_SINGLE_PROJECT,
  payload,
});
