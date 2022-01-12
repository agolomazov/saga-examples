import { call, fork, put, take, cancel, cancelled } from "redux-saga/effects";
import * as userApi from "../../api/user";
import { loginErrorAction, loginRequestAction, loginSuccessAction, logoutAction, stopLoadingPendingAction } from "../reducers/login-flow-reducer";

function* authorize(username, password) {
  try {
    const token = yield call(userApi.login, username, password);

    yield put(loginSuccessAction({ token }));
    yield call(userApi.saveToken, token);
    return token;
  } catch (error) {
    yield put(loginErrorAction({
      error
    }))
  } finally {
    if (yield cancelled()) {
      yield put(stopLoadingPendingAction());
    }
  }
}


export function* loginFlow() {
  while (true) {
    const { payload } = yield take(loginRequestAction);
    const task = yield fork(authorize, payload.username, payload.password);
    const action = yield take([logoutAction, loginErrorAction]);

    if (action.type === logoutAction.type) {
      yield cancel(task);
    }
    
    yield call(userApi.clearToken);
  }
}