import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  addProjectInList,
  removeProjectFromList,
  setCurrentProject,
  setProjectsList,
  updateProjectsList,
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
import { toggleIsLoading, setModalWindowType } from '../actions/pageActions';
import { LoadingTypes } from '../types/pageTypes';

function* getProjectsWorker() {
  try {
    yield put(toggleIsLoading(LoadingTypes.ProjectsList));
    const { data }: AxiosResponse<ProjectList> = yield call(API.getProjectsRequest);
    yield put(setProjectsList(data));
    yield put(toggleIsLoading(LoadingTypes.ProjectsList));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

function* createSingleProjectWorker(action: CreateSingleProjectAction) {
  try {
    const { data }: AxiosResponse<Project> = yield call(
      API.createSingleProjectRequest,
      action.payload,
    );
    yield put(setModalWindowType(null));
    yield put(addProjectInList(data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

function* deleteSingleProjectWorker(action: DeleteSingleProjectAction) {
  const { data, callback } = action.payload;

  try {
    yield call(API.deleteSingleProjectRequest, data);

    if (callback) {
      callback();
    } else {
      yield put(removeProjectFromList(data));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

export function* getSingleProjectWorker(action: GetSingleProjectAction) {
  try {
    yield put(toggleIsLoading(LoadingTypes.SingleProject));
    const { data }: AxiosResponse<Project> = yield call(
      API.getSingleProjectRequest,
      action.payload,
    );
    yield put(setCurrentProject(data));
    yield put(toggleIsLoading(LoadingTypes.SingleProject));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

function* updateSingleProjectWorker(action: UpdateSingleProjectAction) {
  const { data, id } = action.payload;

  try {
    const { data: responseData } = yield call(API.updateSingleProjectRequest, id, data);
    yield put(setModalWindowType(null));
    yield put(updateProjectsList(responseData));
    yield put(setCurrentProject(responseData));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

export default function* projectsSaga() {
  yield all([
    takeLatest(ProjectsActionTypes.GET_PROJECTS_LIST, getProjectsWorker),
    takeLatest(ProjectsActionTypes.CREATE_SINGLE_PROJECT, createSingleProjectWorker),
    takeLatest(ProjectsActionTypes.DELETE_SINGLE_PROJECT, deleteSingleProjectWorker),
    takeLatest(ProjectsActionTypes.GET_SINGLE_PROJECT, getSingleProjectWorker),
    takeLatest(ProjectsActionTypes.UPDATE_SINGLE_PROJECT, updateSingleProjectWorker),
  ]);
}
