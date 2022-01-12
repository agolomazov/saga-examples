import { useDispatch, useSelector } from 'react-redux';

import { changeUserNameAction, fetchRequestedAction, filesUploadStartAction, fetchCancelled } from './store/reducers/reducer';
import { loginRequestAction, logoutAction } from './store/reducers/login-flow-reducer';

function App() {
  const dispatch = useDispatch();
  const { isLoginPending, token, error, username } = useSelector((state) => state.user);
  const { fileUploadProgress } = useSelector((state) => state.app);

  const handleClick = () => {
    try {
      // for (let dispatchID = 1; dispatchID <= 4; dispatchID++) {
      //   dispatch(fetchRequestedAction({ userId: 1, id: dispatchID }));
      // }
      dispatch(fetchRequestedAction({ userId: 1 }));
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleUploadClick = () => {
    dispatch(filesUploadStartAction());
  }

  return (
    <div className="App">
      <h1>App</h1>
      <button onClick={handleClick}>Fetch data</button>
      <button onClick={() => dispatch(fetchCancelled())}>
        Cancel fetch data
      </button>

      <div>
        <h3>Auth</h3>
        <button
          onClick={() =>
            dispatch(
              loginRequestAction({
                username: 'user1',
                password: 'user1password',
              })
            )
          }
          disabled={isLoginPending}
        >
          Log in
        </button>
        <br />
        <br />
        <button onClick={() => dispatch(logoutAction())}>Log out</button>
        <br />
        <br />
        {isLoginPending && <p>Loading in...</p>}
        {error && <p>Error: {error}</p>}
        {token && <p>{token}</p>}

        <div>
          <button onClick={handleUploadClick}>Upload files</button>
          <br />
          Uploading progress: {fileUploadProgress}
        </div>
      </div>
      <br />
      <br />
      <div>
        <input
          type="search"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            dispatch(changeUserNameAction(e.target.value));
          }}
        />
      </div>
    </div>
  );
}

export default App;
