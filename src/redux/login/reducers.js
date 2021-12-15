const initialState = {
  loading: false,
  error: false,
  errorMsg: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "FETCH_LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: false,
        errorMsg: "",
      };
    case "FETCH_LOGIN_FAILED":
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

export default loginReducer;
