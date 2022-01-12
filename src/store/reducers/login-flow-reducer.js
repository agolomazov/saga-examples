import { createSlice } from '@reduxjs/toolkit';

const loginFlowSlice = createSlice({
  name: 'loginFlow',
  initialState: {
    error: null,
    token: null,
    isLoginPending: false
  },
  reducers: {
    loginError(state, action) {
      state.error = action.payload.error;
      state.isLoginPending = false;
    },
    loginRequest(state) {
      state.isLoginPending = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoginPending = false;
      state.token = action.payload.token;
    },
    logout(state) {
      state.token = null;
      state.isLoginPending = false;
    },
    stopLoginPending(state) {
      state.isLoginPending = false;
    }
  }
});

export const {
  loginError: loginErrorAction,
  loginSuccess: loginSuccessAction,
  loginRequest: loginRequestAction,
  logout: logoutAction,
  stopLoginPending: stopLoadingPendingAction

} = loginFlowSlice.actions;

export const reducer = loginFlowSlice.reducer;