import { buffers } from "redux-saga";
import { call, fork, take, throttle, debounce, actionChannel, delay, cancel, takeLatest } from "redux-saga/effects";
import { saveFriendlyName } from "../../api/user";
import { changeUserNameAction } from "../reducers/reducer";

function* changeUserName(action) {
  yield call(saveFriendlyName, action.payload);
}

const throttle2 = (ms, pattern, task, ...args) => {
  return fork(
    function* () {
      const throttleChannel = yield actionChannel(pattern, buffers.sliding(1))

      while(true) {
        const action = yield take(throttleChannel);
        yield fork(task, ...args, action)
        yield delay(ms);
      }
    }
  )
}

function* debounce2 (ms, pattern, task, ...args) {
  let _task = null;
  while(true) {
    const action = yield take(pattern);

    if (_task) {
      yield cancel(_task);
    }

    _task = yield fork(function* () {
      yield delay(ms);
      yield fork(task, ...args, action)
    });
  }
}

function* debounce3(ms, pattern, task, ...args) {
  yield takeLatest(pattern, function* (action) {
    yield delay(ms);
    yield fork(task, ...args, action);
  });
}


export function* sagaThrottleDebounce() {
  // while(true) {
  //   const action = yield take(changeUserNameAction);
  //   yield fork(changeUserName, action);
  // }

  yield debounce3(1000, changeUserNameAction, changeUserName);
}