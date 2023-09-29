import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getProjects,
  setCurrentProject,
  setProjects,
} from '../actions/projectsActions';
import {
  CreateSingleProjectAction,
  DeleteSingleProjectAction,
  GetSingleProjectAction,
  Project,
  ProjectList,
  ProjectsActionTypes,
  UpdateSingleProjectAction,
} from '../types/projectsTypes';
import API from '../api';
import { AxiosResponse } from 'axios';
import {
  setIsPageLoader,
  setIsWindowLoader,
  setModalWindowType,
} from '../actions/pageActions';
import { ModalWindowType } from 'src/utils/@globalTypes';

export function* getProjectsWorker() {
  try {
    yield put(setIsPageLoader(true));
    const { data }: AxiosResponse<ProjectList> = yield call(
      API.getProjectsRequest,
    );
    yield put(setProjects(data));
    yield put(setIsPageLoader(false));
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

export function* deleteSingleProjectWorker(action: DeleteSingleProjectAction) {
  const { data, callback } = action.payload;

  try {
    yield call(API.deleteSingleProjectRequest, data);

    if (callback) {
      callback();
    } else {
      yield put(getProjects());
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

export function* getSingleProjectWorker(action: GetSingleProjectAction) {
  const {
    id,
    data: { isPage },
  } = action.payload;
  const setLoader = isPage ? setIsPageLoader : setIsWindowLoader;

  try {
    yield put(setLoader(true));
    const { data: responseData }: AxiosResponse<Project> = yield call(
      API.getSingleProjectRequest,
      id,
    );
    yield put(setCurrentProject(responseData));
    yield put(setLoader(false));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

export function* updateSingleProjectWorker(action: UpdateSingleProjectAction) {
  const { data, id } = action.payload;

  try {
    yield call(API.updateSingleProjectRequest, id, data);
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
    takeLatest(
      ProjectsActionTypes.DELETE_SINGLE_PROJECT,
      deleteSingleProjectWorker,
    ),
    takeLatest(ProjectsActionTypes.GET_SINGLE_PROJECT, getSingleProjectWorker),
    takeLatest(
      ProjectsActionTypes.UPDATE_SINGLE_PROJECT,
      updateSingleProjectWorker,
    ),
  ]);
}
