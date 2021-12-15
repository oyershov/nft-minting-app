const fetchLoginRequest = () => {
  return {
    type: "FETCH_LOGIN_REQUEST",
  };
};

const fetchLoginSuccess = (payload) => {
  return {
    type: "FETCH_LOGIN_SUCCESS",
    payload: payload,
  };
};

const fetchLoginFailed = (payload) => {
  return {
    type: "FETCH_LOGIN_FAILED",
    payload: payload,
  };
};


export const fetchLogin = (authProvider) => {
  return async (dispatch) => {
    dispatch(fetchLoginRequest());
    try {
      const authenticationResult = await authProvider.acquireAccessToken()

      if (authenticationResult?.accessToken) {
        dispatch(fetchLoginSuccess({data: authenticationResult}))
      } else {
        dispatch(fetchLoginFailed('missing token'))
      }
    } catch (err) {
      console.log(err);
      dispatch(fetchLoginFailed("Could not login."));
    }
  };
};
