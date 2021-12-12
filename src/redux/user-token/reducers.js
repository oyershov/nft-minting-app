const initialState = {
  loading: false,
  accentureAccessToken: "",
  error: false,
  errorMsg: "",
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_TOKEN_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "FETCH_TOKEN_SUCCESS":
      return {
        ...state,
        loading: false,
        accentureAccessToken: action.payload.accentureAccessToken,
        error: false,
        errorMsg: "",
      };
    case "FETCH_TOKEN_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default tokenReducer;
