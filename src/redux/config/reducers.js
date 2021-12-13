const DEFAULT_CONFIG = {
  CONTRACT_ADDRESS: "",
  SCAN_LINK: "",
  NETWORK: {
    NAME: "",
    SYMBOL: "",
    ID: 0,
    ID_HEX: ""
  },
  NFT_NAME: "",
  SYMBOL: "",
  MAX_SUPPLY: 1,
  GAS_LIMIT: 0,
  MARKETPLACE: "",
  MARKETPLACE_LINK: "",
  ADDRESS_COLLECTING_FORM: "",
  EVENT_START_DATE: "",
  EVENT_END_DATE: ""
};

const initialState = {
  loading: false,
  config: DEFAULT_CONFIG,
  error: false,
  errorMsg: "",
};

const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CONFIG_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "FETCH_CONFIG_SUCCESS":
      return {
        ...state,
        loading: false,
        config: action.payload.config,
        error: false,
        errorMsg: "",
      };
    case "FETCH_CONFIG_FAILED":
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

export default configReducer;
