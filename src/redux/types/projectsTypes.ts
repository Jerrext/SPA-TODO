import { PayloadWithCallback, PayloadWithId } from './@types';

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

type DeleteSingleProjectPayload = PayloadWithCallback<number>;

export type UpdateProjectPayload = PayloadWithId<ProjectPayload>;

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

type SetCurrentProjectAction = {
  type: ProjectsActionTypes.SET_CURRENT_PROJECT;
  payload: Project;
};

//

export type ProjectsAction =
  | SetProjectsAction
  | SetCurrentProjectAction
  | CreateSingleProjectAction;
