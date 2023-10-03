import {
  AddProjectsInListAction,
  CreateSingleProjectAction,
  DeleteSingleProjectAction,
  DeleteSingleProjectPayload,
  GetSingleProjectAction,
  Project,
  ProjectData,
  ProjectList,
  ProjectsActionTypes,
  RemoveProjectsFromListAction,
  SetCurrentProjectAction,
  SetProjectsListAction,
  UpdateProjectPayload,
  UpdateProjectsListAction,
  UpdateSingleProjectAction,
} from '../types/projectsTypes';

export const getProjectsList = () => ({
  type: ProjectsActionTypes.GET_PROJECTS_LIST,
});

export const setProjectsList = (payload: ProjectList): SetProjectsListAction => ({
  type: ProjectsActionTypes.SET_PROJECTS_LIST,
  payload,
});

export const addProjectInList = (payload: Project): AddProjectsInListAction => ({
  type: ProjectsActionTypes.ADD_PROJECT_IN_LIST,
  payload,
});

export const removeProjectFromList = (payload: number): RemoveProjectsFromListAction => ({
  type: ProjectsActionTypes.REMOVE_PROJECT_FROM_LIST,
  payload,
});

export const updateProjectsList = (payload: Project): UpdateProjectsListAction => ({
  type: ProjectsActionTypes.UPDATE_PROJECTS_LIST,
  payload,
});

export const getSingleProject = (payload: number): GetSingleProjectAction => ({
  type: ProjectsActionTypes.GET_SINGLE_PROJECT,
  payload,
});

export const setCurrentProject = (payload: Project | null): SetCurrentProjectAction => ({
  type: ProjectsActionTypes.SET_CURRENT_PROJECT,
  payload,
});

export const createSingleProject = (payload: ProjectData): CreateSingleProjectAction => ({
  type: ProjectsActionTypes.CREATE_SINGLE_PROJECT,
  payload,
});

export const updateSingleProject = (
  payload: UpdateProjectPayload,
): UpdateSingleProjectAction => ({
  type: ProjectsActionTypes.UPDATE_SINGLE_PROJECT,
  payload,
});

export const deleteSingleProject = (
  payload: DeleteSingleProjectPayload,
): DeleteSingleProjectAction => ({
  type: ProjectsActionTypes.DELETE_SINGLE_PROJECT,
  payload,
});
