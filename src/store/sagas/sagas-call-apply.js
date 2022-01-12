import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchRequestedAction, fetchSuccessed } from "../reducers/reducer";

const createPostService = (baseUrl) => {
  return {
    getUrl(userId) {
      return `${baseUrl}/users/${userId}/posts`
    },
    async getUserPost(userId) {
      const userPostsRequest = await axios.get(this.getUrl(userId));
      return userPostsRequest.data;
    }
  };
}

function* fetchUserPosts(action) {
  const postService = createPostService('https://jsonplaceholder.typicode.com');

  const userPosts = yield call(
    [
      postService,
      postService.getUserPost
    ],
    action.payload.userId
  );

  yield put(fetchSuccessed(userPosts));
}

export function* sagasCallApplyWatcher() {
  yield takeEvery(fetchRequestedAction, fetchUserPosts);
}