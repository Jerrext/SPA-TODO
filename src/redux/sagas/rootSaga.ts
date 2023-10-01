import { all } from 'redux-saga/effects';
import projectsSaga from './projectsSaga';
import boardSaga from './boardSaga';

export default function* rootSaga() {
  yield all([projectsSaga(), boardSaga()]);
}
