import { channel } from "redux-saga";
import { call, fork, put, take } from "redux-saga/effects";
import { uploadFile } from "../../api/mock-file-uploading";
import { filesUploadingProgressAction, filesUploadStartAction } from "../reducers/reducer";

function handleProgressChange(progressChannel, value) {
  progressChannel.put({
    payload: value
  })
}

function* handleFilesUploadingEvents(fileUploadingChannel) {
  while(true) {
    const { payload } = yield take(fileUploadingChannel);
    yield put(filesUploadingProgressAction(payload))
  }
}

export function* handleFilesUploading() {
  const fileUploadingChannel = yield call(channel);

  yield fork(handleFilesUploadingEvents, fileUploadingChannel);

  while(true) {
    yield take(filesUploadStartAction);

    yield fork(uploadFile, {
      url: 'https://upload.files.com/data',
      files: [{ name: 'file1.png', size: 212 }, { name: 'file2.png', size: 213 }],
      onProgress: (progressValue) => {
        handleProgressChange(fileUploadingChannel, progressValue);
      }
    })
  }
}