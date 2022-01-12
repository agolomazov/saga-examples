import { call, put, all, fork, takeLatest } from 'redux-saga/effects';

import { getUserPosts } from '../api/posts';
import { fetchRequestedAction, fetchSuccessed, fetchFailed } from './reducer';

function* fetchRequestedSaga(action) {
  try {
    const postRequest = call(getUserPosts, action.payload.userId);
    yield call(console.log, postRequest);
    const {data: postsData} = yield postRequest;
    yield put(fetchSuccessed(postsData));
  } catch (error) {
    console.log(error.message);
    yield put(fetchFailed(error.message));
  }
}

function* someSaga() {
  yield call(console.log, 'SOME SAGA ACTION');
}

export function* userPostsFetchRequestedWatcherSaga() {
  yield takeLatest(fetchRequestedAction, fetchRequestedSaga);
}

export function* rootSaga() {
  yield all([
    userPostsFetchRequestedWatcherSaga,
    someSaga
  ].map(fork));
}