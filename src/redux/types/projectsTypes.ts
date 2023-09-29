import { ModalWindowType } from 'src/utils/@globalTypes';
import { PayloadWithCallback, PayloadWithId } from './@types';
import { RoutesList } from 'src/pages/Router';
import { PageTypes } from './pageTypes';

export enum ProjectsActionTypes {
  SET_PROJECTS = 'SET_PROJECTS',
  GET_PROJECTS = 'GET_PROJECTS',
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

export type GetSingleProjectPayload = PayloadWithId<{ isPage: boolean }>;

export type UpdateProjectPayload = PayloadWithId<{
  page: PageTypes;
  project: ProjectPayload;
}>;

//

export type ProjectsState = {
  projectsList: ProjectList;
  currentProject: Project | null;
};

//

type SetProjectsAction = {
  type: ProjectsActionTypes.SET_PROJECTS;
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
  payload: GetSingleProjectPayload;
};

type SetCurrentProjectAction = {
  type: ProjectsActionTypes.SET_CURRENT_PROJECT;
  payload: Project | null;
};

//

export type ProjectsAction =
  | SetProjectsAction
  | SetCurrentProjectAction
  | CreateSingleProjectAction
  | UpdateSingleProjectAction;
