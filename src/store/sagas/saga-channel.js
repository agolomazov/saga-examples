import { channel } from "redux-saga";
import { call, delay, fork, put, take } from "redux-saga/effects";

function* handleChannelRequest(channelHandler) {
  while(true) {
    const payload = yield take(channelHandler);
    console.log(payload);
    yield delay(2000)
  }
}

export function* channelSaga() {
  const requestChannel = yield call(channel);

  yield fork(handleChannelRequest, requestChannel);

  yield put(requestChannel, { payload: 'hello' });
  yield put(requestChannel, { payload: 'hello' });
  yield put(requestChannel, { payload: 'hello' });
  yield put(requestChannel, { payload: 'hello' });
  yield put(requestChannel, { payload: 'hello' });
  yield put(requestChannel, { payload: 'hello' });
  yield put(requestChannel, { payload: 'hello' });
  yield put(requestChannel, { payload: 'hello' });
  yield put(requestChannel, { payload: 'hello' });
}