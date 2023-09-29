import { PayloadWithCallback, PayloadWithId } from './@types';

export enum ProjectsActionTypes {
  SET_PROJECTS_LIST = 'SET_PROJECTS_LIST',
  GET_PROJECTS_LIST = 'GET_PROJECTS_LIST',
  UPDATE_PROJECTS_LIST = 'UPDATE_PROJECTS_LIST',
  ADD_PROJECT_IN_LIST = 'ADD_PROJECT_IN_LIST',
  REMOVE_PROJECT_FROM_LIST = 'REMOVE_PROJECT_FROM_LIST',
  GET_SINGLE_PROJECT = 'GET_SINGLE_PROJECT',
  CREATE_SINGLE_PROJECT = 'CREATE_SINGLE_PROJECT',
  UPDATE_SINGLE_PROJECT = 'UPDATE_SINGLE_PROJECT',
  DELETE_SINGLE_PROJECT = 'DELETE_SINGLE_PROJECT',
  SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT',
}

//

export type Project = {
  id: number;
  title: string;
  description: string;
  supervisor: string;
};

export type ProjectList = Project[];

export type ProjectPayload = {
  title: string;
  description: string;
  supervisor: string;
};

export type DeleteSingleProjectPayload = PayloadWithCallback<number>;

export type UpdateProjectPayload = PayloadWithId<ProjectPayload>;

//

export type ProjectsState = {
  projectsList: ProjectList;
  currentProject: Project | null;
};

//

export type UpdateProjectsListAction = {
  type: ProjectsActionTypes.UPDATE_PROJECTS_LIST;
  payload: Project;
};

export type AddProjectsInListAction = {
  type: ProjectsActionTypes.ADD_PROJECT_IN_LIST;
  payload: Project;
};

export type RemoveProjectsFromListAction = {
  type: ProjectsActionTypes.REMOVE_PROJECT_FROM_LIST;
  payload: number;
};

export type SetProjectsListAction = {
  type: ProjectsActionTypes.SET_PROJECTS_LIST;
  payload: ProjectList;
};

export type CreateSingleProjectAction = {
  type: ProjectsActionTypes.CREATE_SINGLE_PROJECT;
  payload: ProjectPayload;
};

export type DeleteSingleProjectAction = {
  type: ProjectsActionTypes.DELETE_SINGLE_PROJECT;
  payload: DeleteSingleProjectPayload;
};

export type UpdateSingleProjectAction = {
  type: ProjectsActionTypes.UPDATE_SINGLE_PROJECT;
  payload: UpdateProjectPayload;
};

export type GetSingleProjectAction = {
  type: ProjectsActionTypes.GET_SINGLE_PROJECT;
  payload: number;
};

export type SetCurrentProjectAction = {
  type: ProjectsActionTypes.SET_CURRENT_PROJECT;
  payload: Project | null;
};

//

export type ProjectsAction =
  | AddProjectsInListAction
  | RemoveProjectsFromListAction
  | UpdateProjectsListAction
  | SetProjectsListAction
  | SetCurrentProjectAction
  | CreateSingleProjectAction
  | UpdateSingleProjectAction;
