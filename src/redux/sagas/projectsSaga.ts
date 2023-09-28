import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { setProjects } from '../actions/projectsActions';
import { ProjectList, ProjectsActionTypes } from '../types/projectsTypes';
import API from '../api';
import { AxiosResponse } from 'axios';
import { setIsLoader } from '../actions/pageActions';

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

export default function* projectsSaga() {
  yield all([takeLatest(ProjectsActionTypes.GET_PROJECTS, getProjectsWorker)]);
}
