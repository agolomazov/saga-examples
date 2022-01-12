import { createSlice, createAction } from '@reduxjs/toolkit';

const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState: {
    posts: [],
    albums: [],
    errorMessage: '',
    fileUploadProgress: 0,
    username: ''
  },
  reducers: {
    fetchRequested(state) {
      state.errorMessage = '';
    },
    fetchSuccessed(state, action) {
      state.posts = action.payload;
    },
    fetchFailed(state, action) {
      state.errorMessage = action.payload;
    },
    saveUserAlbums(state, action) {
      state.albums = action.payload.data;
    },
    saveUserPosts(state, action) {
      state.posts = action.payload.data;
    },
    filesUploadStart(state) {
      state.fileUploadProgress = 0;
    },
    filesUploadingProgress(state, action) {
      state.fileUploadProgress = action.payload
    },
    changeUserName(state, action) {
      state.username = action.payload;
    }
  }
});

export const fetchCancelled = createAction(`${userPostsSlice.name}/fetchCancelled`);

export const {
  fetchSuccessed,
  fetchFailed,
  fetchRequested: fetchRequestedAction,
  saveUserAlbums: saveUserAlbumsAction,
  saveUserPosts: saveUserPostsAction,
  filesUploadStart: filesUploadStartAction,
  filesUploadingProgress: filesUploadingProgressAction,
  changeUserName: changeUserNameAction
} = userPostsSlice.actions;
export const reducer = userPostsSlice.reducer;