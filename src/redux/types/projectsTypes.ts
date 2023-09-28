import { PayloadWithId } from './@types';

export enum ProjectsActionTypes {
  SET_PROJECTS = 'SET_PROJECTS',
  GET_PROJECTS = 'GET_PROJECTS',
  GET_SINGLE_PROJECT = 'GET_SINGLE_PROJECT',
  SET_SINGLE_PROJECT = 'SET_SINGLE_PROJECT',
  UPDATE_SINGLE_PROJECT = 'UPDATE_SINGLE_PROJECT',
  DELETE_SINGLE_PROJECT = 'DELETE_SINGLE_PROJECT',
}

export type Project = {
  id: number;
  title: string;
  description: string;
  supervisor: string;
};

export type ProjectList = Project[];

export type UpdateProject = PayloadWithId<Project>;

export type ProjectsState = {
  projectsList: ProjectList;
  currentProject: Project | null;
};

type SetProjectsAction = {
  type: ProjectsActionTypes.SET_PROJECTS;
  payload: ProjectList;
};

type SetSingleProjectAction = {
  type: ProjectsActionTypes.SET_SINGLE_PROJECT;
  payload: Project;
};

export type ProjectsAction = SetProjectsAction | SetSingleProjectAction;
