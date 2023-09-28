import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getProjects, setProjects } from '../actions/projectsActions';
import {
  CreateSingleProjectAction,
  Project,
  ProjectList,
  ProjectsActionTypes,
} from '../types/projectsTypes';
import API from '../api';
import { AxiosResponse } from 'axios';
import { setIsLoader, setModalWindowType } from '../actions/pageActions';

export function* getProjectsWorker() {
  try {
    yield put(setIsLoader(true));
    const { data }: AxiosResponse<ProjectList> = yield call(
      API.getProjectsRequest,
    );
    yield put(setProjects(data));
    yield put(setIsLoader(false));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

export function* createSingleProjectWorker(action: CreateSingleProjectAction) {
  try {
    yield call(API.createSingleProjectRequest, action.payload);
    yield put(setModalWindowType(null));
    yield put(getProjects());
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

export default function* projectsSaga() {
  yield all([
    takeLatest(ProjectsActionTypes.GET_PROJECTS, getProjectsWorker),
    takeLatest(
      ProjectsActionTypes.CREATE_SINGLE_PROJECT,
      createSingleProjectWorker,
    ),
  ]);
}
