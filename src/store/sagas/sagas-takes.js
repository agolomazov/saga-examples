import { call, cancel, delay, fork, put, take, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import { getUserPosts } from "../../api/posts";
import { fetchFailed, fetchRequestedAction, fetchSuccessed } from "../reducers/reducer";

function* fetchUserPosts(action) {
  try {
    const postsData = yield call(getUserPosts, action.payload.userId);
    yield put(fetchSuccessed(postsData.data))
    console.log(`posts: ${postsData.data.length}, action id: ${action.payload.actionId}`);
  } catch (error) {
    yield put(fetchFailed(error.message));
  }
}

export function* userPostsFetchWatcherSaga() {
  // yield takeEvery(fetchRequestedAction, fetchUserPosts);
  // yield takeLatest(fetchRequestedAction, fetchUserPosts);
  // yield takeLeading(fetchRequestedAction, fetchUserPosts);

  // while(true) {
  //   yield take(fetchRequestedAction);
  //   yield take(fetchRequestedAction);
  //   const action = yield take(fetchRequestedAction);
  //   yield call(fetchUserPosts, action);
  // }
  
  // Take latest
  let task = null;
  while(true) {
    if (!task) {
      console.log('hh!!');
    }
    const action = yield take(fetchRequestedAction);

    if (task) {
      yield cancel(task);
    }
    task = yield fork(fetchUserPosts, action);
  }
}

export function* takeSaga() {
  yield userPostsFetchWatcherSaga();
}