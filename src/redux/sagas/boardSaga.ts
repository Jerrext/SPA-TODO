import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  BoardActionTypes,
  CreateTaskAction,
  GetTasksListAction,
  SubtaskType,
  TaskType,
  TasksList,
} from '../types/boardTypes';
import API from '../api/index';
import axios, { AxiosResponse } from 'axios';
import { setTask, setTaskStagesList } from '../actions/boardActions';
import { setModalWindowType, toggleIsLoading } from '../actions/pageActions';
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

export function* createTaskWorker(action: CreateTaskAction) {
  const { id, data } = action.payload;
  try {
    const { data: responseData }: AxiosResponse<TaskType> = yield call(
      API.createTaskRequest,
      id,
      data,
    );
    yield put(setModalWindowType(null));
    yield put(setTask(responseData));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(error.message);
    }
  }
}

export default function* boardSaga() {
  yield all([
    takeLatest(BoardActionTypes.GET_TASKS_LIST, getTasksListWorker),
    takeLatest(BoardActionTypes.CREATE_TASK, createTaskWorker),
  ]);
}
