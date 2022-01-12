import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { reducer as appReducer } from './reducers/reducer';
import { reducer as loginFlowReducer } from './reducers/login-flow-reducer';
// import { rootSaga } from './sagas';
// import { userPostsFetchRequestedWatcherSaga } from './sagas/sagas-with-action-channels';
// import { loginFlow } from './sagas/sagas-login-flow';
// import { takeSaga } from './sagas/sagas-takes';
// import { sagaEventChannel } from './sagas/saga-event-channel';
// import { channelSaga } from './sagas/saga-channel';
import { handleFilesUploading } from './sagas/saga-channel-upload';
// import { userPostsRequestWatcher } from './sagas/sagas-action-channel-with-buffer';
// import { sagaThrottleDebounce } from './sagas/saga-throttle-debounce';
// import { sagasCallApplyWatcher } from './sagas/sagas-call-apply';
import { fetchUserPostsWithCancelled } from './sagas/saga-cancelled';
import * as postsAPI from '../api/posts';

const sagaMiddleware = createSagaMiddleware({
  context: {
    postsAPI
  }
});
const middleware = [sagaMiddleware];

export const rootReducer = combineReducers({
  app: appReducer,
  user: loginFlowReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware
});

// sagaMiddleware.run(userPostsFetchRequestedWatcherSaga);
// sagaMiddleware.run(loginFlow);
// sagaMiddleware.run(forkSaga);
// sagaMiddleware.run(takeSaga);
// sagaMiddleware.run(sagaEventChannel);
// sagaMiddleware.run(channelSaga);
sagaMiddleware.run(handleFilesUploading);
// sagaMiddleware.run(userPostsRequestWatcher);
// sagaMiddleware.run(sagaThrottleDebounce);
// sagaMiddleware.run(sagasCallApplyWatcher);
sagaMiddleware.run(fetchUserPostsWithCancelled);