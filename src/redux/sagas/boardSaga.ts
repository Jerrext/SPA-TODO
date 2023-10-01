import { all, call, put, takeLatest } from 'redux-saga/effects';
import { BoardActionTypes, GetTasksListAction, TasksList } from '../types/boardTypes';
import API from '../api/index';
import axios, { AxiosResponse } from 'axios';
import { setTaskStagesList } from '../actions/boardActions';
import { toggleIsLoading } from '../actions/pageActions';
import { LoadingTypes } from '../types/pageTypes';

export function* getTasksListWorker(action: GetTasksListAction) {
  try {
    yield put(toggleIsLoading(LoadingTypes.TasksList));
    const { data }: AxiosResponse<TasksList> = yield call(
      API.getTasksListRequest,
      action.payload,
    );
    yield put(setTaskStagesList(data));
    yield put(toggleIsLoading(LoadingTypes.TasksList));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

export default function* boardSaga() {
  yield all([takeLatest(BoardActionTypes.GET_TASKS_LIST, getTasksListWorker)]);
}
