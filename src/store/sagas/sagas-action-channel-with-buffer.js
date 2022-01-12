import { actionChannel, call, put, take } from 'redux-saga/effects';
import { buffers } from 'redux-saga';

import { getUserPosts } from '../../api/posts';
import { fetchRequestedAction, fetchSuccessed } from '../reducers/reducer';

function* fetchUserPosts(action) {
  console.log(`Processing action: ${action.type}; dispatchId: ${action.payload.id}`);
  const userPosts = yield call(getUserPosts, action.payload.userId);

  yield put(fetchSuccessed(userPosts.data));
}

export function* userPostsRequestWatcher() {
  const requestChannel = yield actionChannel(
    fetchRequestedAction,
    buffers.sliding(2)
  );

  while(true) {
    const action = yield take(requestChannel);
    yield call(fetchUserPosts, action);
  }
}