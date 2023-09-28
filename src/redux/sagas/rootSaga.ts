import { all } from 'redux-saga/effects';
import projectsSaga from './projectsSaga';

export default function* rootSaga() {
  yield all([projectsSaga()]);
}
