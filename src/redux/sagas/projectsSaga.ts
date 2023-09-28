import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { setProjects } from '../actions/projectsActions';
import { ProjectList, ProjectsActionTypes } from '../types/projectsTypes';
import API from '../api';
import { AxiosResponse } from 'axios';

export function* getProjectsWorker() {
  try {
    const { data, config }: AxiosResponse<ProjectList> = yield call(
      API.getProjectsRequest,
    );
    yield put(setProjects(data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

export default function* projectsSaga() {
  yield all([takeLatest(ProjectsActionTypes.GET_PROJECTS, getProjectsWorker)]);
}
