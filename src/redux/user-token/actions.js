const fetchTokenRequest = () => {
  return {
    type: "FETCH_TOKEN_REQUEST",
  };
};

const fetchTokenSuccess = (payload) => {
  return {
    type: "FETCH_TOKEN_SUCCESS",
    payload: payload,
  };
};

const fetchTokenFailed = (payload) => {
  return {
    type: "FETCH_TOKEN_FAILED",
    payload: payload,
  };
};

export const fetchToken = () => {
  return async (dispatch) => {
    dispatch(fetchTokenRequest());
    try {
      const accentureAccessToken = sessionStorage.getItem('accentureAccessToken')

      dispatch(
        fetchTokenSuccess({
          accentureAccessToken: accentureAccessToken || 'no-token'
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchTokenFailed("Could not get user token."));
    }
  };
};
