import { call, fork, put, spawn } from 'redux-saga/effects';
import { getUserAlbums } from '../../api/albums';
import { getUserPosts } from '../../api/posts';
import { saveUserAlbumsAction, saveUserPostsAction } from '../reducers/reducer';

function* fetchAlbums(userId) {
  try {
    const albumsData = yield call(getUserAlbums, userId);
    yield put(saveUserAlbumsAction({
      data: albumsData.data
    }));
  } catch (error) {
    yield call(console.log, error.message);
  }
}

function* fetchPosts(userId) {
  const postsData = yield call(getUserPosts, userId);
  yield put(saveUserPostsAction({
    data: postsData.data
  }))
}

function* fetchUserData(userId) {
  try {
    yield spawn(fetchAlbums, userId);
    yield fork(fetchPosts, userId);
  } catch (error) {
    console.log(error);
  }

  console.log('done');
}

export function* forkSaga() {
  const userId = 1;

  yield call(fetchUserData, userId);
}