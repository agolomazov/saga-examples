import { buffers } from 'redux-saga';
import { call, put, actionChannel, take, getContext, setContext } from 'redux-saga/effects';
import { fetchRequestedAction, fetchSuccessed, fetchFailed } from '../reducers/reducer';

function* fetchRequestedSaga(action) {
  try {
    const postsAPI = yield getContext('postsAPI');
    const appVersion = yield getContext('appVersion');

    yield call(console.log, appVersion);

    const postRequest = call(postsAPI.getUserPosts, action.payload.userId);
    yield call(console.log, postRequest);
    const {data: postsData} = yield postRequest;
    yield put(fetchSuccessed(postsData));
  } catch (error) {
    console.log(error.message);
    yield put(fetchFailed(error.message));
  }
}

export function* userPostsFetchRequestedWatcherSaga() {
  const requestChannel = yield actionChannel(fetchRequestedAction, buffers.none());

  yield setContext({
    'appVersion': '1.0.0'
  })

  while (true) {
    const action = yield take(requestChannel);
    console.log('action', action);
    yield call(fetchRequestedSaga, action)
  }
}