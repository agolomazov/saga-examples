import { call, put, take, race, delay, cancel } from "redux-saga/effects";

import { getUserPosts } from "../../api/posts";
import { fetchCancelled, fetchRequestedAction, fetchSuccessed } from "../reducers/reducer";

function* fetchUserPostsRequest(userId) {
  yield delay(2000);
  const { data: postsData } = yield call(getUserPosts, userId);
  yield put(fetchSuccessed(postsData));

  return postsData;
}

export function* fetchUserPostsWithCancelled() {
  while(true) {
    const action = yield take(fetchRequestedAction);

    const [requestTask, cancelResult] = yield race([
      call(fetchUserPostsRequest, action.payload.userId),
      take(fetchCancelled)
    ]);

    if (cancelResult) {
      console.log(requestTask);
      yield cancel(requestTask);
    }
  }
}
