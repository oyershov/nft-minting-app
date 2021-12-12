const fetchConfigRequest = () => {
  return {
    type: "FETCH_CONFIG_REQUEST",
  };
};

const fetchConfigSuccess = (payload) => {
  return {
    type: "FETCH_CONFIG_SUCCESS",
    payload: payload,
  };
};

const fetchConfigFailed = (payload) => {
  return {
    type: "FETCH_CONFIG_FAILED",
    payload: payload,
  };
};

export const fetchConfig = () => {
  return async (dispatch) => {
    dispatch(fetchConfigRequest());
    try {
      const configResponse = await fetch("/config/config.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const config = await configResponse.json();

      dispatch(
        fetchConfigSuccess({
          config
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchConfigFailed("Could not load config."));
    }
  };
};
