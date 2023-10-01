import { all, call, put, takeLatest } from 'redux-saga/effects';
import { BoardActionTypes, GetTasksListAction, TasksList } from '../types/boardTypes';
import API from '../api/index';
import axios, { AxiosResponse } from 'axios';
import { setTaskStagesList } from '../actions/tasksActions';

function* getTasksListWorker(action: GetTasksListAction) {
  try {
    const { data }: AxiosResponse<TasksList> = yield call(
      API.getTasksListRequest,
      action.payload,
    );
    yield put(setTaskStagesList(data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

export default function* boardSaga() {
  yield all([takeLatest(BoardActionTypes.GET_TASKS_LIST, getTasksListWorker)]);
}
